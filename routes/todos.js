const router = require('express').Router();
const { getAll, getById, save, updateById, deleteById } = require('../repositorio/todos');
const repoUsers = require('../repositorio/users');
const validarTodo = require('../validadores/todo');

router.get('/:id', (req, res) => {
    try {
        const todoid = parseInt(req.params.id);
        let todo = getById(todoid);

        if(!todo) return res.status(404).send({});

        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');
            if (splitQuery.length > 0) {
                if (splitQuery.find(x => x === 'user')) {
                    let user = repoUsers.getById(todo.userId);
                    todo = { ...todo, user };
                }
            }
        }
        return res.status(200).send(todo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.get('/', (req, res) => {
    try {
        let todos = getAll();
        if (req.query && req.query.fields && req.query.fields.length > 0) {
            let splitQuery = req.query.fields.split(',');

            for (let i = 0; i < todos.length; i++) {
                if (splitQuery.length > 0) {
                    if (splitQuery.find(x => x === 'user')) {
                        let user = repoUsers.getById(todos[i].userId);
                        todos[i] = { ...todos[i], user };
                    }
                }
            }
        }
        return res.status(200).send(todos);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.post('/', (req, res) => {
    try {
        const { body } = req;

        const errores = validarTodo.validateTodo(body);

        if (errores) return res.status(400).send(errores);

        const user = repoUsers.getById(body.userId);

        if(!user) return res.status(404).send({});

        const todo = save(body);

        res.status(201).send(todo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.delete('/:id', (req, res) => {
    try {
        const todoid = parseInt(req.params.id);
        const todo = getById(todoid);

        if(!todo) return res.status(404).send({});

        const todoDelete = deleteById(todoid);

        res.status(202).send(todoDelete);

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

router.put('/:id', (req, res) => {
    try {
        const todoid = parseInt(req.params.id);
        const { body } = req;

        const todo = getById(todoid);

        if(!todo) return res.status(404).send({});

        const errores = validarTodo.validateTodo(body);

        if (errores) return res.status(400).send(errores);

        const user = repoUsers.getById(body.userId);

        if(!user) return res.status(404).send({});

        const todoUpdate = updateById(todoid, body);

        res.status(200).send(todoUpdate);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;