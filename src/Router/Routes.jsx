import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Register from "../Pages/Register/Register";
import PrivetRoute from "./PrivetRoute";
import WorkerHome from "../Pages/Dashboard/Worker/WorkerHome";
import TaskList from "../Pages/Dashboard/Worker/TaskList";
import Submission from "../Pages/Dashboard/Worker/Submission";
import Withdrawal from "../Pages/Dashboard/Worker/Withdrawal";
import BuyerRoute from "./BuyerRoute";
import BuyerHome from "../Pages/Dashboard/Buyer/BuyerHome";
import AddTask from "../Pages/Dashboard/Buyer/AddTask";
import MyTasks from "../Pages/Dashboard/Buyer/MyTasks";
import PurchaseCoin from "../Pages/Dashboard/Buyer/PurchaseCoin";
import PaymentHistory from "../Pages/Dashboard/Buyer/PaymentHistory";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageTask from "../Pages/Dashboard/Admin/ManageTask";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";

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
        path: "worker-home",
        element: (
          <PrivetRoute>
            <WorkerHome />
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
      {
        path: "buyer-home",
        element: (
          <PrivetRoute>
            <BuyerRoute>
              <BuyerHome />
            </BuyerRoute>
          </PrivetRoute>
        ),
      },
      {
        path: "add-task",
        element: (
          <PrivetRoute>
            <BuyerRoute>
              <AddTask />
            </BuyerRoute>
          </PrivetRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <PrivetRoute>
            <BuyerRoute>
              <MyTasks />
            </BuyerRoute>
          </PrivetRoute>
        ),
      },
      {
        path: "purchase-coin",
        element: (
          <PrivetRoute>
            <BuyerRoute>
              <PurchaseCoin />
            </BuyerRoute>
          </PrivetRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivetRoute>
            <BuyerRoute>
              <PaymentHistory />
            </BuyerRoute>
          </PrivetRoute>
        ),
      },
      {
        path: 'admin-home',
        element: <PrivetRoute>
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        </PrivetRoute>
      },
      {
        path: 'manage-users',
        element: <PrivetRoute>
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        </PrivetRoute>
      },
      {
        path: 'manage-tasks',
        element: <PrivetRoute>
          <AdminRoute>
            <ManageTask />
          </AdminRoute>
        </PrivetRoute>
      }
    ],
  },
]);

export default routes;
