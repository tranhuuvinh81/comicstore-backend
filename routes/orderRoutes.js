// const express = require("express");
// const router = express.Router();
// const orderController = require("../controllers/orderController");
// const authMiddleware = require("../middleware/authMiddleware");
// const adminMiddleware = require("../middleware/adminMiddleware");

// router.post("/", authMiddleware, orderController.createOrder);
// router.get("/history", authMiddleware, orderController.getOrderHistory);
// router.get("/", authMiddleware, adminMiddleware, orderController.getAllOrders);

// module.exports = router;

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, orderController.createOrder);
router.get("/history", authMiddleware, orderController.getOrderHistory);
router.get("/", authMiddleware, adminMiddleware, orderController.getAllOrders);
router.delete("/:id", authMiddleware, adminMiddleware, orderController.deleteOrder);
router.put("/:id/status", authMiddleware, adminMiddleware, orderController.updateOrderStatus);

module.exports = router;