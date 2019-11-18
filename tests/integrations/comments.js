const { apiClient } = require('./config');
const { assert } = require('chai');
const apiClientBaseUrl = "/v1/comments";

describe("COMMENTS - API", () => {
    // const propsUser = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'];
    // const propsAddress = ['street', 'suite', 'city', 'zipcode', 'geo'];
    // const propsGeo = ['lat', 'lng'];
    // const propsCompany = ['name', 'catchphrase', 'bs'];
    // const propsComment = ['id', 'postid', 'name', 'email', 'body'];
    const propsCommentPost = ['id', 'postId', 'name', 'email', 'body'];
    const propsCommentAndPost = ['id', 'postId', 'name', 'email', 'body', 'post'];
    const propsPost = ['id', 'userId', 'title', 'body'];

    it("Debe guardar comentario", async () => {
        try {

            const data = {
                "postId": 1,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.com",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(201);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsCommentPost);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe guardar comentario si post no existe", async () => {
        try {
            const data = {
                "postId": 10000,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.com",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe guardar comentario con datos incorrectos", async () => {
        try {
            const data = {
                "postId": 1,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.net",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(400);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe actualizar comentario", async () => {
        try {
            const data = {
                "postId": 1,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.com",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(200);
            
            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsCommentPost);
        
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe actualizar comentario si no existe", async () => {
        try {
            const data = {
                "postId": 1,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.com",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1000000`)
                .send(data)
                .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe actualizar comentario si post no existe", async () => {
        try {
            const data = {
                "postId": 1000000,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.com",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe actualizar comentario con datos incorrectos", async () => {
        try {
            const data = {
                "postId": 1,
                "name": "",
                "email": "Eliseo@gardner.net",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(400);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe eliminar comentario", async () => {
        try {
            const response = await apiClient
                .delete(`${apiClientBaseUrl}/1`)
                .expect(202);
            
            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsCommentPost);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe eliminar comentario si no existe", async () => {
        try {
            const response = await apiClient
                .delete(`${apiClientBaseUrl}/10000000`)
                .expect(404);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe listar todos los comentarios", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}`)
            .expect(200);

            const { body } = response;

            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsCommentPost);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe listar todos los comentarios y sus posts correspondientes", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}?fields=post`)
            .expect(200);

            const { body } = response;

            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsCommentAndPost);
            assert.isObject(body[0].post);
            assert.hasAllKeys(body[0].post, propsPost);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe obtener comentario por ID", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1`)
            .expect(200);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsCommentPost);
        
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("Debe obtener comentario por ID y su POST", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1?fields=post`)
            .expect(200);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsCommentAndPost);
            assert.isObject(body.post);
            assert.hasAllKeys(body.post, propsPost);
        
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe obtener comentario por ID", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/10000000`)
            .expect(404);
        
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

});