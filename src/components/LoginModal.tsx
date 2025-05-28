import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({
  show,
  onClose,
  isAuthenticated,
}) => {
  const { login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      logout();
      onClose();
    } else {
      if (username && password) {
        setLoading(true);
        const ok = await login(username, password);
        setLoading(false);
        if (ok) {
          setUsername("");
          setPassword("");
          setError(null);
          onClose();
        } else {
          setError("Invalid username or password");
        }
      } else {
        setError("Please enter username and password");
      }
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isAuthenticated ? "Logout" : "Login"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isAuthenticated ? (
          <p>Are you sure you want to logout?</p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        )}
      </Modal.Body>
      {isAuthenticated && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Logout
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default LoginModal;
