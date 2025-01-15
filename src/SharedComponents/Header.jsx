import { Link, NavLink } from "react-router-dom";
import blackLogo from "../assets/images/black-logo.png";

const Header = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    </>
  );
  return (
    <header className="backdrop-blur-3xl sticky z-50 top-0 border-y border-main-color">
      <div className="navbar p-0 max-w-screen-xl px-4 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img src={blackLogo} className="w-36" alt="logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-4">
          <div className="join">
            <Link to='/login' className="btn join-item bg-second-color text-white">
              Login
            </Link>
            <Link className="btn join-item bg-second-color text-white">
              Register
            </Link>
            <Link className="btn join-item bg-main-color">
              Join As Developer
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
