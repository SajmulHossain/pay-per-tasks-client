import { useQuery } from "@tanstack/react-query";
import { FaCoins, FaUserTie } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WithdrawRequestRow from "./WithdrawRequestRow";
import NoData from "../../../components/NoData";
import Heading from "../../../components/Heading";

const AdminHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading, refetch:statesReload } = useQuery({
    queryKey: ["admin-states"],
    enabled: !!user && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure("/states");
      return data;
    },
  });

  const { workers, buyers, coins, payments } = data || {};

  // get pending withdrawal request
  const { data: withdraws = [...Array(10)], isLoading: withdrawLoading, refetch:withdrawReload } =
    useQuery({
      queryKey: ["withdraw-request"],
      queryFn: async () => {
        const { data } = await axiosSecure("/withdraws");
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
              <GrUserWorker size={30} />
            </div>
            <div className="stat-title">Workers</div>
            <div className="stat-value">{workers}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-main-color">
              <FaUserTie size={30} />
            </div>
            <div className="stat-title">Buyers</div>
            <div className="stat-value">{buyers}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-main-color">
              <FaCoins size={30} />
            </div>
            <div className="stat-title">Total Coin</div>
            <div className="stat-value">{coins}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-main-color">
              <MdPayments size={30} />
            </div>
            <div className="stat-title">Total Payments</div>
            <div className="stat-value">{payments}$</div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <Heading heading="Pending Withdrawals" />
      </div>

      {withdraws?.length ? (
        <div className="overflow-x-auto mt-12">
          <table className="table text-center">
            <thead>
              <tr>
                <th></th>
                <th>Worker Name</th>
                <th>Worker Email</th>
                <th>Withdraw Coin</th>
                <th>Withdraw Amount</th>
                <th>Payment Method</th>
                <th>Account Number</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawLoading ? (
                <>
                  {withdraws.map((i, index) => (
                    <tr key={index}>
                      <td colSpan="10">
                        <div className="w-full">
                          <div className="skeleton rounded my-0 w-full h-16"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {withdraws.map((withdraw, index) => (
                    <WithdrawRequestRow
                      key={withdraw._id}
                      withdrawReload={withdrawReload}
                      statesReload={statesReload}
                      withdraw={withdraw}
                      index={index}
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

export default AdminHome;
