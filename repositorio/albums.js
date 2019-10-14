const data = require('./resources/albums.json');
const fs = require('fs');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/albums.json'));
}

const getAll = () => {
    return getJSON();
}

const getAlbumsByUserId = (userid) => {
    let data = getJSON();
    return data.filter(x => x.userId === userid);
}

module.exports = {
    getAll,
    getAlbumsByUserId
}