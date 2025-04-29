// const mysql = require("mysql2/promise");

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root", // Thay bằng username MySQL của bạn
//   password: "", // Thay bằng password MySQL của bạn
//   database: "tt",
// });

// module.exports = db;

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "hopper.proxy.rlwy.net", // host từ Railway
  user: "root",                  // user từ Railway
  password: "yuBOgMLnnNAIEfFZlCToTGnmjCg0tHlZ", // mật khẩu từ Railway
  database: "railway",           // tên DB từ Railway
  port: 28561                    // cổng từ Railway
});

module.exports = db;

