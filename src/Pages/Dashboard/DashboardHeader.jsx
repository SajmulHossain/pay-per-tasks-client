
import blackLogo from "../../assets/images/black-logo.png";
import { Link } from "react-router-dom";
import Coin from "../../components/Coin";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { RiMenuFold4Line } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";

const DashboardHeader = () => {
  const {user,loading} = useAuth();
  const [role, isLoading] = useRole();
  
  return (
    <header className="py-2 border-y border-main-color">
      <section className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <label
            htmlFor="my-drawer-2"
            className="drawer-button lg:hidden cursor-pointer"
          >
            <RiMenuFold4Line size={30} />
          </label>

          <Link to="/">
            <img src={blackLogo} className="h-12" alt="logo" />
          </Link>
        </div>

        {isLoading || loading ? (
          <div className="w-80">
            <div className="skeleton w-full h-12"></div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="flex items-center gap-1">
                <p>
                  <Coin />
                </p>
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={user?.photoURL}
                  alt={`${user?.displayName}'s photo`}
                />
              </div>
              <div className="w-[2px] h-12 bg-main-color"></div>
              <div>
                <div className="flex flex-col-reverse">
                  <p className="capitalize">{role}</p>
                  <p className="font-semibold">{user?.displayName}</p>
                </div>
              </div>
            </div>
            <div className="w-[2px] h-12 bg-main-color"></div>
            <div>
              <button>
                <IoMdNotifications size={40} />
              </button>
            </div>
          </div>
        )}
      </section>
    </header>
  );
};

export default DashboardHeader;
