import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Task from "./Task";
import DefaultLoading from "../../../components/DefaultLoading";


const TaskList = () => {
  const axiosSecure = useAxiosSecure();
  const {data: tasks=[], isLoading} = useQuery({
    queryKey:['available-tasks'],
    queryFn: async() => {
      const { data } = await axiosSecure('/available-tasks');
      return data;
    }
  })

  if(isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <DefaultLoading />
    </div>
  }
  return (
    <section className="section">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default TaskList;