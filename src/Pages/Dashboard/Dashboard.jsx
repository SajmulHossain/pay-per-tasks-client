import DashboardHeader from "./DashboardHeader";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

  const active = ({isActive}) => isActive ? 'bg-main-color': '';
  
  const links = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "bg-main-color" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="tasks"
          className={({ isActive }) => (isActive ? "bg-main-color" : "")}
        >
          TaskList
        </NavLink>
      </li>
      <li>
        <NavLink
          to="submission"
          className={({ isActive }) => (isActive ? "bg-main-color" : "")}
        >
          My Submissions
        </NavLink>
      </li>
      <li>
        <NavLink
          to="withdraw"
          className={({ isActive }) => (isActive ? "bg-main-color" : "")}
        >
          Withdrawals
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <DashboardHeader />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet />         
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {links}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
