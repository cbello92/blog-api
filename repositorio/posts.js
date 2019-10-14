const fs = require('fs');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/posts.json'));
}

const getAll = () => {
    return getJSON();
}

const getById = (id) => {
    let data = getJSON();
    return data.find(x => x.id === id) || undefined;
}

const getPostsByUserId = (userid) => {
    let data = getJSON();
    return data.filter(x => x.userId === userid);
}

const save = (post) => {
    let id = null;
    let data = getJSON();
    if(data.length > 0) {
        id = data[data.length - 1].id + 1;
    }

    return { id, ...post }
}

const updateById = (postid, newPost) => {
    let data = getJSON();
    let post = data.find(x => x.id === postid);
    let id = post.id;

    return { id, ...newPost };
}

const deleteById = (postid) => {
    let data = getJSON();
    return data.find(x => x.id === postid) || undefined;
}

module.exports = {
    getAll,
    getById,
    getPostsByUserId,
    save,
    updateById,
    deleteById
}