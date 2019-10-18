const { apiClient } = require('./config');
const { assert } = require('chai');
const apiClientBaseUrl = "/v1/posts";

describe("POSTS - API", () => {
    const propsPost = ['id', 'userId', 'title', 'body'];
    const propsPostFields = ['id', 'userId', 'title', 'body', 'user', 'comments'];
    it("Debe guardar un post", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            };

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(201);

            const { body } = response;
            assert.isObject(body, 'No es un objeto');
            assert.hasAllKeys(body, propsPost);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe guardar post con datos incorrectos", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
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

    it("No debe guardar post si user no existe", async () => {
        try {
            const data = {
                "userId": 10000,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
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

    it("Debe editar un post por ID", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(200);

            const { body } = response;
            assert.isObject(body, 'No es un objeto');
            assert.hasAllKeys(body, propsPost);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe editar post por ID con datos incorrectos", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "sunt"
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

    it("No debe editar post por ID que no exista", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/10000000000`)
                .send(data)
                .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe editar post por ID si user no existe", async () => {
        try {
            const data = {
                "userId": 111,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
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

    it("Debe eliminar un post por ID", async () => {
        try {
            const response = await apiClient
                .delete(`${apiClientBaseUrl}/1`)
                .expect(202);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe eliminar por ID si no existe", async () => {
        try {
            const response = await apiClient
                .delete(`${apiClientBaseUrl}/1000000000`)
                .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe listar todos los posts", async () => {
        try {
            const response = await apiClient
                .get(`${apiClientBaseUrl}`)
                .expect(200);
            
            const { body } = response;
            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsPost);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe listar todos los post y fields => user,comments", async () => {
        try {
            const response = await apiClient
                .get(`${apiClientBaseUrl}?fields=user,comments`)
                .expect(200);
            
            const { body } = response;
            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsPostFields);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe obtener un post por ID", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1`)
            .expect(200);
        
            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsPost);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("Debe obtener un post por ID y sus fields => user,comments", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1?fields=user,comments`)
            .expect(200);
        
            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsPostFields);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe obtener un post por ID", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/100000000`)
            .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });
});
