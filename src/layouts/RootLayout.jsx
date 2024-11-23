import { Outlet, ScrollRestoration } from "react-router-dom";
import RootNavbar from "../components/navbars/RootNavbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <RootNavbar />
      <div className=" flex flex-col gap-6 ">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
