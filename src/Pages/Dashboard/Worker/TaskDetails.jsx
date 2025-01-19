import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DefaultLoading from "../../../components/DefaultLoading";

const TaskDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <DefaultLoading />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-64 lg:h-96 object-cover" />
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
                <span>{date}</span>
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
            <button className="bg-main-color/80 hover:bg-main-color btn">
              Submit Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
