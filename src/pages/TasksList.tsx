import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import { type TaskFilterType } from "../types";
import { Container, Alert, Pagination } from "react-bootstrap";

const TASKS_PER_PAGE = 2;

const TasksList: React.FC = () => {
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilterType["status"]>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  // Calculate pagination
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const endIndex = startIndex + TASKS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate pagination items
  const paginationItems = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Container className="my-4">
      <h1>Tasks List</h1>
      {loading && <Alert variant="info">Loading...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={paginatedTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
      {totalTasks > 0 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {paginationItems}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default TasksList;
