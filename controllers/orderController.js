// const Order = require("../models/order");
// const User = require("../models/user");
// const Book = require("../models/book");

// exports.createOrder = async (req, res) => {
//   const { items, address } = req.body;
//   const userId = req.user.id;
//   try {
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       throw new Error("No items provided in the order");
//     }
//     if (!address) {
//       throw new Error("Address is required");
//     }

//     // Kiểm tra tồn kho
//     for (const item of items) {
//       const stock = await Book.getStockById(item.book_id);
//       if (stock < item.quantity) {
//         throw new Error(`Sách ID ${item.book_id} chỉ còn ${stock} cuốn, không đủ để đặt ${item.quantity} cuốn`);
//       }
//     }

//     // Tính tổng tiền
//     const total_amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     // Tạo đơn hàng
//     const order = await Order.create({ user_id: userId, total_amount, order_date: new Date() });
//     await Order.addItems(order.id, items);

//     // Cập nhật tồn kho
//     for (const item of items) {
//       await Book.updateStock(item.book_id, item.quantity);
//     }

//     // Cập nhật địa chỉ người dùng
//     await User.update(userId, { address });

//     res.status(201).json({ message: "Order created", orderId: order.id });
//   } catch (error) {
//     console.error("Error in createOrder:", error.message, error.stack);
//     res.status(500).json({ message: "Failed to create order", error: error.message });
//   }
// };

// exports.getOrderHistory = async (req, res) => {
//   const userId = req.user.id;
//   const isAdmin = req.user.isAdmin;
//   try {
//     let orders;
//     if (isAdmin) {
//       orders = await Order.getAllWithItems();
//     } else {
//       orders = await Order.getByUserIdWithItems(userId);
//     }
//     res.json(orders);
//   } catch (error) {
//     console.error("Error in getOrderHistory:", error.message, error.stack);
//     res.status(500).json({ message: "Failed to fetch order history" });
//   }
// };

// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.getAllWithItems();
//     return res.json(orders);
//   } catch (error) {
//     console.error("Error in getAllOrders:", error);
//     return res.status(500).json({ message: "Failed to fetch all orders" });
//   }
// };

// exports.deleteOrder = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Order.delete(id);
//     res.json({ message: "Order deleted successfully" });
//   } catch (error) {
//     console.error("Error in deleteOrder:", error.message, error.stack);
//     res.status(500).json({ message: "Failed to delete order", error: error.message });
//   }
// };

const Order = require("../models/order");
const User = require("../models/user");
const Book = require("../models/book");

exports.createOrder = async (req, res) => {
  const { items, address } = req.body;
  const userId = req.user.id;
  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("No items provided in the order");
    }
    if (!address) {
      throw new Error("Address is required");
    }

    for (const item of items) {
      const stock = await Book.getStockById(item.book_id);
      if (stock < item.quantity) {
        throw new Error(`Sách ID ${item.book_id} chỉ còn ${stock} cuốn, không đủ để đặt ${item.quantity} cuốn`);
      }
    }

    const total_amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      user_id: userId,
      total_amount,
      order_date: new Date(),
      status: "pending", // Đặt trạng thái mặc định
    });
    await Order.addItems(order.id, items);

    for (const item of items) {
      await Book.updateStock(item.book_id, item.quantity);
    }

    await User.update(userId, { address });

    res.status(201).json({ message: "Order created", orderId: order.id });
  } catch (error) {
    console.error("Error in createOrder:", error.message, error.stack);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;
  try {
    let orders;
    if (isAdmin) {
      orders = await Order.getAllWithItems();
    } else {
      orders = await Order.getByUserIdWithItems(userId);
    }
    res.json(orders);
  } catch (error) {
    console.error("Error in getOrderHistory:", error.message, error.stack);
    res.status(500).json({ message: "Failed to fetch order history" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllWithItems();
    return res.json(orders);
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    return res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.delete(id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error in deleteOrder:", error.message, error.stack);
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await Order.updateStatus(id, status);
    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error.message, error.stack);
    res.status(400).json({ message: "Failed to update order status", error: error.message });
  }
};