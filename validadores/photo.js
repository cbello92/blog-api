const _ = require('lodash');

const validatePhoto = (photo) => {
    const validaciones = {};
    if (Object.keys(photo).length === 0) {
        return { photo : ["Se requiren datos"] };
    }

    if (!photo.albumId) {
        validaciones.albumId = [
            "El albumId es requerido"
        ];
    }

    if (!photo.title) {
        validaciones.title = [
            "El photo title es requerido",
            "El photo title debe tener entre 10 y 50 caracteres"
        ];
    } else {
        const largo = photo.title.length;
        if(largo < 10 || largo > 50) {
            validaciones.title = [
                "El photo title debe tener entre 10 y 50 caracteres"
            ];
        }
    }

    if (!photo.url) {
        validaciones.url = [
            "El photo url es requerido",
            "El photo url debe tener entre 10 y 50 caracteres"
        ];
    } else {
        const largo = photo.url.length;
        if(largo < 10 || largo > 50) {
            validaciones.url = [
                "El photo url debe tener entre 10 y 50 caracteres"
            ];
        } else {
            if(!_.startsWith(photo.url, "https://")) {
                validaciones.url = [
                    "El photo url debe comenzar con https://"
                ];
            }
        }
    }

    if (!photo.thumbnailurl) {
        validaciones.thumbnailurl = [
            "El photo thumbnailurl es requerido",
            "El photo thumbnailurl debe tener entre 10 y 50 caracteres"
        ];
    } else {
        const largo = photo.thumbnailurl.length;
        if(largo < 10 || largo > 50) {
            validaciones.thumbnailurl = [
                "El photo thumbnailurl debe tener entre 10 y 50 caracteres"
            ];
        }
    }

    const tieneErrores = Object.keys(validaciones).length > 0;

    return tieneErrores ? validaciones : undefined;
};

exports.validatePhoto = validatePhoto;