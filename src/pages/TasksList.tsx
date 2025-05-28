import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import { type TaskFilterType } from "../types";
import { Container, Alert } from "react-bootstrap";

const TasksList: React.FC = () => {
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilterType["status"]>("all");

  return (
    <Container className="my-4">
      <h1>Tasks List</h1>
      {loading && <Alert variant="info">Loading...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </Container>
  );
};

export default TasksList;
