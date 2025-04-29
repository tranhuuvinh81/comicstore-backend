const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root", // Thay bằng username MySQL của bạn
  password: "", // Thay bằng password MySQL của bạn
  database: "tt",
});

module.exports = db;