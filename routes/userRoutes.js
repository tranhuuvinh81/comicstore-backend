const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.put("/:id", authMiddleware, adminMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;