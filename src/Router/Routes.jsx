import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Register from "../Pages/Register/Register";
import PrivetRoute from "./PrivetRoute";
import UserHome from "../Pages/Dashboard/User/UserHome";
import TaskList from "../Pages/Dashboard/User/TaskList";
import Submission from "../Pages/Dashboard/User/Submission";
import Withdrawal from "../Pages/Dashboard/User/Withdrawal";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <PrivetRoute>
            <UserHome />
          </PrivetRoute>
        ),
      },
      {
        path: "tasks",
        element: (
          <PrivetRoute>
            <TaskList />
          </PrivetRoute>
        ),
      },
      {
        path: "submission",
        element: (
          <PrivetRoute>
            <Submission />
          </PrivetRoute>
        ),
      },
      {
        path: "withdraw",
        element: (
          <PrivetRoute>
            <Withdrawal />
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default routes;
