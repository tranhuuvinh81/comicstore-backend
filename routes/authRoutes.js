const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


router.get("/users/me", authMiddleware, authController.getUserInfo);
router.put("/users/me", authMiddleware, authController.updateUserInfo); // Thêm route PUT

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;