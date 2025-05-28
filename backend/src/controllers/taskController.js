const Task = require("../models/Task");
const { Op } = require("sequelize");

exports.getAllTasks = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    // Filtering
    const where = {};
    if (req.query.status) {
      where.status = req.query.status;
    }
    if (req.query.title) {
      where.title = { [Op.like]: `%${req.query.title}%` };
    }

    // Sorting
    let sortBy = req.query.sortBy || "createdAt";
    let sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC";
    // Only allow sorting by certain fields for safety
    const allowedSortFields = [
      "id",
      "title",
      "status",
      "dueDate",
      "createdAt",
      "updatedAt",
    ];
    if (!allowedSortFields.includes(sortBy)) {
      sortBy = "createdAt";
    }

    const { count, rows } = await Task.findAndCountAll({
      where,
      offset,
      limit: pageSize,
      order: [[sortBy, sortOrder]],
    });

    res.json({
      tasks: rows,
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
