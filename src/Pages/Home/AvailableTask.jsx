import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Heading";
import { axiosSecureUrl } from "../../hooks/useAxiosSecure";
import NoData from "../../components/NoData";
import Task from "../../components/Task";

const AvailableTask = () => {
  const { data: tasks = [...Array(8)], isLoading } = useQuery({
    queryKey: ["available-tasks"],
    queryFn: async () => {
      const { data } = await axiosSecureUrl("/available-tasks?limit=6");
      return data;
    },
  });

  console.log(tasks);
  return (
    <section className="section">
      <Heading heading="Available Task" />

      {tasks.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <>
              {isLoading ? (
                <div className="w-full h-80 skeleton"></div>
              ) : (
                <Task key={task?._id} task={task} />
              )}
            </>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default AvailableTask;
