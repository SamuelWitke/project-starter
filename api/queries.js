const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ctp_user',
  host: 'localhost',
  database: 'app2019_development',
  password: 'password',
  port: 5432,
})