const data = require('./resources/albums.json');
const fs = require('fs');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/albums.json'));
}

const getAll = () => {
    return getJSON();
}

const getById = (albumid) => {
    let data = getJSON();
    return data.find(x => x.id === albumid) || undefined;
}

const getAlbumsByUserId = (userid) => {
    let data = getJSON();
    return data.filter(x => x.userId === userid);
}

const save = (album) => {
    let id = null;
    let data = getJSON();
    if(data.length > 0) {
        id = data[data.length - 1].id + 1;
    }

    return { id, ...album }
}


const updateById = (albumid, newAlbum) => {
    let data = getJSON();
    let album = data.find(x => x.id === albumid);
    let id = album.id;

    return { id, ...newAlbum };

}

const deleteById = (albumid) => {
    let data = getJSON();
    return data.find(x => x.id === albumid) || undefined;
}

module.exports = {
    getAll,
    getById,
    getAlbumsByUserId,
    save,
    updateById,
    deleteById
}