const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
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
