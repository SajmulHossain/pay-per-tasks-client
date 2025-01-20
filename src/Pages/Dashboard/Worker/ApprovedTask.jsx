/* eslint-disable react/prop-types */
const ApprovedTask = ({ task, index }) => {
  const {title, amount, buyer_name, status} = task || {}

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{amount}</td>
      <td>{buyer_name}</td>
      <td>
        <span className="capitalize bg-main-color/80 px-4 py-1 rounded text-white">{status}</span>
      </td>
    </tr>
  );
};

export default ApprovedTask;
