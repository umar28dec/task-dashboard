import { type Task } from "../types";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, updatedTask: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
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
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </Form.Select>
        <Button
          variant="primary"
          as={Link}
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

export default TaskItem;
