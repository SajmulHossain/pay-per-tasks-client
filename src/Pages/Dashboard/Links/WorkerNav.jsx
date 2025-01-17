/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

const WorkerNav = ({design}) => {
   
  return (
    <>
      <li>
        <NavLink to="worker-home" className={design}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="tasks" className={design}>
          TaskList
        </NavLink>
      </li>
      <li>
        <NavLink
         to="submission" className={design}>
          My Submissions
        </NavLink>
      </li>
      <li>
        <NavLink to="withdraw" className={design}>
          Withdrawals
        </NavLink>
      </li>
    </>
  );
};

export default WorkerNav;