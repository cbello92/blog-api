const _ = require('lodash');

const validateComment = (comment) => {
    const validaciones = {};
    if (Object.keys(comment).length === 0) {
        return { comment : ["Se requiren datos"] };
    }

    if (!comment.postId) {
        validaciones.postId = [
            "El postId es requerido"
        ];
    }

    if (!comment.name) {
        validaciones.name = [
            "El comment name es requerido",
            "El comment name debe tener entre 10 y 50 caracteres"
        ];
    } else {
        const largo = comment.name.length;
        if(largo < 10 || largo > 50) {
            validaciones.name = [
                "El comment name debe tener entre 10 y 50 caracteres"
            ];
        }
    }


    if (!comment.email) {
        validaciones.email = [
            "El comment email es requerido",
            "El comment email debe tener entre 10 y 50 caracteres"
        ];
    } else {
        const largo = comment.email.length;
        if(largo < 10 || largo > 50) {
            validaciones.email = [
                "El comment email debe tener entre 10 y 50 caracteres"
            ];
        }  else {
            if(!_.endsWith(comment.email, '.com') && !_.endsWith(comment.email, '.cl')) {
                validaciones.email = [
                    "El email debe tener el formato correcto, debe terminar en .com o .cl"
                ];
            }
        }
    }

    if(!comment.body) {
        validaciones.body = [
            "El comment body es requerido",
            "El comment body debe tener entre 50 y 500 caracteres"
        ];
    } else {
        const largo = comment.body.length;
        if(largo < 50 || largo > 500) {
            validaciones.body = [
                "El comment body debe tener entre 50 y 500 caracteres"
            ];
        }
    }

    const tieneErrores = Object.keys(validaciones).length > 0;

    return tieneErrores ? validaciones : undefined;
};

exports.validateComment = validateComment;