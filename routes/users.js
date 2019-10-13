const router = require('express').Router();
const { getAll } = require('../repositorio/users');

router.get('/', (req, res) => {
    try {
        const pacientes = getAll();
        res.send(pacientes);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;