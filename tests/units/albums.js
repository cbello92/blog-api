const { assert } = require('chai');
const validateAlbum = require('../../validadores/album');
const albumsRepositorio = require('../../repositorio/albums');

describe("VALIDADOR ALBUMS - API", () => {
    it("El campo userId es requerido", () => {
        const data = {
            // "userId": 1,
            "title": "quidem molestiae enim"
        }

        const validaciones = validateAlbum.validateAlbum(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["userId"]);
        assert.isArray(validaciones.userId);
        assert.isNotEmpty(validaciones.userId);
    });

    it("El campo title es requerido", () => {
        const data = {
            "userId": 1,
            "title": ""
        }

        const validaciones = validateAlbum.validateAlbum(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["title"]);
        assert.isArray(validaciones.title);
        assert.isNotEmpty(validaciones.title);
    });


    it("El campo userId debe tener entre 10 y 50 caracteres", () => {
        const data = {
            "userId": 1,
            "title": "quide"
        }

        const validaciones = validateAlbum.validateAlbum(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["title"]);
        assert.isArray(validaciones.title);
        assert.isNotEmpty(validaciones.title);
    });



    it("Album valido", () => {
        const data = {
            "userId": 1,
            "title": "quidem molestiae enim"
        }

        const validaciones = validateAlbum.validateAlbum(data);
        assert.isUndefined(validaciones);
        
        albumsRepositorio.save(data);
    });
});