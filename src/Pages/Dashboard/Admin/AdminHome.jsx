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

      <div className="overflow-x-auto mt-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminHome;
