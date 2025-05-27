import { Navbar, Nav, Container, Button } from "react-bootstrap";

interface AppNavbarProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const AppNavbar: React.FC<AppNavbarProps> = ({
  isAuthenticated,
  onLoginClick,
  onLogoutClick,
}) => {
  return (
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
            {isAuthenticated ? (
              <Button variant="outline-danger" onClick={onLogoutClick}>
                Logout
              </Button>
            ) : (
              <Button variant="outline-primary" onClick={onLoginClick}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
