const _ = require('lodash');

const validateTodo = (todo) => {
    const validaciones = {};
    if (Object.keys(todo).length === 0) {
        return { todo : ["Se requiren datos"] };
    }

    if (!todo.userId) {
        validaciones.userId = [
            "El userId es requerido"
        ];
    }

    if (!todo.title) {
        validaciones.title = [
            "El title es requerido",
            "El title debe tener entre 10 y 50 caracteres"
        ];
    } else {
        const largo = todo.title.length;
        if(largo < 10 || largo > 50) {
            validaciones.title = [
                "El title debe tener entre 10 y 50 caracteres"
            ];
        }
    }

    if (todo.completed === null) {
        validaciones.completed = [
            "completed es requerido"
        ];
    } else {
        if(typeof todo.completed !== "boolean") {
            validaciones.completed = [
                "completed es puede tomar sólo valores booleanos"
            ];
        }
    }

    const tieneErrores = Object.keys(validaciones).length > 0;

    return tieneErrores ? validaciones : undefined;
};

exports.validateTodo = validateTodo;