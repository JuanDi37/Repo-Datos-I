const { Pool } = require('pg');

const pool = new Pool({
  user: 'miprestamo_user',
  host: 'localhost',
  database: 'miprestamo_db',
  password: 'miprestamo_password',
  port: 5432,
});

module.exports = pool;
