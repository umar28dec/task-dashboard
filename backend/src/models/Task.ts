import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: "todo" | "in-progress" | "done";
  public dueDate!: string;
}

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
