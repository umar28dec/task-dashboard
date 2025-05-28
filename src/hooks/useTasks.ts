import { useState, useEffect } from "react";
import axios from "axios";
import type { Task } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to reload tasks from server
  const reloadTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data.tasks || response.data); // handle both paginated and non-paginated
      setError(null);
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  const addTask = async (task: Omit<Task, "id">) => {
    try {
      await axios.post(`${API_BASE_URL}/tasks`, task);
      await reloadTasks();
      setError(null);
    } catch {
      setError("Failed to add task");
    }
  };

  const updateTask = async (id: number, updatedTask: Partial<Task>) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask);
      await reloadTasks();
      setError(null);
    } catch {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      await reloadTasks();
      setError(null);
    } catch {
      setError("Failed to delete task");
    }
  };

  const fetchTaskById = async (id: number): Promise<Task | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
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
