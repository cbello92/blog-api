const fs = require('fs');
const { conectar } = require('./conexion');

const getJSON = () => {
    return JSON.parse(fs.readFileSync('./repositorio/resources/users.json'));
}

const save = async (user) => {
    const conexion = await conectar();
    const { address, company } = user;
    try {
        await conexion.query("BEGIN");

        const query = `INSERT INTO users (name, username, email, phone, website)
                        VALUES ($1, $2, $3, $4, $5) RETURNING *`;

        const { rows: userAdd } = await conexion.query(query, [user.name, user.username, user.email, user.phone, user.website]);

        const queryAddress = `INSERT INTO addresses (userid, street, suite, city, zipcode, lat, lng)
                            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        let { rows: addressSaved } = await conexion.query(queryAddress, [userAdd[0].id, address.street, address.suite, address.city, address.zipcode, address.geo.lat, address.geo.lng]);

        const queryCompany = `INSERT INTO companies (userid, name, bs, catchphrase)
                            VALUES ($1, $2, $3, $4) RETURNING "name", "bs", catchphrase as "catchPhrase"`;

        let { rows: companySaved } = await conexion.query(queryCompany, [userAdd[0].id, company.name, company.bs, company.catchPhrase]);

        await conexion.query("COMMIT");

        userAdd[0]["address"] = {
            "street": addressSaved[0].street,
            "suite": addressSaved[0].suite,
            "city": addressSaved[0].city,
            "zipcode": addressSaved[0].zipcode,
            "geo": {
                "lat": addressSaved[0].lat,
                "lng": addressSaved[0].lng
            }
        };

        userAdd[0]["company"] = companySaved[0];

        return userAdd.length > 0 ? userAdd[0] : undefined;

    } catch (error) {
        await conexion.query("ROLLBACK");
        throw error;
    } finally {
        conexion.release();
    }
    
}

const updateById = (userid, user) => {

    // const conexion = await conectar();
    // const query = `UPDATE users SET `;

    let data = getJSON();
    let usuario = data.find(x => x.id === userid);
    let id = usuario.id;

    return { id, ...user };

}

const deleteById = (userid) => {
    let data = getJSON();
    return data.find(x => x.id === userid) || undefined;
}

const getAll = async () => {

    const conexion = await conectar();
    const query = `SELECT * FROM users`;
    const { rows: users } = await conexion.query(query);

    for(let i = 0; i < users.length; i++) {
        let query = `SELECT street, suite, city, zipcode, lat, lng FROM addresses WHERE id = $1`;
        let { rows: addresses } = await conexion.query(query, [users[i].id]);

        let queryCompany = `SELECT name, bs, catchphrase "catchPhrase" FROM companies WHERE id = $1`;
        let { rows: company } = await conexion.query(queryCompany, [users[i].id]);

        for (let j = 0; j < addresses.length; j++) {
            addresses[j] = {
                "street": addresses[j].street,
                "suite": addresses[j].suite,
                "city": addresses[j].city,
                "zipcode": addresses[j].zipcode,
                "geo": {
                    "lat": addresses[j].lat,
                    "lng": addresses[j].lng
                }
            }
        }

        for (let k = 0; k < company.length; k++) {
            company[k] = {
                "name": company[k].name,
                "catchPhrase": company[k].catchPhrase,
                "bs": company[k].bs
            }
        }

        users[i]["address"] = addresses;
        users[i]["company"] = company;
    }

    conexion.release();
    return users;
}

const getById = (userid) => {
    let data = getJSON();
    return data.find(x => x.id === userid) || undefined;
}

module.exports = {
    getAll,
    getById,
    save,
    updateById,
    deleteById
}