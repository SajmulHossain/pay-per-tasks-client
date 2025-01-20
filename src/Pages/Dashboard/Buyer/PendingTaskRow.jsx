/* eslint-disable react/prop-types */
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import CrudLoading from "../../../components/CrudLoading";
import { useMutation } from "@tanstack/react-query";
import { MdOutlineFileDownloadDone } from "react-icons/md";

const PendingTaskRow = ({ submission, refetch, index, statesReload }) => {
  const axiosSecure = useAxiosSecure();
  const { worker_name, amount, task_title, _id, taskId, worker_email } =
    submission || {};

  // accep task
  const { mutateAsync: acceptTask, isPending: accepting } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(`/submit/${_id}`, {
        amount,
        worker_email,
      });

      if (data?.modifiedCount) {
        toast.success("Task accepted!");
        refetch();
        statesReload();
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  // reject task
  const { mutateAsync: rejectTask, isPending:rejecting } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(`/submit/reject/${_id}`, {
        taskId,
      });
      if (data.modifiedCount) {
        toast.success("Rejected Successfully");
        refetch();
        statesReload();
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleAcceptTask = async () => {
    await acceptTask();
  };

  const handleRejectTask = async () => {
    await rejectTask();
  };

  
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{worker_name}</td>
      <td>{task_title.slice(0, 20)}...</td>
      <td>{amount}</td>
      <td>
        <button className="btn btn-xs">View Details</button>
      </td>
      <td className="flex items-center gap-3">
        <button onClick={handleAcceptTask} title="Accept">
          {accepting ? (
            <CrudLoading />
          ) : (
            <MdOutlineFileDownloadDone className="text-main-color" size={24} />
          )}
        </button>
        <button onClick={handleRejectTask} title="Reject">
          {rejecting ? (
            <CrudLoading />
          ) : (
            <RxCross2 className="text-red-500" size={24} />
          )}
        </button>
      </td>
    </tr>
  );
};

export default PendingTaskRow;
