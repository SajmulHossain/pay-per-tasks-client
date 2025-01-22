import { useQuery } from "@tanstack/react-query";
import { BsListTask } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { GrTask, GrUserWorker } from "react-icons/gr";
import { axiosSecureUrl } from "../../hooks/useAxiosSecure";


const States = () => {
  const {data:states={}, isLoading} = useQuery({
    queryKey: ['home-states'],
    queryFn: async() => {
      const { data } = await axiosSecureUrl('/states/home');
      return data;
    }
  })

  const {workers, buyers, tasks, completedTasks} = states || {};
  
  return (
    <section className="bg-main-color/10">
      <div className="section">
        {isLoading ? (
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
        ) : (
          <div className="stats stats-vertical md:stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-figure text-main-color">
                <GrUserWorker size={30} />
              </div>
              <div className="stat-title">Registered Workers</div>
              <div className="stat-value">{workers}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-main-color">
                <FaUserTie size={30} />
              </div>
              <div className="stat-title">Registered Buyers</div>
              <div className="stat-value">{buyers}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-main-color">
                <BsListTask size={30} />
              </div>
              <div className="stat-title">Total Task Posts</div>
              <div className="stat-value">{tasks}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-main-color">
                <GrTask size={30} />
              </div>
              <div className="stat-title">Completed Tasks</div>
              <div className="stat-value">{completedTasks}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default States;