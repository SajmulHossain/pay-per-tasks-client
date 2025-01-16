
import { MdSpaceDashboard } from "react-icons/md";
import blackLogo from "../../assets/images/black-logo.png";

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

          <div>
            <img src={blackLogo} className="h-12" alt="logo" />
          </div>
        </div>
      </section>
    </header>
  );
};

export default DashboardHeader;
