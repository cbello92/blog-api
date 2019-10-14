const data = require('./resources/posts.json');

const getAll = () => {
    return data;
}

const getById = (id) => {
    return data.find(x => x.id === id) || undefined;
}

const getPostsByUserId = (userid) => {
    return data.filter(x => x.userId === userid);
}

module.exports = {
    getAll,
    getById,
    getPostsByUserId
}