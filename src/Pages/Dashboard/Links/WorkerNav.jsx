/* eslint-disable react/prop-types */
import { BsListTask } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { PiHandWithdraw } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';

const WorkerNav = ({design}) => {
   
  return (
    <>
      <li>
        <NavLink to="worker-home" className={design}>
          <IoHomeOutline /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="tasks" className={design}>
          <BsListTask /> TaskList
        </NavLink>
      </li>
      <li>
        <NavLink to="submission" className={design}>
          <FaTasks /> My Submissions
        </NavLink>
      </li>
      <li>
        <NavLink to="withdraw" className={design}>
          <PiHandWithdraw /> Withdrawals
        </NavLink>
      </li>
    </>
  );
};

export default WorkerNav;