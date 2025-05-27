import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import { Container, Alert } from "react-bootstrap";

const CreateTask: React.FC = () => {
  const { addTask, error } = useTasks();

  return (
    <Container className="my-4">
      <h1>Create Task</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <TaskForm onSubmit={addTask} submitButtonText="Add Task" />
    </Container>
  );
};

export default CreateTask;
