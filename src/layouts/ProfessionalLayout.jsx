import { Outlet } from "react-router-dom";
import ProfessionalNavbar from "../components/navbars/ProfessionalNavbar";

const ProfessionalLayout = () => {
  return (
    <div>
      <div className="flex flex-col gap-6 ">
        <ProfessionalNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default ProfessionalLayout;
