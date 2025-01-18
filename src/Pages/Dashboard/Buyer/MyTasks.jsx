import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TaskRow from "./TaskRow";


const MyTasks = () => {
  const {user, loading} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data:tasks=[...Array(10)], isLoading} = useQuery({
    queryKey:['tasks', user?.email ],
    enabled: user && !loading,
    queryFn: async() => {
      const {data} = await axiosSecure(`/tasks/${user?.email}`);
      return data;
    }
  })

  return (
    <section className="section">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-center">
            <tr className="bg-main-color">
              <th>Title</th>
              <th>Workers</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                {tasks.map((i, index) => (
                  <tr key={index}>
                    <td colSpan="4">
                      <div className="w-full">
                        <div className="skeleton my-0 w-full h-16"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {tasks.map((task, index) => (
                  <TaskRow key={task._id} index={index} task={task} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyTasks;