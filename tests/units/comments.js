const { assert } = require('chai');
const validateComment = require('../../validadores/comment');

describe("VALIDADOR COMMENT - API", () => {
    it("El campo postId es requerido", () => {
        const data = {
            // "postId": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.com",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        }

        const validaciones = validateComment.validateComment(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["postId"]);
        assert.isArray(validaciones.postId);
        assert.isNotEmpty(validaciones.postId);
    });



    it("El campo name es requerido", () => {
        const data = {
            "postId": 1,
            // "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.com",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        }

        const validaciones = validateComment.validateComment(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["name"]);
        assert.isArray(validaciones.name);
        assert.isNotEmpty(validaciones.name);
    });

    it("El campo name debe tener entre 10 y 50 caracteres", () => {
        const data = {
            "postId": 1,
            "name": "id labore",
            "email": "Eliseo@gardner.com",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        }

        const validaciones = validateComment.validateComment(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["name"]);
        assert.isArray(validaciones.name);
        assert.isNotEmpty(validaciones.name);
    });



    it("El campo email es requerido", () => {
        const data = {
            "postId": 1,
            "name": "id labore ex et quam laborum",
            "email": "",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        }

        const validaciones = validateComment.validateComment(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["email"]);
        assert.isArray(validaciones.email);
        assert.isNotEmpty(validaciones.email);
    });


    it("El campo email debe tener entre 10 y 50 caracteres", () => {
        const data = {
            "postId": 1,
            "name": "id labore ex et quam laborum",
            "email": "e@a.com",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        }

        const validaciones = validateComment.validateComment(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["email"]);
        assert.isArray(validaciones.email);
        assert.isNotEmpty(validaciones.email);
    });


    it("El campo email debe terminar en .com o .cl", () => {
        const data = {
            "postId": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.net",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        }

        const validaciones = validateComment.validateComment(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["email"]);
        assert.isArray(validaciones.email);
        assert.isNotEmpty(validaciones.email);
    });



    it("El campo body es requerido", () => {
        const data = {
            "postId": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.com",
            "body": ""
        }

        const validaciones = validateComment.validateComment(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["body"]);
        assert.isArray(validaciones.body);
        assert.isNotEmpty(validaciones.body);
    });



    it("El campo body debe tener entre 10 y 500 caracteres", () => {
        const data = {
            "postId": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.com",
            "body": "laudantium"
        }

        const validaciones = validateComment.validateComment(data);
        assert.isObject(validaciones);
        assert.hasAllKeys(validaciones, ["body"]);
        assert.isArray(validaciones.body);
        assert.isNotEmpty(validaciones.body);
    });
});