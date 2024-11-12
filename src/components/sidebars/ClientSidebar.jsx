import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { CLIENT_SIDEBAR_LINKS } from "../../constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ClientSidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useSelector((state) => ({ ...state }));

  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("sexwiseUser");
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/auth/login");
  };

  return (
    <div className="h-full bg-[#F4F4F4] border-2 border-primary-light rounded-xl shadow-xl p-6 flex flex-col gap-10">
      <div className="logo flex flex-col justify-center items-center gap-4">
        <Link
          to="/"
          id="logo"
          className="flex flex-col items-center align-middle justify-center"
        >
          <img src={logo} alt="Logo" width={50} />
          {/* <h2 className="text-lg font-semibold text-primary-light">
            Evently
          </h2> */}
        </Link>
        <hr className="border-1 w-full border-gray-300" />
      </div>
      <div className="nav-links flex flex-col gap-4">
        {CLIENT_SIDEBAR_LINKS.map((link, index) => {
          const LinkIcon = link.icon;
          return (
            <NavLink
              to={link.path}
              key={index}
              className={`flex gap-4 items-center align-middle rounded-full hover:bg-gray-200 text-gray-500 ${
                pathname === link.path &&
                "bg-primary-dark !text-white hover:bg-primary-dark"
              } p-2 pl-4 text-md `}
            >
              <LinkIcon size={25} />
              <p>{link.link}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default ClientSidebar;
