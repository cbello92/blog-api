const { assert } = require('chai');
const validateTodo = require('../../validadores/todo');

describe("VALIDADOR TODO - API", () => {
    it("El campo userId es requerido", () => {
        const data = {
            // "userId": 1,
            "title": "delectus aut autem",
            "completed": false
        }

        const validaciones = validateTodo.validateTodo(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["userId"]);
        assert.isArray(validaciones.userId);
        assert.isNotEmpty(validaciones.userId);
    });

    it("El campo title es requerido", () => {
        const data = {
            "userId": 1,
            // "title": "delectus aut autem",
            "completed": false
        }

        const validaciones = validateTodo.validateTodo(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["title"]);
        assert.isArray(validaciones.title);
        assert.isNotEmpty(validaciones.title);
    });


    it("El campo title debe tener entre 10 y 50 caracteres", () => {
        const data = {
            "userId": 1,
            "title": "delectus",
            "completed": false
        }

        const validaciones = validateTodo.validateTodo(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["title"]);
        assert.isArray(validaciones.title);
        assert.isNotEmpty(validaciones.title);
    });

    it("El campo completed es requerido", () => {
        const data = {
            "userId": 1,
            "title": "delectus aut autem",
            // "completed": false
        }

        const validaciones = validateTodo.validateTodo(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["completed"]);
        assert.isArray(validaciones.completed);
        assert.isNotEmpty(validaciones.completed);
    });

    it("El campo completed debe ser boolean", () => {
        const data = {
            "userId": 1,
            "title": "delectus aut autem",
            "completed": "false"
        }

        const validaciones = validateTodo.validateTodo(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["completed"]);
        assert.isArray(validaciones.completed);
        assert.isNotEmpty(validaciones.completed);
    });
});