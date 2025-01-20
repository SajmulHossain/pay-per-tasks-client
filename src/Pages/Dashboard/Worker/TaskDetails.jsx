import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DefaultLoading from "../../../components/DefaultLoading";
import toast from "react-hot-toast";
import CrudLoading from "../../../components/CrudLoading";
import useAuth from "../../../hooks/useAuth";
import { format } from "date-fns";
import { useState } from "react";

const TaskDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { data: task = {}, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/task/${id}`);
      return data;
    },
  });

  const {
    title,
    workers,
    amount,
    image,
    date,
    info,
    details,
    buyer,
  } = task || {};

  const {isPending, mutateAsync} = useMutation({
    mutationFn: async(submissionInfo) => {
      const {data} = await axiosSecure.post('/submit', submissionInfo);

      if(data.insertedId) {
        toast.success('Task submitted successfully!');
        navigate('/dashboard/worker-home');
      } else if (data?.inserted) {
        toast.error('You already submitted this.')
      } else {
        toast.error("Submission error!");
      }
    }
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <DefaultLoading />
      </div>
    );
  }


  const handleSubmitTask = async (e) => {
    e.preventDefault();
    setError('');

    const submission_details = e.target.submission_details.value;
    
    if(!submission_details) {
      return setError('Please fill the details!');
    }

    const data = {
      taskId: id,
      worker_email: user?.email,
      worker_name: user?.displayName,
      worker_image: user?.photoURL,
      buyer_email: buyer?.email,amount,
      submission_details,
      submission_date : new Date().toISOString()
    }

    try {
      await mutateAsync(data);
      navigate('/dashboard/tasks')
    } catch {
      toast.error('Something went wrong!')
    } finally {
      document.getElementById("my_modal_1").close();
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={image}
              alt={title}
              className="w-full h-64 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
            <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
              {title}
            </h1>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Task Details
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold text-gray-800">Workers:</span>{" "}
                  <span>{workers}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold text-gray-800">Amount:</span> $
                  <span>{amount}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold text-gray-800">Date:</span>{" "}
                  <span>{format(new Date(date), "PP")}</span>
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Buyer Details
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold text-gray-800">Name:</span>{" "}
                  <span>{buyer?.name}</span>
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Email:</span>{" "}
                  <span>{buyer?.email}</span>
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Have to submit
              </h2>
              <p className="text-gray-600 leading-relaxed">{info}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Details
              </h2>
              <p className="text-gray-600 leading-relaxed">{details}</p>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className="bg-main-color/80 hover:bg-main-color btn"
              >
                Submit Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Submit Task!</h3>
          <div className="py-4">
            <form onSubmit={handleSubmitTask}>
              {
                error && <p className="text-center text-red-700">{error}</p>
              }
              <div className="form-control mb-4">
                <label className="label" htmlFor="submission_details">Submit Details</label>
                <textarea
                  name="submission_details"
                  placeholder="Submit Details"
                  id="submission_details"
                  className="textarea h-40 textarea-bordered"
                  // required
                ></textarea>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_1").close()}
                  className="btn bg-second-color/70 hover:bg-second-color"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn bg-main-color/80 hover:bg-main-color"
                >
                  Submit {isPending && <CrudLoading />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TaskDetails;
