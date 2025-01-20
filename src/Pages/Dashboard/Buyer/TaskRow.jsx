/* eslint-disable react/prop-types */

import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import CrudLoading from "../../../components/CrudLoading";

const TaskRow = ({ task, index, refetch }) => {
  const { title, date, workers, _id } = task || {};
  const axiosSecure = useAxiosSecure();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.delete(`/task/${_id}`);

      if (data?.deletedCount && data?.modifiedCount) {
        refetch();
        toast.success("Task deleted successfully");
      } else {
        toast.error("Something went wrong!");
      }
    },
  });
  return (
    <tr
      className={`${
        index % 2 ? "bg-main-color/30" : "bg-second-color/30"
      } text-center`}
    >
      <td>{title.slice(0, 20)}...</td>
      <td>{workers}</td>
      <td>{format(new Date(date), "PP")}</td>
      <td className="space-x-2">
        <Link
          to={`/dashboard/update-task/${_id}`}
          className="btn btn-xs bg-green-500 hover:bg-green-700 text-white"
        >
          Update
        </Link>
        <button onClick={async() => await mutateAsync()} className="btn btn-xs bg-red-500 hover:bg-red-700 text-white">
          {
            isPending ? <CrudLoading /> : 'Delete'
          }
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
