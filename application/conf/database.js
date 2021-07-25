const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "photoapp",
    password: "teRm!317",
    database: "csc317db",
    connectionLimit: 50,
    debug: false,
});

module.exports = pool;