const fs = require('fs');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/comments.json'));
}

const getAll = () => {
    return getJSON();
}

const getCommentsByPost = (postid) => {
    let data = getJSON();
    return data.filter(x => x.postId === postid);
}


const getById = (commentId) => {
    let data = getJSON();
    return data.find(x => x.id === commentId);
}

const save = (comment) => {
    let id = null;
    let data = getJSON();
    if(data.length > 0) {
        id = data[data.length - 1].id + 1;
    }

    return { id, ...comment }
}

const updateById = (commentId, newComment) => {
    let data = getJSON();
    let comment = data.find(x => x.id === commentId);
    let id = comment.id;

    return { id, ...newComment };
}

const deleteById = (commentId) => {
    let data = getJSON();
    return data.find(x => x.id === commentId) || undefined;
}

module.exports = {
    getAll,
    getById,
    getCommentsByPost,
    save,
    updateById,
    deleteById
}