const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


// All posts of a user
router.get('/', withAuth, async (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ["id", "title", "content", "created_at"],
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "post_id",
                    "user_id",
                    "created_at"
                ],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
        ],
    })
    .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render("dashboard", { posts, loggedIn: true});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a post from a user
router.get("edit/:id", withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "title", "content", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"],
            },
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "post_id",
                    "user_id",
                    "created_at",
                ],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
        ],
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({message: "No post found with this particular user id"});
        return;
        }

        const post = dbPostData.get({ plain: true });
        res.render("edit-post", {post, loggedIn: true});})
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });


//     try {
//       const userData = await User.findAll({
//         attributes: { exclude: ['password'] },
//         order: [['name', 'ASC']],
//       });
  
//       const users = userData.map((project) => project.get({ plain: true }));
  
//       res.render('homepage', {
//         users,
//         // Pass the logged in flag to the template
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   router.get('/login', (req, res) => {
//     // If a session exists, redirect the request to the homepage
//     if (req.session.logged_in) {
//       res.redirect('/');
//       return;
//     }
  
//     res.render('login');
//   });

module.exports = router;
