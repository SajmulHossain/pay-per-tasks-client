/* eslint-disable react/prop-types */

import { format } from "date-fns";

const TaskRow = ({ task }) => {
  const { title, date, workers } = task || {};
  return (
    <tr className="text-center">
      <td>{title.slice(0, 20)}...</td>
      <td>{workers}</td>
      <td>{format(new Date(date), "PP")}</td>
      <td className="space-x-2">
        <button className="btn btn-xs">Update</button>
        <button className="btn btn-xs">Delete</button>
      </td>
    </tr>
  );
};

export default TaskRow;
