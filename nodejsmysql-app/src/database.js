const mysql = require('mysql2')
const { database } = require('./keys')
const { promisify } = require('util')
const pool = mysql.createPool(database)

// dejo conectado el pool entonces desde el codigo simplemente lo invoco: puedo obtener un callback con un error o conexion

pool.getConnection((err, connection) => {
    
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused');
        }
      }

    if (connection) connection.release();

    console.log('DB is Connected');

    return;
})

pool.query = promisify(pool.query)

module.exports = pool