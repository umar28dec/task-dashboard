import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AppNavbar from "./AppNavbar";

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenModal = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);

  return (
    <>
      <AppNavbar
        isAuthenticated={isAuthenticated}
        onLoginClick={handleOpenModal}
        onLogoutClick={handleOpenModal}
      />
      <Container>
        {!isAuthenticated ? (
          <div>Please log in to access the dashboard.</div>
        ) : (
          <Outlet />
        )}
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
