import { type RouteObject } from "react-router-dom";
import Layout from "./components/Layout";
import TasksList from "./pages/TasksList";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";
import React, { lazy, Suspense } from "react";

const About = lazy(() => import("./pages/About"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/tasks", element: <TasksList /> },
      { path: "/tasks/create", element: <CreateTask /> },
      { path: "/tasks/update/:id", element: <UpdateTask /> },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/contact",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ContactUs />
      </Suspense>
    ),
  },
];

export default routes;
