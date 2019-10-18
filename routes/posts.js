const router = require('express').Router();
const { getAll, getById, save, updateById, deleteById } = require('../repositorio/posts');
const repoUsers = require('../repositorio/users');
const repoComments = require('../repositorio/comments');
const validarPost = require('../validadores/post');

router.get('/:id/comments', (req, res) => {
    try {
        const postid = parseInt(req.params.id);
        let post = getById(postid);
        let comments = repoComments.getCommentsByPost(post.id);
        post = { ...post, comments };
        return res.status(200).send(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.get('/:id', (req, res) => {
    try {
        const postid = parseInt(req.params.id);
        let post = getById(postid);

        if(!post) return res.status(404).send({});

        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');
            if (splitQuery.length > 0) {
                if (splitQuery.find(x => x === 'user')) {
                    let user = repoUsers.getById(post.userId);
                    post = { ...post, user };
                }
                if (splitQuery.find(x => x === 'comments')) {
                    let comments = repoComments.getCommentsByPost(post.id);
                    post = { ...post, comments };
                }
            }
        }
        return res.status(200).send(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.get('/', (req, res) => {
    try {
        let posts = getAll();
        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');

            for (let i = 0; i < posts.length; i++) {
                if (splitQuery.length > 0) {
                    if (splitQuery.find(x => x === 'user')) {
                        let user = repoUsers.getById(posts[i].userId);
                        posts[i] = { ...posts[i], user };
                    }
                    if (splitQuery.find(x => x === 'comments')) {
                        let comments = repoComments.getCommentsByPost(posts[i].id);
                        posts[i] = { ...posts[i], comments };
                    }
                }
            }
        }

        return res.status(200).send(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.post('/', (req, res) => {
    try {
        const { body } = req;

        const errores = validarPost.validatePost(body);

        if (errores) return res.status(400).send(errores);
        
        const user = repoUsers.getById(body.userId);

        if(!user) return res.status(404).send({});

        const post = save(body);

        res.status(201).send(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.put('/:id', (req, res) => {
    try {
        const postid = parseInt(req.params.id);
        const { body } = req;

        const post = getById(postid);

        if(!post) return res.status(404).send({});

        const errores = validarPost.validatePost(body);

        if (errores) return res.status(400).send(errores);

        const user = repoUsers.getById(body.userId);

        if(!user) return res.status(404).send({});

        const postUpdate = updateById(postid, body);

        res.status(200).send(postUpdate);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.delete('/:id', (req, res) => {
    try {
        const postid = parseInt(req.params.id);
        const post = getById(postid);

        if(!post) return res.status(404).send({});

        const postDelete = deleteById(postid);

        res.status(202).send(postDelete);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;