/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { Link } from "react-router-dom";

const TaskRow = ({ task, index }) => {
  const { title, date, workers, _id } = task || {};
  return (
    <tr
      className={`${index % 2 ? "bg-main-color/30" : "bg-second-color/30"} text-center`}
    >
      <td>{title.slice(0, 20)}...</td>
      <td>{workers}</td>
      <td>{format(new Date(date), "PP")}</td>
      <td className="space-x-2">
        <Link to={`/dashboard/update-task/${_id}`} className="btn btn-xs bg-green-500 hover:bg-green-700 text-white">
          Update
        </Link>
        <button className="btn btn-xs bg-red-500 hover:bg-red-700 text-white">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
