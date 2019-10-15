const fs = require('fs');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/photos.json'))
}

const getAll = () => {
    return getJSON();
}

module.exports = {
    getAll
}