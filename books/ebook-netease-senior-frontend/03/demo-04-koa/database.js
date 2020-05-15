const mysql = require('mysql');
const co = require('co-mysql');
const config = require('../config');
const { host, user, password, database } = config;

let db = mysql.createPool({
  host,
  user,
  password,
  database,
});

const conn = co(db);

module.exports = conn;