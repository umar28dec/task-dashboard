import { type RouteObject } from "react-router-dom";
import Layout from "./components/Layout";
import TasksList from "./pages/TasksList";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/tasks", element: <TasksList /> },
      { path: "/tasks/create", element: <CreateTask /> },
      { path: "/tasks/update/:id", element: <UpdateTask /> },
      { path: "/about", element: <About /> },
    ],
  },
  { path: "/contact", element: <ContactUs /> },
];

export default routes;
