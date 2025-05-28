const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { tableName: "users", timestamps: true }
);

// Ensure the User table is created/synced with the database
User.sync();

module.exports = User;
