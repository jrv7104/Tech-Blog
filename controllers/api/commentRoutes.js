const router = require('express').Router();
const { Comment } = require('../../models');

//find all comments
router.get('/', (req, res) => {
    Comment.findAll({
    
    }).then(comments => res.json(comments))
});

//find one comment by id
router.get('/:id', (req,res) => {
    Comment.findOne({
        where: {
            id: req.params.id},

        }).then(comments => res.json(comments))
    });

//create new comment
router.post('/' (req, res) => {

    Comment.create(req.body).then(newComment => res.json(newComment))
});

//update comment by id
router.put('/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        },
    }).then(updateComment => res.json(updateComment))
});

//delete comment by id
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        },
    }).then(comments => res.json(comments))
});

module.exports = router;