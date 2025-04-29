// const bcrypt = require('bcrypt');

// const plainPassword = '123456789';
// bcrypt.hash(plainPassword, 10, (err, hash) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(hash);
//     // Sử dụng hash này để update bảng users
//   }
// });

const bcrypt = require("bcrypt");
bcrypt.hash("123456", 10).then(console.log);

$2b$10$5S0uHs32z3j9tqX57e/c3ehXXa152jj8EQ4KbPUQz.k5YgDfMU2NW