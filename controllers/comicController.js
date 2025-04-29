// const Book = require("../models/book");
// const db = require("../config/db"); // Thêm để truy vấn trực tiếp

// // exports.getAllBooks = async (req, res) => {
// //   try {
// //     const books = await Book.getAll();
// //     res.json(books);
// //   } catch (error) {
// //     console.error("Error in getAllBooks:", error);
// //     res.status(500).json({ message: "Failed to fetch books" });
// //   }
// // };

// // exports.getBookById = async (req, res) => {
// //   try {
// //     const book = await Book.getById(req.params.id);
// //     if (!book) return res.status(404).json({ message: "Book not found" });
// //     res.json(book);
// //   } catch (error) {
// //     console.error("Error in getBookById:", error);
// //     res.status(500).json({ message: "Failed to fetch book" });
// //   }
// // };
// exports.getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.getAll();
//     res.json(books);
//   } catch (error) {
//     console.error("Error in getAllBooks:", error);
//     res.status(500).json({ message: "Failed to fetch books" });
//   }
// };

// exports.getBookById = async (req, res) => {
//   try {
//     const book = await Book.getById(req.params.id);
//     if (!book) return res.status(404).json({ message: "Book not found" });
//     res.json(book);
//   } catch (error) {
//     console.error("Error in getBookById:", error);
//     res.status(500).json({ message: "Failed to fetch book" });
//   }
// };

// exports.createBook = async (req, res) => {
//   const { title, author, price, description, stock } = req.body;
//   const book = { title, author, price, description, stock, created_at: new Date() };
//   try {
//     await Book.create(book);
//     res.status(201).json({ message: "Book created" });
//   } catch (error) {
//     console.error("Error in createBook:", error);
//     res.status(500).json({ message: "Failed to create book" });
//   }
// };

// exports.updateBook = async (req, res) => {
//   const { title, author, price, description, stock } = req.body;
//   try {
//     const book = await Book.getById(req.params.id);
//     if (!book) return res.status(404).json({ message: "Book not found" });

//     const updatedBook = {
//       title: title || book.title,
//       author: author || book.author,
//       price: price !== undefined ? price : book.price, // Đảm bảo price được cập nhật
//       description: description || book.description,
//       stock: stock !== undefined ? stock : book.stock, // Thêm stock, giữ giá trị cũ nếu không gửi
//     };

//     await Book.update(req.params.id, updatedBook);
//     res.json({ message: "Book updated" });
//   } catch (error) {
//     console.error("Error in updateBook:", error.message, error.stack);
//     res.status(500).json({ message: "Failed to update book", error: error.message });
//   }
// };

// exports.deleteBook = async (req, res) => {
//   const bookId = req.params.id;
//   try {
//     const book = await Book.getById(bookId);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     // Xóa các bản ghi trong order_items liên quan đến sách
//     await db.query("DELETE FROM order_items WHERE book_id = ?", [bookId]);
//     await Book.delete(bookId);
//     res.json({ message: "Book deleted" });
//   } catch (error) {
//     console.error("Error in deleteBook:", error.message, error.stack);
//     res.status(500).json({ message: "Failed to delete book", error: error.message });
//   }
// };

// exports.searchBooks = async (req, res) => {
//   const { q } = req.query;
//   try {
//     const books = await Book.search(q);
//     res.json(books);
//   } catch (error) {
//     console.error("Error in searchBooks:", error);
//     res.status(500).json({ message: "Failed to search books" });
//   }
// };
const Book = require("../models/book");
const db = require("../config/db"); // Đảm bảo import db nếu dùng trực tiếp

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();
    res.json(books);
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.getById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    console.error("Error in getBookById:", error);
    res.status(500).json({ message: "Failed to fetch book" });
  }
};

exports.createBook = async (req, res) => {
  const { title, author, price, description, stock } = req.body; // Thêm stock
  const book = { title, author, price, description, stock, created_at: new Date() }; // Thêm stock vào object
  try {
    await Book.create(book);
    res.status(201).json({ message: "Book created" });
  } catch (error) {
    console.error("Error in createBook:", error);
    res.status(500).json({ message: "Failed to create book" });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, price, description, stock } = req.body; // Thêm stock
  try {
    const book = await Book.getById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const updatedBook = {
      title: title || book.title,
      author: author || book.author,
      price: price !== undefined ? price : book.price,
      description: description || book.description,
      stock: stock !== undefined ? stock : book.stock, // Thêm stock, giữ giá trị cũ nếu không gửi
    };

    await Book.update(req.params.id, updatedBook);
    res.json({ message: "Book updated" });
  } catch (error) {
    console.error("Error in updateBook:", error.message, error.stack);
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.getById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Xóa các bản ghi trong order_items liên quan đến sách
    await db.query("DELETE FROM order_items WHERE book_id = ?", [bookId]);
    await Book.delete(bookId);
    res.json({ message: "Book deleted" });
  } catch (error) {
    console.error("Error in deleteBook:", error.message, error.stack);
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  try {
    const books = await Book.search(q);
    res.json(books);
  } catch (error) {
    console.error("Error in searchBooks:", error);
    res.status(500).json({ message: "Failed to search books" });
  }
};