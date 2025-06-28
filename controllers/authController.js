const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModal");

const signup = async (req, res) => {
  const { fullName, email, phone, address, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, email, phone, address, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, 'my-secret', { expiresIn: "1d" });

    res.json({
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

const updateProfile = async (req, res) => {
  const { fullName, email, phone, address, password } = req.body;
  const { userId } = req.user;

  try {
    const updateData = { fullName, email, phone, address };
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({
      message: "Profile updated",
      user: {
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// 👇 Exporting all at once
module.exports = {
  signup,
  login,
  updateProfile
};
