const router = require('express').Router();
const { getAll, save, getById, updateById, deleteById } = require('../repositorio/albums');
const repoPhotos = require('../repositorio/photos');
const repoUsers = require('../repositorio/users');
const validarAlbum = require('../validadores/album');

router.get('/', (req, res) => {
    try {
        let albums = getAll();
        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');

            for (let i = 0; i < albums.length; i++) {
                if (splitQuery.length > 0) {
                    if (splitQuery.find(x => x === 'photos')) {
                        let photos = repoPhotos.getPhotosByAlbumId(albums[i].id);
                        albums[i] = { ...albums[i], photos };
                    }
                }
            }
        }

        return res.status(200).send(albums);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});


router.get('/:id', (req, res) => {
    try {
        const albumid = parseInt(req.params.id);
        let album = getById(albumid);

        if(!album) return res.status(404).send({});

        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');
            if (splitQuery.length > 0) {
                if (splitQuery.find(x => x === 'photos')) {
                    let photos = repoPhotos.getPhotosByAlbumId(album.id);
                    album = { ...album, photos };
                }
            }
        }

        return res.status(200).send(album);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.post('/', (req, res) => {
    try {
        const { body } = req;

        const errores = validarAlbum.validateAlbum(body);

        if (errores) return res.status(400).send(errores);

        const user = repoUsers.getById(body.userId);

        if(!user) return res.status(404).send({});

        const album = save(body);

        res.status(201).send(album);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.delete('/:id', (req, res) => {
    try {
        const albumid = parseInt(req.params.id);
        const album = getById(albumid);

        if(!album) return res.status(404).send({});

        const albumDelete = deleteById(albumid);

        res.status(202).send(albumDelete);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.put('/:id', (req, res) => {
    try {
        const albumid = parseInt(req.params.id);
        const { body } = req;

        const album = getById(albumid);

        if(!album) return res.status(404).send({});

        const errores = validarAlbum.validateAlbum(body);

        if (errores) return res.status(400).send(errores);

        const user = repoUsers.getById(body.userId);

        if(!user) return res.status(404).send({});

        const albumUpdate = updateById(albumid, body);

        res.status(200).send(albumUpdate);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;