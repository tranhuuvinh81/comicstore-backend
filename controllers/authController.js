const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const { use } = require("bcrypt/promises");

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findByUsername(username);
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Vui lòng điền thông tin!" });
//   }
//   const token = jwt.sign(
//     { id: user.id, username: user.username, isAdmin: user.isAdmin || false, fullName: user.full_name },
//     process.env.JWT_SECRET || "secret",
//     { expiresIn: "1h" }
//   );
//   res.json({ token });
// };
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Tài khoản không tồn tại" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Mật khẩu không đúng" });
      }
      const token = jwt.sign(
        { id: user.id, username: user.username, isAdmin: user.isAdmin || false, fullName: user.full_name },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );
      res.json({
        token,
        full_name: user.full_name || "",
        age: user.age || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    } catch (error) {
      console.error("Error in login:", error.message, error.stack);
      res.status(500).json({ message: "Lỗi server khi đăng nhập" });
    }
  };

exports.register = async (req, res) => {
  const { username, password, full_name } = req.body;
  try {
    // Kiểm tra username đã tồn tại chưa
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      password: hashedPassword,
      full_name,
      created_at: new Date(),
      isAdmin: 0, // Mặc định không phải admin
    };
    await User.create(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register:", error.message, error.stack);
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không có token, vui lòng đăng nhập" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const user = await User.findByUsername(decoded.username);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.json({
      username: user.username,
      full_name: user.full_name,
      isAdmin: user.isAdmin || false,
      age: user.age || "", // Thêm nếu có trong model
      email: user.email || "", // Thêm nếu có trong model
      phone: user.phone || "", // Thêm nếu có trong model
      address: user.address || "", // Thêm nếu có trong model
    });
  } catch (error) {
    console.error("Error in getUserInfo:", error.message);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Thêm hàm updateUserInfo
exports.updateUserInfo = async (req, res) => {
  try {
    const { full_name, age, email, phone, address } = req.body;
    const user = await User.findByUsername(req.user.username); // Dùng req.user từ authMiddleware

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Cập nhật thông tin
    await User.update(user.id, { full_name, age, email, phone, address });
    res.json({ message: "Cập nhật thông tin thành công" });
  } catch (error) {
    console.error("Error in updateUserInfo:", error.message);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findByUsername(username);
//     if (!user) {
//       return res.status(401).json({ message: "Tài khoản không tồn tại" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Mật khẩu không đúng" });
//     }
//     const token = jwt.sign(
//       { id: user.id, username: user.username, isAdmin: user.isAdmin || false, fullName: user.full_name },
//       process.env.JWT_SECRET || "secret",
//       { expiresIn: "1h" }
//     );
//     res.json({
//       token,
//       full_name: user.full_name || "",
//       age: user.age || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       address: user.address || "",
//     });
//   } catch (error) {
//     console.error("Error in login:", error.message, error.stack);
//     res.status(500).json({ message: "Lỗi server khi đăng nhập" });
//   }
// };

// exports.register = async (req, res) => {
//   const { username, password, full_name } = req.body;
//   try {
//     const existingUser = await User.findByUsername(username);
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = {
//       username,
//       password: hashedPassword,
//       full_name,
//       created_at: new Date(),
//       isAdmin: 0,
//     };
//     await User.create(user);
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error in register:", error.message, error.stack);
//     res.status(500).json({ message: "Failed to register user", error: error.message });
//   }
// };