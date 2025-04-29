// const mysql = require("mysql2/promise");

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root", // Thay bằng username MySQL của bạn
//   password: "", // Thay bằng password MySQL của bạn
//   database: "tt",
// });

// module.exports = db;

const mysql = require("mysql2/promise");
require("dotenv").config(); // Đảm bảo load biến môi trường từ .env

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tt",
});

module.exports = db;
