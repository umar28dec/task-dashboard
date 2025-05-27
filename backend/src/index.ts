import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

type Task = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
};

const tasks: Task[] = [];
let nextId = 1;

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get a single task
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// Create a new task
app.post("/tasks", (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const newTask: Task = {
    id: nextId++,
    title,
    description,
    status,
    dueDate,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });
  tasks[idx] = { ...tasks[idx], ...req.body };
  res.json(tasks[idx]);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(idx, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Task API listening at http://localhost:${port}`);
});
