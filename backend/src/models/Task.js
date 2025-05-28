const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("todo", "in-progress", "done"),
      allowNull: false,
      defaultValue: "todo",
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  }
);

module.exports = Task;
