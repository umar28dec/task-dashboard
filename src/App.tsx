import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import routes from "./routes";

const AppRoutes = () => {
  return useRoutes(routes);
};
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes></AppRoutes>
      </Router>
    </AuthProvider>
  );
}

export default App;
