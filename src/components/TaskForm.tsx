import { useState } from "react";
import { type Task } from "../types";
import { Button, Form, Alert } from "react-bootstrap";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Omit<Task, "id"> | Partial<Task>) => void;
  submitButtonText?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmit,
  submitButtonText = "Submit",
}) => {
  const [formData, setFormData] = useState<Partial<Task>>(
    initialTask || {
      title: "",
      description: "",
      status: "todo",
      dueDate: "",
    }
  );
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.dueDate) {
      onSubmit(formData);
      setError(null);
      if (!initialTask) {
        // Reset form only for create, not update
        setFormData({
          title: "",
          description: "",
          status: "todo",
          dueDate: "",
        });
      }
    } else {
      setError("Please fill in all required fields.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Enter task description"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          name="status"
          value={formData.status || "todo"}
          onChange={handleChange}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={formData.dueDate || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit" variant="primary">
        {submitButtonText}
      </Button>
    </Form>
  );
};

export default TaskForm;
