const User = require("../models/user");
const db = require("../config/db"); // Thêm để truy vấn trực tiếp

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error.message, error.stack);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.updateUser = async (req, res) => {
  const { full_name } = req.body;
  try {
    await User.update(req.params.id, { full_name });
    res.json({ message: "User updated" });
  } catch (error) {
    console.error("Error in updateUser:", error.message, error.stack);
    res.status(500).json({ message: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Xóa các đơn hàng liên quan trước
    await db.query("DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id = ?)", [userId]);
    await db.query("DELETE FROM orders WHERE user_id = ?", [userId]);
    
    // Sau đó xóa user
    await User.delete(userId);
    res.json({ message: "User and related orders deleted" });
  } catch (error) {
    console.error("Error in deleteUser:", error.message, error.stack);
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};