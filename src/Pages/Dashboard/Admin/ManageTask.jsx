import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";


const ManageTask = () => {
  const axiosSecure = useAxiosSecure();

  const {data:tasks=[...Array(10)], isLoading} = useQuery({
    queryKey: ['tasks'],
    queryFn: async() => {
      const {data} = await axiosSecure('/tasks');
      return data;
    }
  })

  return (
    <section className="section">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Title</th>
              <th>Buyer Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
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
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task?.title.slice(0, 20)}...</td>
                    <td>{task?.buyer?.name}</td>
                    <td>{format(new Date(task?.date), 'PP')}</td>
                    <td>
                      <button className="btn btn-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageTask;