const router = require('express').Router();
const { getAll, getById, save, updateById, deleteById } = require('../repositorio/photos');
const repoAlbums = require('../repositorio/albums');
const validarPhoto = require('../validadores/photo');


router.get('/:id', (req, res) => {
    try {
        const photoid = Number(req.params.id);
        let photo = getById(photoid);
        if(!photo) return res.status(404).send({});

        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');
            if (splitQuery.length > 0) {
                if (splitQuery.find(x => x === 'album')) {
                    let album = repoAlbums.getById(photo.albumId);
                    photo = { ...photo, album };
                }
            }
        }

        return res.status(200).send(photo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.get('/', (req, res) => {
    try {
        let photos = getAll();
        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');

            for (let i = 0; i < photos.length; i++) {
                if (splitQuery.length > 0) {
                    if (splitQuery.find(x => x === 'album')) {
                        let album = repoAlbums.getById(photos[i].albumId);
                        photos[i] = { ...photos[i], album };
                    }
                }
            }
        }

        return res.status(200).send(photos);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});


router.post('/', (req, res) => {
    try {
        const { body } = req;

        const errores = validarPhoto.validatePhoto(body);

        if (errores) return res.status(400).send(errores);

        const album = repoAlbums.getById(body.albumId);

        if(!album) return res.status(404).send({});

        const photo = save(body);

        res.status(201).send(photo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.delete('/:id', (req, res) => {
    try {
        const photoid = parseInt(req.params.id);
        const photo = getById(photoid);

        if(!photo) return res.status(404).send({});

        const photoDelete = deleteById(photoid);

        res.status(202).send(photoDelete);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.put('/:id', (req, res) => {
    try {
        const photoid = parseInt(req.params.id);
        const { body } = req;

        const photo = getById(photoid);

        if(!photo) return res.status(404).send({});

        const errores = validarPhoto.validatePhoto(body);

        if (errores) return res.status(400).send(errores);

        const album = repoAlbums.getById(body.albumId);

        if(!album) return res.status(404).send({});

        const photoUpdate = updateById(photoid, body);

        res.status(200).send(photoUpdate);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;