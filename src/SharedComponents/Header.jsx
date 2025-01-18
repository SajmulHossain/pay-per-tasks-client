import { Link, useNavigate } from "react-router-dom";
import blackLogo from "../assets/images/black-logo.png";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Coin from "../components/Coin";
import useRole from "../hooks/useRole";

const Header = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [role, isRolling] = useRole();
  const handleLogOut = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch(({ code }) => toast.error(code));
  };

  let dashboardPath = "/dashboard";

  if (!isRolling) {
    if (role === "worker") {
      dashboardPath = "/dashboard/worker-home";
    } else if (role === "buyer") {
      dashboardPath = "/dashboard/buyer-home";
    } else if (role === "admin") {
      dashboardPath = "/dashboard/admin-home";
    } else {
      dashboardPath = "/";
    }
  }

  const dashboard = (
    <>
      {user && (
        <>
          <div className="flex items-center">
            <img
              className="w-12 h-12 object-cover rounded-full"
              referrerPolicy="no-referrer"
              src={user?.photoURL}
              alt={`${user?.displayName}'s photo`}
            />
          </div>
          <div>
            <Link to={dashboardPath} className="btn bg-second-color text-white">
              Dashbaord
            </Link>
          </div>
        </>
      )}
    </>
  );

  const navbarEnd = (
    <>
      {loading ? (
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-12 w-full"></div>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <div className="join join-vertical md:join-horizontal">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="btn join-item bg-second-color text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn join-item bg-second-color text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogOut}
                  className="btn bg-orange-500 join-item"
                >
                  Log Out
                </button>
              </>
            )}
            <Link className="btn join-item bg-main-color">
              Join As Developer
            </Link>
          </div>
          {user && <Coin />}
        </div>
      )}
    </>
  );
  return (
    <header className="backdrop-blur-3xl sticky z-50 top-0 border-y border-main-color">
      <div className="navbar p-0 max-w-screen-xl px-4 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] gap-4 mt-3 w-52 p-2 shadow"
            >
              {navbarEnd}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost md:p-0">
            <img src={blackLogo} className="w-36" alt="logo" />
          </Link>
        </div>
        <div className="navbar-end gap-4">
          {dashboard}
          <div className="hidden md:block">{navbarEnd}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
