import React from "react";
import { Container } from "react-bootstrap";

const HomePage: React.FC = () => {
  return (
    <Container className="mt-4">
      <h1>Welcome to the Task Dashboard</h1>
      <p>
        This is a simple task management application where you can organize and
        track your tasks efficiently. Log in to access your personalized
        dashboard and start managing your tasks today!
      </p>
    </Container>
  );
};

export default HomePage;
