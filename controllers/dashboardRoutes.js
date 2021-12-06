const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ["id", "title", "content", "created_at"],
        include: [
            {
                
            }
        ]
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
