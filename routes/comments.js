const router = require('express').Router();

router.get('/', (req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;