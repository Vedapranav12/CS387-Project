const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "divijaved2002",
  host: "localhost",
  port: 5432,
  database: "project"
});

module.exports = pool;