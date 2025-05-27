import { type TaskFilterType } from "../types";
import { Form } from "react-bootstrap";

interface TaskFilterProps {
  filter: TaskFilterType["status"];
  onFilterChange: (status: TaskFilterType["status"]) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <Form.Select
      value={filter}
      onChange={(e) =>
        onFilterChange(e.target.value as TaskFilterType["status"])
      }
      className="mb-4"
    >
      <option value="all">All</option>
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
    </Form.Select>
  );
};

export default TaskFilter;
