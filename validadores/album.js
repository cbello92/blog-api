const _ = require('lodash');

const validateAlbum = (album) => {
    const validaciones = {};
    if (Object.keys(album).length === 0) {
        return { album : ["Se requiren datos"] };
    }

    if (!album.userId) {
        validaciones.userId = [
            "El userId es requerido"
        ];
    }

    if (!album.title) {
        validaciones.title = [
            "El title es requerido",
            "El title debe tener entre 10 y 500 caracteres"
        ];
    } else {
        const largo = album.title.length;
        if(largo < 10 || largo > 50) {
            validaciones.title = [
                "El title debe tener entre 10 y 50 caracteres"
            ];
        }
    }
    const tieneErrores = Object.keys(validaciones).length > 0;

    return tieneErrores ? validaciones : undefined;
};

exports.validateAlbum = validateAlbum;