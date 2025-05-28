import React, { useState, useEffect } from "react";
import { type Task } from "../types";
import TaskItem from "./TaskItem";
import {
  Row,
  Col,
  Pagination,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import axios from "axios";

interface TaskListProps {
  onUpdate: (id: number, updatedTask: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const TaskList: React.FC<TaskListProps> = ({ onUpdate, onDelete }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params: any = {
        page,
        pageSize,
        sortBy,
        sortOrder,
      };
      if (status) params.status = status;
      if (title) params.title = title;
      const response = await axios.get(`${API_BASE_URL}/tasks`, { params });
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status, title, sortBy, sortOrder]);

  // Add this effect to refetch tasks when a task is deleted or updated
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status, title, sortBy, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTasks();
  };

  // If you call fetchTasks after deleting a task, but the current page is now empty (e.g., you deleted the last item on the last page),
  // the page will not update to the previous page, so the UI may appear empty.
  // To fix this, after deleting a task, check if the current page is now empty and, if so, go to the previous page.

  const handleDelete = async (id: number) => {
    await onDelete(id);
    // Refetch tasks after deletion
    const params: any = {
      page,
      pageSize,
      sortBy,
      sortOrder,
    };
    if (status) params.status = status;
    if (title) params.title = title;
    const response = await axios.get(`${API_BASE_URL}/tasks`, { params });
    setTasks(response.data.tasks);
    setTotalPages(response.data.totalPages);
    // If the current page is now empty and not the first page, go to the previous page
    if (response.data.tasks.length === 0 && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <Form onSubmit={handleSearch} className="mb-3">
        <InputGroup>
          <Form.Control
            placeholder="Search by title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ maxWidth: 180 }}
          >
            <option value="">All Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </Form.Select>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ maxWidth: 180 }}
          >
            <option value="createdAt">Sort by Created</option>
            <option value="title">Sort by Title</option>
            <option value="status">Sort by Status</option>
            <option value="dueDate">Sort by Due Date</option>
          </Form.Select>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            style={{ maxWidth: 120 }}
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </Form.Select>
          <Button type="submit" variant="primary">
            Filter
          </Button>
        </InputGroup>
      </Form>
      <Row>
        {loading ? (
          <div className="text-center my-4">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center my-4">No tasks found.</div>
        ) : (
          tasks.map((task) => (
            <Col key={task.id} xs={12} sm={6} md={4} className="mb-4">
              <TaskItem
                task={task}
                onUpdate={onUpdate}
                onDelete={handleDelete}
              />
            </Col>
          ))
        )}
      </Row>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
          <Pagination.Prev
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={page === idx + 1}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          />
          <Pagination.Last
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          />
        </Pagination>
      </div>
    </>
  );
};

// Make sure there is NO reference to filteredTasks or filteredTasks.slice in this file.
// All pagination, filtering, and sorting are now handled by the backend.
// Use only the 'tasks' array from the server response for rendering.

export default React.memo(TaskList);
