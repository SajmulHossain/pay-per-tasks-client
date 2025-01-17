import useRole from "../../hooks/useRole";
import DashboardHeader from "./DashboardHeader";
import { Outlet } from "react-router-dom";
import WorkerNav from "./Links/WorkerNav";
import BuyerNav from "./Links/BuyerNav";
import AdminNav from "./Links/AdminNav";
import useAuth from "../../hooks/useAuth";
import DefaultLoading from "../../components/DefaultLoading";
import { IoIosLogOut } from "react-icons/io";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [role, isLoading] = useRole();
  const { loading, logout } = useAuth();

  const active = ({ isActive }) => (isActive ? "bg-main-color" : "");

  const handleLogOut = () => {
    logout()
      .then(() => {
        toast.success("Logout Successful.");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <>
      <DashboardHeader />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {loading ? (
            <div className="flex min-h-screen justify-center items-center">
              <DefaultLoading />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {(isLoading || loading) && (
              <div className="flex w-full flex-col gap-4">
                <div className="skeleton h-8 rounded w-full"></div>
                <div className="skeleton h-8 rounded w-full"></div>
                <div className="skeleton h-8 rounded w-full"></div>
                <div className="skeleton h-8 rounded w-full"></div>
                <div className="skeleton h-8 rounded w-full"></div>
              </div>
            )}
            {role === "worker" && <WorkerNav design={active} />}
            {role === "buyer" && <BuyerNav design={active} />}
            {role === "admin" && <AdminNav design={active} />}

            <div className="mt-auto">
              <button
                onClick={handleLogOut}
                className="border-y hover:bg-main-color border-main-color w-full flex py-2 items-center gap-2 "
              >
                <IoIosLogOut size={24} /> Log out
              </button>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
