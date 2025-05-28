const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

exports.register = async (req, res) => {
  const { username, password, email, fullName, role, isActive } = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ error: "Username, password, and email are required" });
  try {
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername)
      return res.status(409).json({ error: "Username already exists" });
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail)
      return res.status(409).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      email,
      fullName: fullName || null,
      role: role || "user",
      isActive: typeof isActive === "boolean" ? isActive : true,
    });
    return res.json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
      return res.json({ token });
    }
    return res.status(401).json({ error: "Invalid credentials" });
  } catch (err) {
    return res.status(500).json({ error: "Login failed" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    // Prevent username/email duplication
    if (req.body.username && req.body.username !== user.username) {
      const exists = await User.findOne({
        where: { username: req.body.username },
      });
      if (exists)
        return res.status(409).json({ error: "Username already exists" });
    }
    if (req.body.email && req.body.email !== user.email) {
      const exists = await User.findOne({ where: { email: req.body.email } });
      if (exists)
        return res.status(409).json({ error: "Email already exists" });
    }
    await user.update(req.body);
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
