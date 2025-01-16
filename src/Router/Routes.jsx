import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Register from "../Pages/Register/Register";

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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },{
        path: '/register', 
        element: <Register />
      }
    ],
  },
]);

export default routes;
