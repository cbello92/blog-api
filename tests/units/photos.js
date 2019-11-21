const { assert } = require('chai');
const validatePhoto = require('../../validadores/photo');

describe("VALIDADOR PHOTOS - API", () => {
    it("El campo albumId es requerido", () => {
        const data = {
            // "albumId": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        }

        const validaciones = validatePhoto.validatePhoto(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["albumId"]);
        assert.isArray(validaciones.albumId);
        assert.isNotEmpty(validaciones.albumId);
    });

    it("El campo title es requerido", () => {
        const data = {
            "albumId": 1,
            "title": "",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        }

        const validaciones = validatePhoto.validatePhoto(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["title"]);
        assert.isArray(validaciones.title);
        assert.isNotEmpty(validaciones.title);
    });

    it("El campo title debe tener entre 10 y 50 caracteres", () => {
        const data = {
            "albumId": 1,
            "title": "accusa",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        }

        const validaciones = validatePhoto.validatePhoto(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["title"]);
        assert.isArray(validaciones.title);
        assert.isNotEmpty(validaciones.title);
    });


    it("El campo url es requerido", () => {
        const data = {
            "albumId": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            // "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        }

        const validaciones = validatePhoto.validatePhoto(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["url"]);
        assert.isArray(validaciones.url);
        assert.isNotEmpty(validaciones.url);
    });


    it("El campo url debe tener entre 10 y 50 caracteres", () => {
        const data = {
            "albumId": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        }

        const validaciones = validatePhoto.validatePhoto(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["url"]);
        assert.isArray(validaciones.url);
        assert.isNotEmpty(validaciones.url);
    });


    it("El campo url debe comenzar con http://", () => {
        const data = {
            "albumId": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "ht://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        }

        const validaciones = validatePhoto.validatePhoto(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["url"]);
        assert.isArray(validaciones.url);
        assert.isNotEmpty(validaciones.url);
    });


    it("El campo thumbnailUrl es requerido", () => {
        const data = {
            "albumId": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            // "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        }

        const validaciones = validatePhoto.validatePhoto(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["thumbnailUrl"]);
        assert.isArray(validaciones.thumbnailUrl);
        assert.isNotEmpty(validaciones.thumbnailUrl);
    });

    it("El campo thumbnailUrl debe tener entre 10 y 50 caracteres", () => {
        const data = {
            "albumId": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://"
        }

        const validaciones = validatePhoto.validatePhoto(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["thumbnailUrl"]);
        assert.isArray(validaciones.thumbnailUrl);
        assert.isNotEmpty(validaciones.thumbnailUrl);
    });
});