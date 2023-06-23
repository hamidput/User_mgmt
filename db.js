const { Pool } = require('pg');

const pool = new Pool({
  user: 'harshit',
  host: 'localhost',
  database: 'user',
  password: 'user@123',
  port:5432,
});

module.exports = pool;
