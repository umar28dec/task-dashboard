import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import { type Task } from "../types";
import { Container, Alert, Spinner } from "react-bootstrap";

const UpdateTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchTaskById, updateTask, error } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        const fetchedTask = await fetchTaskById(parseInt(id));
        setTask(fetchedTask);
        setLoading(false);
      }
    };
    loadTask();
  }, [id, fetchTaskById]);

  if (loading)
    return (
      <Container className="my-4">
        <Spinner animation="border" />
      </Container>
    );
  if (!task) return <Navigate to="/tasks" replace />;

  return (
    <Container className="my-4">
      <h1>Update Task</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <TaskForm
        initialTask={task}
        onSubmit={(updatedTask) => updateTask(task.id, updatedTask)}
        submitButtonText="Update Task"
      />
    </Container>
  );
};

export default UpdateTask;
