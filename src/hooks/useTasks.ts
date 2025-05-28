import { useState, useEffect } from "react";
import axios from "axios";
import type { Task } from "../types";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

function validateTask(task: Partial<Task>): string | null {
  // Only validate fields that are present (for partial updates)
  if (
    "title" in task &&
    (typeof task.title !== "string" || task.title.trim().length === 0)
  ) {
    return "Title is required and must be a non-empty string.";
  }
  if (
    "status" in task &&
    task.status &&
    !["todo", "in-progress", "done"].includes(task.status)
  ) {
    return "Status must be one of: todo, in-progress, done.";
  }
  if ("dueDate" in task && task.dueDate && isNaN(Date.parse(task.dueDate))) {
    return "Due date must be a valid date.";
  }
  return null;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  // Helper to get auth headers
  const getAuthHeaders = () =>
    token ? { Authorization: `Bearer ${token}` } : {};

  // Helper to reload tasks from server
  const reloadTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: { ...getAuthHeaders() },
      });
      setTasks(response.data.tasks || response.data);
      setError(null);
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) reloadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addTask = async (task: Omit<Task, "id">) => {
    const validationError = validateTask(task);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/tasks`, task, {
        headers: { ...getAuthHeaders() },
      });
      await reloadTasks();
      setError(null);
    } catch {
      setError("Failed to add task");
    }
  };

  const updateTask = async (id: number, updatedTask: Partial<Task>) => {
    const validationError = validateTask(updatedTask);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask, {
        headers: { ...getAuthHeaders() },
      });
      await reloadTasks();
      setError(null);
    } catch {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: { ...getAuthHeaders() },
      });
      await reloadTasks();
      setError(null);
    } catch {
      setError("Failed to delete task");
    }
  };

  const fetchTaskById = async (id: number): Promise<Task | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/${id}`, {
        headers: { ...getAuthHeaders() },
      });
      return response.data;
    } catch {
      setError("Failed to fetch task");
      return null;
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    fetchTaskById,
    reloadTasks,
  };
};
