const router = require('express').Router();
const { Post } = require('../../models');

//find all comments
router.get('/', (req, res) => {
    Post.findAll({
    
    }).then(posts => res.json(posts))
});

//find one comment by id
router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id},

        }).then(posts => res.json(posts))
    });

//create new comment
router.post('/', (req, res) => {

    Post.create(req.body).then(newPost => res.json(newPost))
});

//update comment by id
router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        },
    }).then(updatePost => res.json(updatePost))
});

//delete comment by id
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        },
    }).then(posts => res.json(posts))
});

module.exports = router;