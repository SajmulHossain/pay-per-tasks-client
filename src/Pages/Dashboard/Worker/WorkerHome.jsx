import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";

const WorkerHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: states = {}, isLoading } = useQuery({
    queryKey: ["states", user?.email],
    enabled: user && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure(`/states/worker/${user?.email}`);
      return data;
    },
  });

  const { pendingSubmissions, totalSubmissions, totalEarning } = states || {};

  return (
    <section className="section">
      {isLoading ? (
        <div className="w-full join join-vertical md:join-horizontal gap-[1px]">
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] md:block"></div>
          <hr className="md:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] md:block"></div>
          <hr className="md:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
        </div>
      ) : (
        <div className="stats stats-vertical md:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-figure text-main-color">
              <FaTasks size={30} />
            </div>
            <div className="stat-title">Total Submission</div>
            <div className="stat-value">{totalSubmissions}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-main-color">
              <MdOutlinePendingActions size={30} />
            </div>
            <div className="stat-title">Pending Submissions</div>
            <div className="stat-value">{pendingSubmissions}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-main-color">
              <BiCoinStack size={30} />
            </div>
            <div className="stat-title">Required Workers</div>
            <div className="stat-value">{totalEarning}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkerHome;
