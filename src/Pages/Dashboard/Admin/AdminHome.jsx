import { useQuery } from "@tanstack/react-query";
import { FaCoins, FaUserTie } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data={}, isLoading } = useQuery({
    queryKey: ["admin-states"],
    enabled: !!user && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure("/states");
      return data;
    },
  });


  const {workers, buyers, coins} = data || {};

  if(isLoading) {
    return <div className="flex w-full section join gap-[1px]">
      <div className="skeleton h-20 w-full join-item"></div>
      <div className="h-20 bg-gray-500 skeleton w-[2px]"></div>
      <div className="skeleton h-20 w-full join-item"></div>
      <div className="h-20 bg-gray-500 skeleton w-[2px]"></div>
      <div className="skeleton h-20 w-full join-item"></div>
      <div className="h-20 bg-gray-500 skeleton w-[2px]"></div>
      <div className="skeleton h-20 w-full join-item"></div>
    </div>
  }
  return (
    <section className="section">
      <div className="stats shadow w-full">
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
          <div className="stat-value">1,200</div>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
