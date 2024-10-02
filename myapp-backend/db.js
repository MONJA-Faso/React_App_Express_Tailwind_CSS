// const mysql = require("mysql");

// const db = mysql.createPool({
//     connectionLimit: 10,
//     host: "127.0.0.1", // Utilisez l'adresse IP au lieu du socket
//     user: "root",
//     password: "",
//     database: "nodeexpressDB"
// });

  
// // Ping database to check for common exception errors.
// db.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('Database connection was closed.');
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('Database has too many connections.');
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Database connection was refused.');
//         }
//     }
   
//     if (connection) connection.release();
   
//     return;
// });
  
// module.exports = db;



const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Ping database to check for common exception errors.
db.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();

    return;
});

module.exports = db;
