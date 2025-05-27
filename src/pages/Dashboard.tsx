import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import { useTasks } from "../hooks/useTasks";
import { type TaskFilterType } from "../types";
import { Container, Alert } from "react-bootstrap";

const Dashboard: React.FC = () => {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilterType["status"]>("all");

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <Container className="my-4">
      <h1>Task Management Dashboard ok</h1>
      {loading && <Alert variant="info">Loading...</Alert>}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <TaskForm onAdd={addTask} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </Container>
  );
};

export default Dashboard;
