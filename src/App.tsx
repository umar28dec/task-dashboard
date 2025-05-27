import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useRoutes,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import routes from "./routes";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const AppRoutes = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/*" element={<AppRoutes />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
