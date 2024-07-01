const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Danil506',
    database: 'restaurant'
});

module.exports = pool;