const { Pool } = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'groceries_db',
    password: 'dbpassword',
    port: 5432,
});

module.exports = pool;