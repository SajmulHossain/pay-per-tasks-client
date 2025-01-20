import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import ApprovedTask from "./ApprovedTask";

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

  const {data:approvedTasks=[...Array(10)], isLoading:taskLoading} = useQuery({
    queryKey: ['approvedTasks', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/approved-submissions/${user?.email}`);
      return data;
    }
  })

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
            <div className="stat-title">Total Earning</div>
            <div className="stat-value">{totalEarning}</div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-12">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th></th>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>Buyer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {taskLoading ? (
              <>
                {approvedTasks.map((i, index) => (
                  <tr key={index}>
                    <td colSpan="5">
                      <div className="w-full">
                        <div className="skeleton rounded my-0 w-full h-16"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {approvedTasks.map((task, index) => (
                  <ApprovedTask key={task._id} index={index} task={task} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default WorkerHome;
