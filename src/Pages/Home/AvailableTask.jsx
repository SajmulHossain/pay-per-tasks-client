import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Heading";
import NoData from "../../components/NoData";
import Task from "../../components/Task";
import { axiosSecureUrl } from "../../hooks/useAxiosSecure";

const AvailableTask = () => {
  const { data: tasks = [...Array(6)], isLoading } = useQuery({
    queryKey: ["available-tasks"],
    queryFn: async () => {
      const { data } = await axiosSecureUrl("/available-tasks?limit=6");
      return data;
    },
  });

  const latestTasks = tasks.reverse();

  
  return (
    <section className="section">
      <Heading heading="Available Task" />

      {tasks.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestTasks.map((task, index) => (
              <>
                {isLoading ? (
                  <div key={index} className="w-full h-80 skeleton"></div>
                ) : (
                  <Task key={task?._id} task={task} />
                )}
              </>
            ))}
          </div>
        </>
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default AvailableTask;
