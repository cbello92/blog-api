const fs = require('fs');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/users.json'));
}

const save = (user) => {
    let id = null;
    let data = getJSON();
    if(data.length > 0) {
        id = data[data.length - 1].id + 1;
    }

    return { id, ...user }
}

const updateById = (userid, user) => {
    let data = getJSON();
    let usuario = data.find(x => x.id === userid);
    let id = usuario.id;

    return { id, ...user };

}

const deleteById = (userid) => {
    let data = getJSON();
    return data.find(x => x.id === userid) || undefined;
}

const getAll = () => {
    return getJSON();
}

const getById = (userid) => {
    let data = getJSON();
    return data.find(x => x.id === userid) || undefined;
}

module.exports = {
    getAll,
    getById,
    save,
    updateById,
    deleteById
}