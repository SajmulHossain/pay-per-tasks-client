import useRole from "../../hooks/useRole";
import DashboardHeader from "./DashboardHeader";
import { Navigate, Outlet } from "react-router-dom";
import WorkerNav from "./Links/WorkerNav";
import BuyerNav from "./Links/BuyerNav";
import AdminNav from "./Links/AdminNav";
import useAuth from "../../hooks/useAuth";
import DefaultLoading from "../../components/DefaultLoading";
import { IoIosLogOut } from "react-icons/io";
import toast from "react-hot-toast";
import redirect from "../../utils/redirectRoute";

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
            <>
              <Navigate to={redirect(role, isLoading)} replace={true} />
              <Outlet />
            </>
          )}
        </div>
        <div className="drawer-side mt-16 lg:mt-0">
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
                className="uppercase transition-all duration-500 font-semibold hover:shadow-md hover:-translate-y-1 bg-second-color px-4 rounded-md text-white w-full flex py-2 items-center gap-2 "
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
