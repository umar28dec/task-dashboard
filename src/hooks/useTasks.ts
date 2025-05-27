import { useState, useEffect } from "react";
import axios from "axios";
import type { Task } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        setTasks(response.data);
      } catch {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, task);
      setTasks([...tasks, response.data]);
    } catch {
      setError("Failed to add task");
    }
  };

  const updateTask = async (id: number, updatedTask: Partial<Task>) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
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
  };
};
