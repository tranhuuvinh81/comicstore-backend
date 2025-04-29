// const db = require("../config/db");

// class Order {
//   static async create(order) {
//     const [result] = await db.query(
//       "INSERT INTO orders (user_id, total_amount, order_date) VALUES (?, ?, ?)",
//       [order.user_id, order.total_amount, order.order_date]
//     );
//     return { id: result.insertId, ...order };
//   }

//   static async addItems(orderId, items) {
//     const values = items.map((item) => [orderId, item.book_id, item.quantity, item.price]);
//     console.log("Inserting order items:", values);
//     await db.query(
//       "INSERT INTO order_items (order_id, book_id, quantity, price) VALUES ?",
//       [values]
//     );
//   }

//   static async getByUserIdWithItems(userId) {
//     const [orders] = await db.query(
//       "SELECT o.id, o.user_id, o.total_amount, o.order_date FROM orders o WHERE o.user_id = ?",
//       [userId]
//     );
//     for (let order of orders) {
//       const [items] = await db.query(
//         `SELECT oi.id, oi.book_id, oi.quantity, oi.price, b.title, b.author
//          FROM order_items oi
//          JOIN books b ON oi.book_id = b.id
//          WHERE oi.order_id = ?`,
//         [order.id]
//       );
//       order.items = items || [];
//     }
//     return orders;
//   }

//   static async getAllWithItems() {
//     const [orders] = await db.query(
//       "SELECT o.id, o.user_id, o.total_amount, o.order_date FROM orders o"
//     );
//     if (!orders || orders.length === 0) {
//       return [];
//     }
//     for (let order of orders) {
//       const [items] = await db.query(
//         `SELECT oi.id, oi.book_id, oi.quantity, oi.price, b.title, b.author
//          FROM order_items oi
//          JOIN books b ON oi.book_id = b.id
//          WHERE oi.order_id = ?`,
//         [order.id]
//       );
//       order.items = items || [];
//     }
//     return orders;
//   }

//   static async delete(orderId) {
//     await db.query("DELETE FROM order_items WHERE order_id = ?", [orderId]);
//     await db.query("DELETE FROM orders WHERE id = ?", [orderId]);
//   }
// }

// module.exports = Order;

const db = require("../config/db");

class Order {
  static async create(order) {
    const [result] = await db.query(
      "INSERT INTO orders (user_id, total_amount, order_date, status) VALUES (?, ?, ?, ?)",
      [order.user_id, order.total_amount, order.order_date, order.status || "pending"]
    );
    return { id: result.insertId, ...order };
  }

  static async addItems(orderId, items) {
    const values = items.map((item) => [orderId, item.book_id, item.quantity, item.price]);
    console.log("Inserting order items:", values);
    await db.query(
      "INSERT INTO order_items (order_id, book_id, quantity, price) VALUES ?",
      [values]
    );
  }

  static async getByUserIdWithItems(userId) {
    const [orders] = await db.query(
      "SELECT o.id, o.user_id, o.total_amount, o.order_date, o.status FROM orders o WHERE o.user_id = ?",
      [userId]
    );
    for (let order of orders) {
      const [items] = await db.query(
        `SELECT oi.id, oi.book_id, oi.quantity, oi.price, b.title, b.author
         FROM order_items oi
         JOIN books b ON oi.book_id = b.id
         WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items || [];
    }
    return orders;
  }

  static async getAllWithItems() {
    const [orders] = await db.query(
      "SELECT o.id, o.user_id, o.total_amount, o.order_date, o.status FROM orders o"
    );
    if (!orders || orders.length === 0) {
      return [];
    }
    for (let order of orders) {
      const [items] = await db.query(
        `SELECT oi.id, oi.book_id, oi.quantity, oi.price, b.title, b.author
         FROM order_items oi
         JOIN books b ON oi.book_id = b.id
         WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items || [];
    }
    return orders;
  }

  static async updateStatus(orderId, status) {
    const validStatuses = ["pending", "shipping", "completed"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status");
    }
    await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId]);
  }

  static async delete(orderId) {
    await db.query("DELETE FROM order_items WHERE order_id = ?", [orderId]);
    await db.query("DELETE FROM orders WHERE id = ?", [orderId]);
  }
}

module.exports = Order;