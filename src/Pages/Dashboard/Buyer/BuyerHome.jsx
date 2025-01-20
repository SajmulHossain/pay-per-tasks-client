import { useQuery } from "@tanstack/react-query";
import { FaTasks } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import {
  MdOutlinePendingActions,
  MdPayments,
} from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PendingTaskRow from "./PendingTaskRow";

const BuyerHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: states = {}, isLoading, refetch:statesReload } = useQuery({
    queryKey: ["buyer-states", user?.email],
    enabled: user && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure(`/states/buyer/${user?.email}`);
      return data;
    },
  });

  const { tasks, pending, workers } = states || {};

  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["submissions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/pending-tasks/${user?.email}`);
      return data;
    },
  });

 

  if (isLoading) {
    return (
      <section className="section">
        <div className="w-full join join-vertical md:join-horizontal gap-[1px]">
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] md:block"></div>
          <hr className="md:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] md:block"></div>
          <hr className="md:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] md:block"></div>
          <hr className="md:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
        </div>
      </section>
    );
  }
  return (
    <section className="section">
      <div className="stats stats-vertical md:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-figure text-main-color">
            <FaTasks size={30} />
          </div>
          <div className="stat-title">Total Tasks</div>
          <div className="stat-value">{tasks}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-main-color">
            <MdOutlinePendingActions size={30} />
          </div>
          <div className="stat-title">Pending Tasks</div>
          <div className="stat-value">{pending}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-main-color">
            <GrUserWorker size={30} />
          </div>
          <div className="stat-title">Required Workers</div>
          <div className="stat-value">{workers}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-main-color">
            <MdPayments size={30} />
          </div>
          <div className="stat-title">Total Payments</div>
          <div className="stat-value">1,200</div>
        </div>
      </div>

      <div className="overflow-x-auto mt-12">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Worker Name</th>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>View Submission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <PendingTaskRow
                key={submission._id}
                refetch={refetch}
                submission={submission}
                index={index}
                statesReload={statesReload}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BuyerHome;
