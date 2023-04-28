const { Pool } = require('pg');

// Database configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};

// Create a new pool instance
const pool = new Pool(config);

// Export a function that returns a Promise to acquire a client from the pool
module.exports = async () => {
  const client = await pool.connect();
  return client;
};
