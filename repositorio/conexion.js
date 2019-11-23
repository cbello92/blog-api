const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "123456789"
});

const conectar = async () => {
    const client = await pool.connect();
    return client;
}

exports.conectar = conectar;