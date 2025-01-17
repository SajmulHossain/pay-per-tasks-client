
import { MdSpaceDashboard } from "react-icons/md";
import blackLogo from "../../assets/images/black-logo.png";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  
  return (
    <header className="py-2 border-y border-main-color">
      <section className="container mx-auto">
        <div className="flex items-center">
          <label
            htmlFor="my-drawer-2"
            className="drawer-button lg:hidden cursor-pointer"
          >
            <MdSpaceDashboard size={30} />
          </label>

          <Link to='/'>
            <img src={blackLogo} className="h-12" alt="logo" />
          </Link>
        </div>
      </section>
    </header>
  );
};

export default DashboardHeader;
