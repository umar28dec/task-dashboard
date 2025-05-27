import { useState, useEffect } from "react";
import axios from "axios";
import type { Task } from "../types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const mappedTasks: Task[] = response.data
          .slice(0, 10)
          .map((item: { id: number; title: string; completed: boolean }) => ({
            id: item.id,
            title: item.title,
            description: "Sample description",
            status: item.completed ? "done" : "todo",
            dueDate: new Date().toISOString().split("T")[0],
          }));
        setTasks(mappedTasks);
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
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        task
      );
      setTasks([...tasks, { ...task, id: response.data.id }]);
    } catch {
      setError("Failed to add task");
    }
  };

  const updateTask = async (id: number, updatedTask: Partial<Task>) => {
    try {
      console.log(updatedTask);
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        updatedTask
      );
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
      console.log(id);

      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch {
      setError("Failed to delete task");
    }
  };

  const fetchTaskById = async (id: number): Promise<Task | null> => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const task: Task = {
        id: response.data.id,
        title: response.data.title,
        description: "Sample description",
        status: response.data.completed ? "done" : "todo",
        dueDate: new Date().toISOString().split("T")[0],
      };
      return task;
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
