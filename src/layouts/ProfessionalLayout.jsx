import { Outlet } from "react-router-dom";
import ProfessionalNavbar from "../components/navbars/ProfessionalNavbar";

const ProfessionalLayout = () => {
  return (
    <div>
      <ProfessionalNavbar />
      <Outlet />
    </div>
  );
};

export default ProfessionalLayout;
