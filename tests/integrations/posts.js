const { apiClient } = require('./config');
const { assert } = require('chai');
const apiClientBaseUrl = "/v1/posts";

describe("POSTS - API", () => {
    const propsPost = ['id', 'userId', 'title', 'body'];
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

    it("", async () => {
        try {
            
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("", async () => {
        try {
            
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("", async () => {
        try {
            
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("", async () => {
        try {
            
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("", async () => {
        try {
            
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("", async () => {
        try {
            
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });
});
