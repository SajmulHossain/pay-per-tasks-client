/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { useState } from "react";

const UserRow = ({ user }) => {
  const [newRole, setNewRole] = useState(user?.role);

  const { image, name, role, coin } = user || {};

  const handleUpdateRole = () => {
    
  }

  return (
    <tr>
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
          <div>
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
          <option value="admin">
            Admin
          </option>
        </select>
      </td>
      <td className="text-center space-x-2">
        <button className="btn">
          <MdDelete size={24} color="red" /> Delete
        </button>
        <button onClick={handleUpdateRole} disabled={newRole === role} className="btn">
          <FcAcceptDatabase size={24} /> Save Change
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
