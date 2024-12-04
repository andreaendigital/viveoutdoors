//configura y exporta un pool de conexiones a una base de datos PostgreSQL,
//utilizando variables de entorno para la configuración y biblioteca pg

const { Pool } = require("pg"); //importa la clase Pool de la biblioteca pg

const { Hostname, Database, Username, Password, PORT } = process.env; //extrae las variables de entorno necesarias para la conexión a la base de datos del archivo .env

const pool = new Pool({
  //configuración de la conexión, se crea una instancia de Pool con la configuración necesaria para conectarse a la base de datos PostgreSQL.
  host: Hostname,
  database: Database,
  user: Username,
  password: Password,
  port: PORT,
  allowExitOnIdle: true, // permite que la aplicación se cierre incluso si hay conexiones inactivas en el pool.
});

module.exports = { pool };
