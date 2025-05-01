// const mysql = require("mysql2/promise");

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root", // Thay bằng username MySQL của bạn
//   password: "", // Thay bằng password MySQL của bạn
//   database: "tt",
// });

// module.exports = db;

const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

module.exports = db;




