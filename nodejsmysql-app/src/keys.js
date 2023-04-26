

module.exports = {
  database: {
    host: "localhost",
    user: "root",
    password: "nico1993",
    database: "db_links",
  },
  database2: {
    user: 'Crrconsultas',
    password: 'Resistencia34',
    database: 'BaseResistencia',
    server: "192.168.1.4",
    port: 1433,
    pool: {
      max: 100,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  },
};