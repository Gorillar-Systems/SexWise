import { Outlet, ScrollRestoration } from "react-router-dom";
import ProfessionalSidebar from "../components/sidebars/ProfessionalSidebar";

const ProfessionalDashboardLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="w-72 fixed top-0 left-0 h-full overflow-auto p-4 bg-background-light ">
        <ProfessionalSidebar />
      </div>
      <div className="ml-72  overflow-auto bg-background-light ">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfessionalDashboardLayout;
