const { Pool } = require("pg");

const connectionString = process.env.connectionString;

const client = new
    // Client({
    //     port: process.env.db_port,
    //     host: process.env.db_host,
    //     user: process.env.db_user,
    //     database: process.env.db_name,
    //     password: process.env.db_password,
    // });

    Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

module.exports = client;