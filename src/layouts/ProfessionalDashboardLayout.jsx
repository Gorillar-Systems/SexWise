import { Outlet } from "react-router-dom";
import ProfessionalSidebar from "../components/sidebars/ProfessionalSidebar";

const ProfessionalDashboardLayout = () => {
  return (
    <div>
      ProfessionalDashboardLayout
      <ProfessionalSidebar />
      <Outlet />
    </div>
  );
};

export default ProfessionalDashboardLayout;
