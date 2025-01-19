/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import './task.css'
import { format } from "date-fns";


const Task = ({task}) => {
  const {_id:id, title, workers, amount, image, date, /**info, details, */ buyer } =
    task || {};
  return (
    <Link
      to={`/dashboard/tasks/details/${id}`}
      className="relative task bg-second-color/10 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-4 overflow-hidden block"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-main-color via-second-color to-main-color opacity-5"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-second-color opacity-20 rounded-full"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-second-color opacity-10 rounded-full"></div>

      <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl text-black font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Remain:</span> <span>{workers}</span>
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Amount:</span> <span>{amount}$</span>
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Last Submit Date:</span>{" "}
        <span>{format(new Date(date), "PP")}</span>
      </p>
      <p className="text-gray-600 mb-3">
        <span className="font-semibold">Buyer:</span> <span>{buyer?.name}</span>
      </p>
      <button className="bg-second-color text-white btn mt-4">
        View Details
      </button>
    </Link>
  );
};

export default Task;