import { Outlet } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenModal = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);

  if (!isAuthenticated) {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="/tasks">Task Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/tasks">Tasks</Nav.Link>
                <Nav.Link href="/tasks/create">Create Task</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/contact">Contact Us</Nav.Link>
              </Nav>
              <Nav>
                <Button variant="outline-primary" onClick={handleOpenModal}>
                  Login
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <div>Please log in to access the dashboard.</div>
        </Container>
        <LoginModal
          show={showLoginModal}
          onClose={handleCloseModal}
          isAuthenticated={isAuthenticated}
        />
      </>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/tasks">Task Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/tasks">Tasks</Nav.Link>
              <Nav.Link href="/tasks/create">Create Task</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-danger" onClick={handleOpenModal}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
      <LoginModal
        show={showLoginModal}
        onClose={handleCloseModal}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};

export default Layout;
