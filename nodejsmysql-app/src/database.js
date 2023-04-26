const mysql = require('mysql2')
const { database, database2 } = require('./keys')
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


/* PARA SQL SERVER */

const sql = require('mssql')
const sqlConfig = database2

const pool2 = new sql.ConnectionPool(database2)
pool2.connect()
  .then(console.log('POOL SQL SERVER CONECTADA'))
  .catch(function (err) {
    console.error("ERROR AL CREAR POOL SQL SERVER", err);
  });

module.exports = {pool, pool2}

/* SIN POOLING */

/* const conectar = async () => {
 try {
  // make sure that any items are correctly URL encoded in the connection string
  await sql.connect(sqlConfig)
  //const result = await sql.query`select * from facOrdenes fo where nOrden = '530300'`
  //console.dir(result)

  console.log('DB sqlserver esta conectada')
 } catch (err) {
  // ... error checks
  console.log('Error en la conexion a la BD')
  console.log(err)
  console.log(database2)
 }
}

conectar() */

