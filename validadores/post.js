const _ = require('lodash');

const validatePost = (post) => {
    const validaciones = {};
    if (Object.keys(post).length === 0) {
        return { post : ["Se requiren datos"] };
    }

    if (!post.userId) {
        validaciones.userId = [
            "El userId es requerido"
        ];
    }

    if (!post.title) {
        validaciones.title = [
            "El title es requerido",
            "El title debe tener entre 10 y 500 caracteres"
        ];
    } else {
        const largo = post.title.length;
        if(largo < 10 || largo > 500) {
            validaciones.title = [
                "El title debe tener entre 10 y 500 caracteres"
            ];
        }
    }

    if (!post.body) {
        validaciones.body = [
            "El body es requerido",
            "El body debe tener entre 10 y 500 caracteres"
        ];
    } else {
        const largo = post.body.length;
        if(largo < 10 || largo > 500) {
            validaciones.body = [
                "El body debe tener entre 10 y 500 caracteres"
            ];
        }
    }

    const tieneErrores = Object.keys(validaciones).length > 0;

    return tieneErrores ? validaciones : undefined;
};

exports.validatePost = validatePost;