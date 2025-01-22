import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { RiMenuFold4Line, RiNotificationBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import blackLogo from "../../assets/images/black-logo.png";
import simplifiedLogo from "../../assets/images/simplifiedLogo.png";
import Coin from "../../components/Coin";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { formatDistanceToNowStrict } from "date-fns";

const DashboardHeader = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  const [showNotice, setShowNotice] = useState(false);

  const { data: notifications = [...Array(5)],isLoading:noticeLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/notifications/${user?.email}`);
      return data;
    },
  });

  

  return (
    <header className="py-2 relative z-50 border-y lg:sticky lg:top-0 lg:z-50 backdrop-blur-3xl border-main-color">
      <section className="container mx-auto flex px-4 justify-between items-center">
        <div className="flex items-center">
          <label
            htmlFor="my-drawer-2"
            className="drawer-button mr-2 lg:hidden cursor-pointer"
          >
            <RiMenuFold4Line size={30} />
          </label>

          <Link to="/">
            <img src={blackLogo} className="h-12 hidden lg:block" alt="logo" />
            <img
              src={simplifiedLogo}
              className="h-12 w-12 lg:hidden object-cover"
              alt="logo for small device"
            />
          </Link>
        </div>

        {isLoading || loading ? (
          <div className="w-80">
            <div className="skeleton w-full h-12"></div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="md:flex items-center gap-1 hidden">
                <div>
                  <Coin />
                </div>
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
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
            <div className="w-[2px] hidden md:block h-12 bg-main-color"></div>
            <div>
              <button onClick={() => setShowNotice(!showNotice)}>
                <IoMdNotifications size={40} />
              </button>
            </div>
          </div>
        )}
      </section>
      <div
        className={`absolute bg-main-color/80 top-16 right-6 ${
          showNotice ? "block" : "hidden"
        } p-4 rounded z-50 w-60`}
      >
        {notifications?.length ? (
          <>
            {notifications?.map((notice) => (
              <>
                {noticeLoading ? (
                  <div className="w-full">
                    <div className="skeleton rounded w-full h-10"></div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link to={notice?.actionRoute}>
                      <div className="flex gap-2">
                        <p>
                          <RiNotificationBadgeFill size={24} />
                        </p>
                        <div>
                          <p className="text-sm">{notice?.message}</p>
                          <p className="mt-1 text-xs">
                            {formatDistanceToNowStrict(new Date(notice?.time))}{" "}
                            ago
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </>
            ))}
          </>
        ) : (
          <p>No notification found</p>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
