// const db = require("../config/db");

// const Book = {
//   getAll: async () => (await db.query("SELECT * FROM books"))[0],
//   getById: async (id) =>
//     (await db.query("SELECT * FROM books WHERE id = ?", [id]))[0][0],
//   create: async (data) => (await db.query("INSERT INTO books SET ?", data))[0],
//   update: async (id, data) =>
//     (await db.query("UPDATE books SET ? WHERE id = ?", [data, id]))[0],
//   delete: async (id) =>
//     (await db.query("DELETE FROM books WHERE id = ?", [id]))[0],
//   search: async (keyword) =>
//     (await db.query(
//       "SELECT * FROM books WHERE title LIKE ? OR author LIKE ?",
//       [`%${keyword}%`, `%${keyword}%`]
//     ))[0],
//   getStockById: async (id) =>
//     (await db.query("SELECT stock FROM books WHERE id = ?", [id]))[0][0]?.stock || 0,
//   updateStock: async (id, quantity) =>
//     (await db.query("UPDATE books SET stock = stock - ? WHERE id = ? AND stock >= ?", [quantity, id, quantity]))[0],
// };

// module.exports = Book;
const db = require("../config/db");

const Book = {
  getAll: async () => (await db.query("SELECT * FROM books"))[0],
  getById: async (id) =>
    (await db.query("SELECT * FROM books WHERE id = ?", [id]))[0][0],
  create: async (data) => {
    console.log("Creating book with data:", data); // Debug dữ liệu gửi lên
    const result = await db.query("INSERT INTO books SET ?", data);
    console.log("Create result:", result[0]); // Debug kết quả
    return result[0];
  },
  update: async (id, data) => {
    console.log("Updating book ID", id, "with data:", data); // Debug dữ liệu gửi lên
    const result = await db.query("UPDATE books SET ? WHERE id = ?", [data, id]);
    console.log("Update result:", result[0]); // Debug kết quả
    return result[0];
  },
  delete: async (id) =>
    (await db.query("DELETE FROM books WHERE id = ?", [id]))[0],
  search: async (keyword) =>
    (await db.query(
      "SELECT * FROM books WHERE title LIKE ? OR author LIKE ?",
      [`%${keyword}%`, `%${keyword}%`]
    ))[0],
  getStockById: async (id) =>
    (await db.query("SELECT stock FROM books WHERE id = ?", [id]))[0][0]?.stock || 0,
  updateStock: async (id, quantity) => {
    const result = await db.query(
      "UPDATE books SET stock = stock - ? WHERE id = ? AND stock >= ?",
      [quantity, id, quantity]
    );
    console.log(`Update stock for book ${id}:`, result[0]);
    if (result[0].affectedRows === 0) {
      throw new Error(`Không thể cập nhật tồn kho cho sách ID ${id}. Tồn kho không đủ hoặc không tồn tại.`);
    }
    return result[0];
  },
};

module.exports = Book;