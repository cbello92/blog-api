const { assert } = require('chai');
const validatePost = require('../../validadores/post');

describe("VALIDADOR POST - API", () => {
    it("El campo userId es requerido", () => {
        const data = {
            // "userId": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }

        const validaciones = validatePost.validatePost(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["userId"]);
        assert.isArray(validaciones.userId);
        assert.isNotEmpty(validaciones.userId);
    });


    it("El campo title es requerido", () => {
        const data = {
            "userId": 1,
            "title": "",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }

        const validaciones = validatePost.validatePost(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["title"]);
        assert.isArray(validaciones.title);
        assert.isNotEmpty(validaciones.title);
    });

    it("El campo title debe tener entre 10 y 500 caracteres", () => {
        const data = {
            "userId": 1,
            "title": "sunt aut",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }

        const validaciones = validatePost.validatePost(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["title"]);
        assert.isArray(validaciones.title);
        assert.isNotEmpty(validaciones.title);
    });

    it("El campo body es requerido", () => {
        const data = {
            "userId": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": ""
        }

        const validaciones = validatePost.validatePost(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["body"]);
        assert.isArray(validaciones.body);
        assert.isNotEmpty(validaciones.body);
    });

    it("El campo body debe tener entre 10 y 500 caracteres", () => {
        const data = {
            "userId": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et"
        }

        const validaciones = validatePost.validatePost(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["body"]);
        assert.isArray(validaciones.body);
        assert.isNotEmpty(validaciones.body);
    });
});