import { Outlet, ScrollRestoration } from "react-router-dom";
import ClientSidebar from "../components/sidebars/ClientSidebar";

const ClientDashboardLayout = () => {
  return (
    <div className="main-body flex bg-background-light px-5 py-5">
      {/* Side Navigation */}
      <ScrollRestoration />
      <div className="w-72 fixed top-0 left-0 h-full overflow-auto p-4 bg-background-light ">
        <ClientSidebar />
      </div>

      {/* Main Views */}
      <div className="ml-72 w-full  overflow-auto bg-background-light ">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientDashboardLayout;
