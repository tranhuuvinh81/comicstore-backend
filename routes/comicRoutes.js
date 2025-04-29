const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comicController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", comicController.getAllBooks);
router.get("/search", comicController.searchBooks);
router.get("/:id", comicController.getBookById);
router.post("/", authMiddleware, adminMiddleware, comicController.createBook);
router.put("/:id", authMiddleware, adminMiddleware, comicController.updateBook);
router.delete("/:id", authMiddleware, adminMiddleware, comicController.deleteBook);

module.exports = router;