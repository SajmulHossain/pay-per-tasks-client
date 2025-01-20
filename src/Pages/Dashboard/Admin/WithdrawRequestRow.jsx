/* eslint-disable react/prop-types */

import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CrudLoading from "../../../components/CrudLoading";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { format } from "date-fns";
import toast from "react-hot-toast";


const WithdrawRequestRow = ({
  withdraw,
  index,
  statesReload,
  withdrawReload,
}) => {
  const axiosSecure = useAxiosSecure();
  const {
    worker_name,
    worker_email,
    withdrawal_coin,
    withdrawal_amount,
    payment_system,
    account_number,
    withdraw_date,
    status,
  } = withdraw || {};

  // approve withdraw
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/withdraw/${id}`, {
        worker_email,
        withdrawal_coin,
      });

      if (data?.modifiedCount) {
        statesReload();
        withdrawReload();
        toast.success("Request Accepted!");
      } else if (!data?.modified) {
        toast.error("You already accepted it!");
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleAcceptWithdraw = async (id) => {
    await mutateAsync(id);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{worker_name}</td>
      <td>{worker_email}</td>
      <td>{withdrawal_coin}</td>
      <td>{withdrawal_amount}$</td>
      <td>{payment_system}</td>
      <td>{account_number}</td>
      <td>{format(new Date(withdraw_date), "PP")}</td>
      <td>
        <span className="capitalize bg-main-color px-4 py-1 rounded-md text-white">
          {status}
        </span>
      </td>
      <td className="flex justify-center items-center">
        <button onClick={() => handleAcceptWithdraw(withdraw?._id)}>
          {isPending ? (
            <CrudLoading />
          ) : (
            <MdOutlineFileDownloadDone className="text-main-color" size={30} />
          )}
        </button>
      </td>
    </tr>
  );
};

export default WithdrawRequestRow;