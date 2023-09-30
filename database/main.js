const { Pool } = require("pg");

const connectionString = process.env.db_host;

const client = new Pool({ connectionString });

module.exports = client;
