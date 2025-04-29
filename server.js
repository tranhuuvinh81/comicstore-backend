// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const app = express();

// const authMiddleware = require("./middleware/authMiddleware");
// const adminMiddleware = require("./middleware/adminMiddleware");
// const authController = require("./controllers/authController");
// const comicController = require("./controllers/comicController");
// const orderController = require("./controllers/orderController");

// app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));
// app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "public/images")));

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/comics", require("./routes/comicRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));


// // Thêm API cho thông tin người dùng
// app.get("/api/users/me", authMiddleware, async (req, res) => {
//   const User = require("./models/user");
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({
//       full_name: user.full_name,
//       age: user.age,
//       email: user.email,
//       phone: user.phone,
//       address: user.address,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch user info", error: error.message });
//   }
// });

// app.put("/api/users/me", authMiddleware, async (req, res) => {
//   const User = require("./models/user");
//   const { full_name, age, email, phone, address } = req.body;
//   try {
//     await User.update(req.user.id, { full_name, age, email, phone, address });
//     res.json({ message: "User info updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update user info", error: error.message });
//   }
// });

// app.delete("/api/orders/:id", authMiddleware, adminMiddleware, orderController.deleteOrder);
// app.delete("/api/comics/:id", authMiddleware, adminMiddleware, comicController.deleteBook);

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the Comic Store API" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");
const authController = require("./controllers/authController");
const comicController = require("./controllers/comicController");
const orderController = require("./controllers/orderController");


app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"], credentials: true }));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/comics", require("./routes/comicRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/slides", require("./routes/slideRoutes")); // Thêm route mới


// Thêm API cho thông tin người dùng
app.get("/api/users/me", authMiddleware, async (req, res) => {
  const User = require("./models/user");
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      full_name: user.full_name,
      age: user.age,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user info", error: error.message });
  }
});

app.put("/api/users/me", authMiddleware, async (req, res) => {
  const User = require("./models/user");
  const { full_name, age, email, phone, address } = req.body;
  try {
    await User.update(req.user.id, { full_name, age, email, phone, address });
    res.json({ message: "User info updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user info", error: error.message });
  }
});

app.delete("/api/comics/:id", authMiddleware, adminMiddleware, comicController.deleteBook);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Comic Store API" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Xử lý lỗi 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});