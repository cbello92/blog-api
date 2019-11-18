const router = require('express').Router();
const { getAll, save, getById, updateById, deleteById } = require('../repositorio/comments');
const repoPosts = require('../repositorio/posts');
const validarComment = require('../validadores/comment');

router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let comment = getById(id);

        if(!comment) return res.status(404).send({});

        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');

            if (splitQuery.find(x => x === 'post')) {
                let post = repoPosts.getById(comment.postId);
                comment = { ...comment, post };
            }
        }

        return res.status(200).send(comment);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.get('/', (req, res) => {
    try {
        let comments = getAll();
        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');

            for (let i = 0; i < comments.length; i++) {
                if (splitQuery.length > 0) {
                    if (splitQuery.find(x => x === 'post')) {
                        let post = repoPosts.getById(comments[i].postId);
                        comments[i] = { ...comments[i], post };
                    }
                }
            }
        }

        return res.status(200).send(comments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.post('/', (req, res) => {
    try {
        const { body } = req;

        const errores = validarComment.validateComment(body);

        if (errores) return res.status(400).send(errores);

        const post = repoPosts.getById(body.postId);

        if(!post) return res.status(404).send({});

        const comment = save(body);

        res.status(201).send(comment);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.put('/:id', (req, res) => {
    try {
        const commentId = parseInt(req.params.id);
        const { body } = req;

        const comment = getById(commentId);

        if(!comment) return res.status(404).send({});

        const errores = validarComment.validateComment(body);

        if (errores) return res.status(400).send(errores);

        const post = repoPosts.getById(body.postId);

        if(!post) return res.status(404).send({});

        const commentUpdate = updateById(commentId, body);

        res.status(200).send(commentUpdate);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.delete('/:id', (req, res) => {
    try {
        const commentId = parseInt(req.params.id);
        const comment = getById(commentId);

        if(!comment) return res.status(404).send({});

        const commentDelete = deleteById(commentId);

        res.status(202).send(commentDelete);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;