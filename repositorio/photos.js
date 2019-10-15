const fs = require('fs');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/photos.json'))
}

const getAll = () => {
    return getJSON();
}

const getById = (photoid) => {
    let data = getJSON();
    return data.find(x => x.id === photoid) || undefined;
}

const getPhotosByAlbumId = (albumid) => {
    let data = getJSON();
    return data.filter(x => x.albumId === albumid);
}

const save = (photo) => {
    let id = null;
    let data = getJSON();
    if(data.length > 0) {
        id = data[data.length - 1].id + 1;
    }

    return { id, ...photo }
}


const updateById = (photoid, newPhoto) => {
    let data = getJSON();
    let photo = data.find(x => x.id === photoid);
    let id = photo.id;

    return { id, ...newPhoto };

}

const deleteById = (photoid) => {
    let data = getJSON();
    return data.find(x => x.id === photoid) || undefined;
}

module.exports = {
    getAll,
    getPhotosByAlbumId,
    getById,
    save,
    updateById,
    deleteById
}