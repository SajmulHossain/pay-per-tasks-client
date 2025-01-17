import { NavLink } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const AdminNav = ({design}) => {
  return (
    <>
      <li>
        <NavLink to="admin-home" className={design}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="manage-users" className={design}>
          Add New Task
        </NavLink>
      </li>
      <li>
        <NavLink to="manage-tasks" className={design}>
          My Tasks
        </NavLink>
      </li>
    </>
  );
};

export default AdminNav;