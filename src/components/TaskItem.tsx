import React, { useMemo } from "react";
import { type Task } from "../types";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, updatedTask: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const statusOptions = useMemo(
    () => [
      { value: "todo", label: "Todo" },
      { value: "in-progress", label: "In Progress" },
      { value: "done", label: "Done" },
    ],
    []
  );

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <Card.Text>Due: {task.dueDate}</Card.Text>
        <Form.Select
          value={task.status}
          onChange={(e) =>
            onUpdate(task.id, { status: e.target.value as Task["status"] })
          }
          className="mb-2"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
        <Button
          variant="primary"
          as={Link as any}
          to={`/tasks/update/${task.id}`}
          className="me-2"
        >
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default React.memo(TaskItem);
