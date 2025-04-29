const db = require("../config/db");

const User = {
  findByUsername: async (username) =>
    (await db.query("SELECT * FROM users WHERE username = ?", [username]))[0][0],
  findById: async (id) =>
    (await db.query("SELECT * FROM users WHERE id = ?", [id]))[0][0], // Thêm hàm tìm theo ID
  create: async (data) =>
    (await db.query("INSERT INTO users SET ?", data))[0],
  getAll: async () =>
    (await db.query("SELECT id, username, full_name, created_at FROM users"))[0],
  update: async (id, data) =>
    (await db.query("UPDATE users SET ? WHERE id = ?", [data, id]))[0],
  delete: async (id) =>
    (await db.query("DELETE FROM users WHERE id = ?", [id]))[0],
};

module.exports = User;