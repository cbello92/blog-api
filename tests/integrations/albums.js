const { apiClient } = require('./config');
const { assert } = require('chai');
const apiClientBaseUrl = "/v1/albums";

describe("ALBUMS - API", () => {
    const propsAlbum = ['id', 'userId', 'title'];
    const propsPhoto = ['id', 'albumId', 'title', 'url', 'thumbnailUrl'];
    const propsAlbumPhotos = ['id', 'userId', 'title', 'photos'];

    it("Debe guardar un album", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "quidem molestiae enim"
            }

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(201);

            const { body } = response;

            assert.isObject(body);
            assert.hasAllKeys(body, propsAlbum);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("No debe guardar album si user no existe", async () => {
        try {
            const data = {
                "userId": 100,
                "title": "quidem molestiae enim"
            }

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("No debe guardar album con datos incorrectos", async () => {
        try {
            const data = {
                "userId": 100,
                "title": ""
            }

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(400);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe modificar album", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "quidem molestiae enim"
            }

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(200);

            const { body } = response;    
            assert.isObject(body);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe modificar album con datos incorrectos", async () => {
        try {
            const data = {
                "userId": 1,
                "title": ""
            }

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(400);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe modificar album si user no existe", async () => {
        try {
            const data = {
                "userId": 10000,
                "title": "quidem molestiae enim"
            }

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe eliminar un album", async () => {
        try {
            const response = await apiClient
            .delete(`${apiClientBaseUrl}/1`)
            .expect(202);

            const { body } = response;

            assert.isObject(body);
            assert.hasAllKeys(body, propsAlbum);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe eliminar album si no existe", async () => {
        try {
            const response = await apiClient
            .delete(`${apiClientBaseUrl}/100000`)
            .expect(404);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe listar todos los albums", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}`)
            .expect(200);

            const { body } = response;
            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsAlbum);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe listar todos los albums y sus photos", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}?fields=photos`)
            .expect(200);

            const { body } = response;
            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsAlbumPhotos);
            assert.isArray(body[0].photos);
            assert.isObject(body[0].photos[0]);
            assert.hasAllKeys(body[0].photos[0], propsPhoto);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe mostrar un album", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1`)
            .expect(200);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsAlbum);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe mostrar un album y sus photos", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1?fields=photos`)
            .expect(200);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsAlbumPhotos);
            assert.isArray(body.photos);
            assert.isObject(body.photos[0]);
            assert.hasAllKeys(body.photos[0], propsPhoto);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe mostrar un album y sus photos si no existe", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1000000?fields=photos`)
            .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });
});