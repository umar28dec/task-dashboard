import { Container, Card } from "react-bootstrap";

const About: React.FC = () => {
  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>About Task Management Dashboard</Card.Title>
          <Card.Text>
            The Task Management Dashboard is a modern web application built with
            React, TypeScript, and React-Bootstrap. It allows users to manage
            tasks efficiently by adding, updating, deleting, and filtering tasks
            based on their status. The app features a responsive design, mock
            authentication, and integration with a sample API (JSONPlaceholder).
          </Card.Text>
          <Card.Text>
            Key features include:
            <ul>
              <li>
                Create and manage tasks with titles, descriptions, and due
                dates.
              </li>
              <li>Update task status (Todo, In Progress, Done).</li>
              <li>Filter tasks by status.</li>
              <li>Responsive navigation with login/logout functionality.</li>
            </ul>
          </Card.Text>
          <Card.Text>
            This project is designed to demonstrate best practices in React and
            TypeScript development, including modular components, custom hooks,
            and type-safe routing.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
