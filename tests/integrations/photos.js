const { apiClient } = require('./config');
const { assert } = require('chai');
const apiClientBaseUrl = "/v1/photos";

describe("PHOTOS - API", () => {
    const propsPhoto = ['id', 'albumId', 'title', 'url', 'thumbnailUrl'];
    const propsPhotoAlbum = ['id', 'albumId', 'title', 'url', 'thumbnailUrl', 'album'];
    const propsAlbum = ['id', 'userId', 'title'];

    it("Debe guardar photo", async () => {
        try {

            const data = {
                "albumId": 1,
                "title": "accusamus beatae ad facilis cum similique qui sunt",
                "url": "https://via.placeholder.com/600/92c952",
                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
            };

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(201);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsPhoto);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe guardar photo con datos incorrectos", async () => {
        try {

            const data = {
                "albumId": 1,
                "title": "",
                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
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

    it("No debe guarxar photo si album no existe", async () => {
        try {
            const data = {
                "albumId": 1000000,
                "title": "accusamus beatae ad facilis cum similique qui sunt",
                "url": "https://via.placeholder.com/600/92c952",
                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
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

    it("Debe modificar photo", async () => {
        try {
            const data = {
                "albumId": 1,
                "title": "accusamus beatae ad facilis cum similique qui sunt",
                "url": "https://via.placeholder.com/600/92c952",
                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
            };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(200);
            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsPhoto);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe modificar photo con datos incorrectos", async () => {
        try {
            const data = {
                "albumId": 1,
                "title": "",
                "url": "https://via.placeholder.com/600/92c952",
                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
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

    it("No debe modificar photo si no existe", async () => {
        try {
            const data = {
                "albumId": 1,
                "title": "accusamus beatae ad facilis cum similique qui sunt",
                "url": "https://via.placeholder.com/600/92c952",
                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
            };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1000000000`)
                .send(data)
                .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe modificar photo si album no existe", async () => {
        try {
            const data = {
                "albumId": 1000000,
                "title": "accusamus beatae ad facilis cum similique qui sunt",
                "url": "https://via.placeholder.com/600/92c952",
                "thumbnailUrl": "https://via.placeholder.com/150/92c952"
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
    

    it("Debe eliminar photo", async () => {
        try {
            const response = await apiClient
                .delete(`${apiClientBaseUrl}/1`)
                .expect(202);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsPhoto);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("No debe eliminar photo si no existe", async () => {
        try {
            const response = await apiClient
            .delete(`${apiClientBaseUrl}/100000`)
            .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });



    it("Debe listar photos", async () => {
        try {
            const response = await apiClient
                .get(`${apiClientBaseUrl}`)
                .expect(200);

            const { body } = response;
            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsPhoto);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("Debe listar photos y sus albums", async () => {
        try {
            const response = await apiClient
                .get(`${apiClientBaseUrl}?fields=album`)
                .expect(200);

            const { body } = response;
            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsPhotoAlbum);
            assert.isObject(body[0].album);
            assert.hasAllKeys(body[0].album, propsAlbum);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }).timeout(10000);


    it("Debe obtener photo por ID", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1`)
            .expect(200);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsPhoto);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("Debe obtener photo por ID y su album", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1?fields=album`)
            .expect(200);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsPhotoAlbum);
            assert.isObject(body.album);
            assert.hasAllKeys(body.album, propsAlbum);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe obtener photo por ID", async () => {
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