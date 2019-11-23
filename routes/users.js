const router = require('express').Router();
const { getAll, save, updateById, deleteById, getById } = require('../repositorio/users');
const { getPostsByUserId } = require('../repositorio/posts');
const { getAlbumsByUserId } = require('../repositorio/albums');
const { getTodosByUserId } = require('../repositorio/todos');
const validarUser = require('../validadores/user');


router.get('/:id/posts', (req, res) => {
    try {
        const userid = parseInt(req.params.id);
        let usuario = getById(userid);

        if (!usuario) return res.status(404).send({});

        let posts = getPostsByUserId(usuario.id);
        usuario = { ...usuario, posts };

        return res.status(200).send(usuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id/albums', (req, res) => {
    try {
        const userid = parseInt(req.params.id);
        let usuario = getById(userid);

        if (!usuario) return res.status(404).send({});

        let albums = getPostsByUserId(usuario.id);
        usuario = { ...usuario, albums };

        return res.status(200).send(usuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id/todos', (req, res) => {
    try {
        const userid = parseInt(req.params.id);
        let usuario = getById(userid);

        if (!usuario) return res.status(404).send({});

        let todos = getPostsByUserId(usuario.id);
        usuario = { ...usuario, todos };

        return res.status(200).send(usuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id', (req, res) => {
    try {
        const userid = parseInt(req.params.id);
        let usuario = getById(userid);

        if (!usuario) return res.status(404).send({});

        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');
            if (splitQuery.length > 0) {
                if (splitQuery.find(x => x === 'posts')) {
                    let posts = getPostsByUserId(usuario.id);
                    usuario = { ...usuario, posts };
                }
                if (splitQuery.find(x => x === 'albums')) {
                    let albums = getAlbumsByUserId(usuario.id);
                    usuario = { ...usuario, albums };
                }

                if (splitQuery.find(x => x === 'todos')) {
                    let todos = getTodosByUserId(usuario.id);
                    usuario = { ...usuario, todos };
                }
            }
        }

        return res.status(200).send(usuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get('/', async (req, res) => {
    try {
        let usuarios = await getAll();
        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');

            for (let i = 0; i < usuarios.length; i++) {
                if (splitQuery.length > 0) {
                    if (splitQuery.find(x => x === 'posts')) {
                        let posts = getPostsByUserId(usuarios[i].id);
                        usuarios[i] = { ...usuarios[i], posts }
                    }
                    if (splitQuery.find(x => x === 'albums')) {
                        let albums = getAlbumsByUserId(usuarios[i].id);
                        usuarios[i] = { ...usuarios[i], albums };
                    }

                    if (splitQuery.find(x => x === 'todos')) {
                        let todos = getTodosByUserId(usuarios[i].id);
                        usuarios[i] = { ...usuarios[i], todos };
                    }
                }
            }
        }

        return res.status(200).send(usuarios);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', (req, res) => {
    try {
        const userid = parseInt(req.params.id);
        const usuario = getById(userid);

        if(!usuario) return res.status(404).send({});

        const userDelete = deleteById(userid);

        res.status(202).send(userDelete);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.put('/:id', (req, res) => {
    try {
        const userid = parseInt(req.params.id);
        const { body } = req;

        const usuario = getById(userid);

        if(!usuario) return res.status(404).send({});

        const errores = validarUser.validateUser(body);

        if (errores) return res.status(400).send(errores);

        const user = updateById(userid, body);

        res.status(200).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;

        const errores = validarUser.validateUser(body);

        if (errores) return res.status(400).send(errores);

        const user = await save(body);

        res.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;