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

module.exports = {
    getAll,
    getCommentsByPost
}