import express from "express";
import cors from "cors";
import sequelize from "./db";
import { Task } from "./models/Task";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Root index action
app.get("/", (req, res) => {
  res.json({ message: "Task Dashboard API is running." });
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Get a single task
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Task API listening at http://localhost:${port}`);
  });
});
