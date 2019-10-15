const fs = require('fs');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/todos.json'));
}

const getAll = () => {
    return getJSON();
}

const getById = (todoid) => {
    let data = getJSON();
    return data.find(x => x.id === todoid);
}

const getTodosByUserId = (userid) => {
    let data = getJSON();
    return data.filter(x => x.userId === userid);
}

const save = (todo) => {
    let id = null;
    let data = getJSON();
    if(data.length > 0) {
        id = data[data.length - 1].id + 1;
    }

    return { id, ...todo }
}


const updateById = (todoid, newTodo) => {
    let data = getJSON();
    let todo = data.find(x => x.id === todoid);
    let id = todo.id;

    return { id, ...newTodo };

}

const deleteById = (todoid) => {
    let data = getJSON();
    return data.find(x => x.id === todoid) || undefined;
}

module.exports = {
    getAll,
    getTodosByUserId,
    getById,
    save,
    updateById, 
    deleteById
}