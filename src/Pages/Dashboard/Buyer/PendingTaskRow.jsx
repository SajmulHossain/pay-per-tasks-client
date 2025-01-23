/* eslint-disable react/prop-types */
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import CrudLoading from "../../../components/CrudLoading";
import { useMutation } from "@tanstack/react-query";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";

const PendingTaskRow = ({ submission, refetch, index, statesReload }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    worker_name,
    amount,
    task_title,
    _id,
    taskId,
    worker_email,
    worker_image,
    submission_date, 
    submission_details,
    info
  } = submission || {};

  // accep task
  const { mutateAsync: acceptTask, isPending: accepting } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(`/submit/${_id}`, {
        amount,
        worker_email,
        buyer_name: user?.displayName,
        task_title,
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
        worker_email,
        buyer_name: user?.displayName,
        task_title,
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
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{worker_name}</td>
        <td>{task_title.slice(0, 20)}...</td>
        <td>{amount}</td>
        <td>
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="btn btn-xs"
          >
            View Submission
          </button>
        </td>
        <td className="flex items-center gap-3 justify-center">
          <button onClick={handleAcceptTask} title="Accept">
            {accepting ? (
              <CrudLoading />
            ) : (
              <MdOutlineFileDownloadDone
                className="text-main-color"
                size={24}
              />
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
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl py-2 border-b border-second-color">
            Submission Details
          </h3>
          <div className="text-left text-base py-4">
            <div className="flex gap-2 items-center border border-main-color p-4 rounded-md mb-4">
              <div>
                <img
                  src={worker_image}
                  referrerPolicy="no-referrer"
                  className="h-20 w-20 rounded-full"
                  alt={`${worker_name}'s image`}
                />
              </div>
              <div>
                <h3 className="font-semibold text-xl">{worker_name}</h3>
                <p className="text-sm italic">{worker_email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="flex flex-col gap-1">
                <span className="font-semibold ">Task Title</span>
                <span className="text-gray-600">{task_title}</span>
              </p>
              <p className="flex flex-col gap-1">
                <span className="font-semibold ">Payment Amount</span>
                <span className="text-gray-600">{amount}$</span>
              </p>
              <p className="flex flex-col gap-1">
                <span className="font-semibold ">Submission Date</span>
                <span className="text-gray-600">
                  {format(new Date(submission_date), "PP")}
                </span>
              </p>
              <p className="flex flex-col gap-1">
                <span className="font-semibold ">Submission Info</span>
                <span className="text-gray-600">{info}</span>
              </p>
              <p className="flex flex-col gap-1">
                <span className="font-semibold ">Details</span>
                <span className="text-gray-600">{submission_details}</span>
              </p>

              <div>
                <button
                  onClick={() => document.getElementById("my_modal_3").close()}
                  className="btn w-full bg-second-color/80 hover:bg-second-color hover:text-white hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PendingTaskRow;
