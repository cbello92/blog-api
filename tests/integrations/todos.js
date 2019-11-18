const { apiClient } = require('./config');
const { assert } = require('chai');
const apiClientBaseUrl = "/v1/todos";

describe("TODOS - API", () => {
    const propsTodo = ['id', 'userId', 'title', 'completed'];
    const propsTodoUser = ['id', 'userId', 'title', 'completed', 'user'];
    const propsUser = ['id', 'name', 'username', 'email', 'phone', 'website'];
    const propsUsers = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'];
    const propsAddress = ['street', 'suite', 'city', 'zipcode', 'geo'];
    const propsGeo = ['lat', 'lng'];
    const propsCompany = ['name', 'catchPhrase', 'bs'];

    it("Debe guardar todo", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "delectus aut autem",
                "completed": false
            };

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(201);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsTodo);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe guardar todo con datos incorrectos", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "",
                "completed": "false"
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

    it("No debe guardar todo si user no existe", async () => {
        try {
            const data = {
                "userId": 1000,
                "title": "delectus aut autem",
                "completed": false
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

    it("Debe modificar todo", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "delectus aut autem",
                "completed": false
            };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(200);
            
            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsTodo);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe modificar todo con datos incorretos", async () => {
        try {
            const data = {
                "userId": 1,
                "title": "",
                "completed": "false"
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

    it("No debe modificar todo si user no existe", async () => {
        try {
            const data = {
                "userId": 1000,
                "title": "delectus aut autem",
                "completed": false
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

    it("Debe eliminar todo", async () => {
        try {
            const response = await apiClient
            .delete(`${apiClientBaseUrl}/1`)
            .expect(202);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsTodo);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe eliminar todo si no existe", async () => {
        try {
            const response = await apiClient
            .delete(`${apiClientBaseUrl}/1000000000`)
            .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe listar todos", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}`)
            .expect(200);

            const { body } = response;
            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsTodo);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe listar todos y sus users", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}?fields=user`)
            .expect(200);

            const { body } = response;
            assert.isArray(body);
            assert.isObject(body[0]);
            assert.hasAllKeys(body[0], propsTodoUser);
            assert.isObject(body[0].user);
            assert.hasAllKeys(body[0].user, propsUsers);
            assert.isObject(body[0].user.address);
            assert.hasAllKeys(body[0].user.address, propsAddress);
            assert.isObject(body[0].user.address.geo);
            assert.hasAllKeys(body[0].user.address.geo, propsGeo);
            assert.isObject(body[0].user.company);
            assert.hasAllKeys(body[0].user.company, propsCompany);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe obtener todo por ID", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1`)
            .expect(200);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsTodo);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe obtener todo por ID y su user", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/1?fields=user`)
            .expect(200);

            const { body } = response;
            assert.isObject(body);
            assert.hasAllKeys(body, propsTodoUser);
            assert.isObject(body.user);
            assert.hasAllKeys(body.user, propsUsers);
            assert.isObject(body.user.address);
            assert.hasAllKeys(body.user.address, propsAddress);
            assert.isObject(body.user.address.geo);
            assert.hasAllKeys(body.user.address.geo, propsGeo);
            assert.isObject(body.user.company);
            assert.hasAllKeys(body.user.company, propsCompany);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("No debe obtener todo por ID si no existe", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/100000000000`)
            .expect(404);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });
});