import { FaRegUser, FaTasks } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const AdminNav = ({design}) => {
  return (
    <>
      <li>
        <NavLink to="admin-home" className={design}>
          <IoHomeOutline size={24} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="manage-users" className={design}>
          <FaRegUser size={24} /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="manage-tasks" className={design}>
          <FaTasks size={24} /> Manage Tasks
        </NavLink>
      </li>
    </>
  );
};

export default AdminNav;