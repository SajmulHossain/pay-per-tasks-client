/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import swalModal from "../../../utils/sweetModal";
import axios from "axios";

const UserRow = ({ user, refetch, index }) => {
  const [newRole, setNewRole] = useState(user?.role);
  const axiosSecure = useAxiosSecure();

  const { image, name, role, coin, _id, imgDeleteUrl, email } = user || {};

  const handleUpdateRole = async email => {
    try {
     await axiosSecure.patch(`/user/${email}`, {newRole});
     refetch();
     toast.success('Role Update Role')
    } catch{
      toast.error('Something went wrong');
    }
  }

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/user/${id}`);
          refetch();
          swalModal();

          if (imgDeleteUrl) {
            try {
              await axios(imgDeleteUrl);
            } catch {
              toast.error("Something Error With Deleting the photo!");
            }
          }
        } catch {
          toast.error("Something Went Wrong");
        }
      }
    });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                referrerPolicy="no-referrer"
                src={image}
                alt={`${name}'s photo`}
              />
            </div>
          </div>
          <div className="text-left">
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50 capitalize">{role}</div>
          </div>
        </div>
      </td>
      <td className="text-center">{coin}</td>
      <td className="text-center">
        <select
          defaultValue={role}
          onChange={(e) => setNewRole(e.target.value)}
          className="select select-bordered"
          name="role"
        >
          <option value="" disabled>
            Update Role
          </option>
          <option value="buyer">Buyer</option>
          <option value="worker">Worker</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td className="text-center flex justify-center gap-2">
        <button onClick={() => handleDeleteUser(_id)} className="btn">
          <MdDelete size={24} color="red" /> Delete
        </button>
        <button
          onClick={() => handleUpdateRole(email)}
          disabled={newRole === role}
          className="btn"
        >
          <FcAcceptDatabase size={24} /> Save Change
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
