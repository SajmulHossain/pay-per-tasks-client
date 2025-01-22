import { useQuery } from "@tanstack/react-query";
import { FaCoins, FaTasks } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import Heading from "../../../components/Heading";
import NoData from "../../../components/NoData";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PendingTaskRow from "./PendingTaskRow";

const BuyerHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: states = {},
    isLoading,
    refetch: statesReload,
  } = useQuery({
    queryKey: ["buyer-states", user?.email],
    enabled: user && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure(`/states/buyer/${user?.email}`);
      return data;
    },
  });

  const { tasks, pending, workers, payments } = states || {};

  const {
    data: submissions = [...Array(10)],
    isLoading: loadingSubmissions,
    refetch,
  } = useQuery({
    queryKey: ["submissions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/pending-tasks/${user?.email}`);
      return data;
    },
  });

  return (
    <section className="section">
      {isLoading ? (
        <div className="w-full join join-vertical lg:join-horizontal gap-[1px]">
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] lg:block"></div>
          <hr className="lg:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] lg:block"></div>
          <hr className="lg:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
          <div className=" h-20 bg-gray-300 hidden skeleton w-[4px] lg:block"></div>
          <hr className="lg:hidden border-gray-300" />
          <div className="skeleton h-20 w-full join-item"></div>
        </div>
      ) : (
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
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
              <FaCoins size={30} />
            </div>
            <div className="stat-title">Total Payments</div>
            <div className="stat-value">{payments}</div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <Heading
          heading="Pending Submissions"
          title="Check to approve or reject submissions"
        />
      </div>
      {submissions?.length ? (
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
              {loadingSubmissions ? (
                <>
                  {submissions.map((i, index) => (
                    <tr key={index}>
                      <td colSpan="6">
                        <div className="w-full">
                          <div className="skeleton my-0 w-full h-16"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {submissions.map((submission, index) => (
                    <PendingTaskRow
                      key={submission._id}
                      refetch={refetch}
                      submission={submission}
                      index={index}
                      statesReload={statesReload}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default BuyerHome;
