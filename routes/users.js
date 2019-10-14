const router = require('express').Router();
const { getAll } = require('../repositorio/users');
const { getByUserId } = require('../repositorio/posts');

router.get('/', (req, res) => {
    try {
        let usuarios = getAll();
        if (req.query && req.query.fields) {
            let splitQuery = req.query.fields.split(',');
            console.log(splitQuery.length);

            if (splitQuery.length > 0) {
                for (let i = 0; i < splitQuery.length; i++) {
                    if (splitQuery[i] === 'posts') {
                        for (let j = 0; j < usuarios.length; j++) {
                            usuarios[j].posts= getByUserId(usuarios[j].id);
                        }
                    }
                }
            }

            splitQuery = [];
        }
        res.status(200).send(usuarios);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;