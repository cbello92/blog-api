const fs = require('fs');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/todos.json'));
}

const getAll = () => {
    return getJSON();
}

const getTodosByUserId = (userid) => {
    let data = getJSON();
    return data.filter(x => x.userId === userid);
}

module.exports = {
    getAll,
    getTodosByUserId
}