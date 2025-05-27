import { type Task } from "../types";
import TaskItem from "./TaskItem";
import { Row, Col } from "react-bootstrap";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: number, updatedTask: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  return (
    <Row>
      {tasks.map((task) => (
        <Col key={task.id} xs={12} sm={6} md={4} className="mb-4">
          <TaskItem task={task} onUpdate={onUpdate} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
};

export default TaskList;
