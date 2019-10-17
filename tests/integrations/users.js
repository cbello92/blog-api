const { apiClient } = require('./config');
const { assert } = require('chai');
const apiClientBaseUrl = "/v1/users";

describe("USERS - API", () => {
    const propsUser = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'];
    const propsUserFields = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company', 'posts', 'albums', 'todos'];
    const propsAddress = ['street', 'suite', 'city', 'zipcode', 'geo'];
    const propsGeo = ['lat', 'lng'];
    const propsCompany = ['name', 'catchPhrase', 'bs'];
    
    it("Debe guardar un user", async () => {
        try {
            const data = {
                "name": "Leanne Graham",
                "username": "Bret.username",
                "email": "Sincere@april.com",
                "address": {
                  "street": "Kulas Light",
                  "suite": "Departamento 556",
                  "city": "Gwenborough",
                  "zipcode": "92998-3874",
                  "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                  }
                },
                "phone": "1-770-736-8031-56442",
                "website": "hildegard.org",
                "company": {
                  "name": "Romaguera-Crona",
                  "catchPhrase": "Multi-layered client-server neural-net",
                  "bs": "harness real-time e-markets"
                }
              };

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(201);

            const { body } = response;

            assert.isObject(body, 'No es objeto');
            assert.hasAllKeys(body, propsUser);
            assert.isObject(body.address, 'No es objeto');
            assert.hasAllKeys(body.address, propsAddress);
            assert.isObject(body.address.geo, 'No es objeto');
            assert.hasAllKeys(body.address.geo, propsGeo);
            assert.isObject(body.company, 'No es objeto');
            assert.hasAllKeys(body.company, propsCompany);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe guardar user", async () => {
        try {
            const data = {
                "name": "Leanne Graham",
                "username": "Bret.username",
                "email": "Sincere@april.com",
                "address": {
                  "street": "Kulas Light",
                  "suite": "Departamento 556",
                  "city": "Gwenborough",
                  "zipcode": "92998-3874",
                  "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                  }
                },
                "phone": "1-770-736-8031-56442 xxx",
                "company": {
                  "name": "Romaguera-Crona",
                  "catchPhrase": "Multi-layered client-server neural-net",
                  "bs": "harness real-time e-markets"
                }
              };

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(data)
                .expect(400);
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("Debe modificar user", async () => {
        try {
            const data = {
                "name": "Leanne Graham",
                "username": "Bret.username",
                "email": "Sincere@april.com",
                "address": {
                  "street": "Kulas Light",
                  "suite": "Departamento 556",
                  "city": "Gwenborough",
                  "zipcode": "92998-3874",
                  "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                  }
                },
                "phone": "1-770-736-8031-56442",
                "website": "hildegard.org",
                "company": {
                  "name": "Romaguera-Crona",
                  "catchPhrase": "Multi-layered client-server neural-net",
                  "bs": "harness real-time e-markets"
                }
              };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/1`)
                .send(data)
                .expect(200);

            const { body } = response;

            assert.isObject(body, 'No es objeto');
            assert.hasAllKeys(body, propsUser);
            assert.isObject(body.address, 'No es objeto');
            assert.hasAllKeys(body.address, propsAddress);
            assert.isObject(body.address.geo, 'No es objeto');
            assert.hasAllKeys(body.address.geo, propsGeo);
            assert.isObject(body.company, 'No es objeto');
            assert.hasAllKeys(body.company, propsCompany);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe modificar si user no existe", async () => {
        try {
            const data = {
                "name": "Leanne Graham",
                "username": "Bret.username",
                "email": "Sincere@april.com",
                "address": {
                  "street": "Kulas Light",
                  "suite": "Departamento 556",
                  "city": "Gwenborough",
                  "zipcode": "92998-3874",
                  "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                  }
                },
                "phone": "1-770-736-8031-56442",
                "website": "hildegard.org",
                "company": {
                  "name": "Romaguera-Crona",
                  "catchPhrase": "Multi-layered client-server neural-net",
                  "bs": "harness real-time e-markets"
                }
              };

            const response = await apiClient
                .put(`${apiClientBaseUrl}/10000`)
                .send(data)
                .expect(404);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("No debe modificar user con datos incorrectos", async () => {
        try {
            const data = {
                "name": "Leanne Graham",
                "username": "Bret.username",
                "email": "Sincere@april.com",
                "address": {
                  "street": "Kulas Light",
                  "suite": "Departamento 556",
                  "city": "Gwenborough",
                  "zipcode": "92998-3874",
                  "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                  }
                },
                "phone": "1-770-736-8031-56442zxx",
                "company": {
                  "name": "Romaguera-Crona",
                  "catchPhrase": "Multi-layered client-server neural-net",
                  "bs": "harness real-time e-markets"
                }
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

    it("Debe eliminar user", async () => {
        try {
            const response = await apiClient
                .delete(`${apiClientBaseUrl}/1`)
                .expect(202);

            const { body } = response;

            assert.isObject(body, 'No es objeto');
            assert.hasAllKeys(body, propsUser);
            assert.isObject(body.address, 'No es objeto');
            assert.hasAllKeys(body.address, propsAddress);
            assert.isObject(body.address.geo, 'No es objeto');
            assert.hasAllKeys(body.address.geo, propsGeo);
            assert.isObject(body.company, 'No es objeto');
            assert.hasAllKeys(body.company, propsCompany);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("Debe listar users", async () => {
        try {
            const response = await apiClient
            .get(apiClientBaseUrl)
            .expect(200);

            const { body } = response;
            assert.isArray(body);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("Debe listar users y campos (posts, albums, todos => opcionales)", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}?fields=posts,albums,todos`)
            .expect(200);

            const { body } = response;
            assert.isArray(body);
            assert.isArray(body[0].posts);
            assert.isArray(body[0].albums);
            assert.isArray(body[0].todos);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });


    it("Debe obtener un user", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/2`)
            .expect(200);

            const { body } = response;

            assert.isObject(body, 'No es objeto');
            assert.hasAllKeys(body, propsUser);
            assert.isObject(body.address, 'No es objeto');
            assert.hasAllKeys(body.address, propsAddress);
            assert.isObject(body.address.geo, 'No es objeto');
            assert.hasAllKeys(body.address.geo, propsGeo);
            assert.isObject(body.company, 'No es objeto');
            assert.hasAllKeys(body.company, propsCompany);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("Debe obtener un user y campos (posts, albums, todos => opcionales)", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/2?fields=posts,albums,todos`)
            .expect(200);

            const { body } = response;

            assert.isObject(body, 'No es objeto');
            assert.hasAllKeys(body, propsUserFields);
            assert.isObject(body.address, 'No es objeto');
            assert.hasAllKeys(body.address, propsAddress);
            assert.isObject(body.address.geo, 'No es objeto');
            assert.hasAllKeys(body.address.geo, propsGeo);
            assert.isObject(body.company, 'No es objeto');
            assert.hasAllKeys(body.company, propsCompany);
            assert.isArray(body.posts);
            assert.isArray(body.albums);
            assert.isArray(body.todos);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });

    it("No debe obtener un user", async () => {
        try {
            const response = await apiClient
            .get(`${apiClientBaseUrl}/2000`)
            .expect(404);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    });
});