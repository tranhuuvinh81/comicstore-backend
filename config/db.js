const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root", // Thay bằng username MySQL của bạn
  password: "", // Thay bằng password MySQL của bạn
  database: "tt",
});

module.exports = db;

// const mysql = require('mysql2/promise');

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL');
// });

// module.exports = connection;




