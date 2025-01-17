import { NavLink } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const AdminNav = ({design}) => {
  return (
    <>
      <li>
        <NavLink to="buyer-home" className={design}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="add-task" className={design}>
          Add New Task
        </NavLink>
      </li>
      <li>
        <NavLink to="my-tasks" className={design}>
          My Tasks
        </NavLink>
      </li>
      <li>
        <NavLink to="purchase-coin" className={design}>
          Purchase Coin
        </NavLink>
      </li>
    </>
  );
};

export default AdminNav;