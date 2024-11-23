import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";

const ProfessionalNavbar = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{ height: navbarHeight }}
      className="bg-black glass fixed w-full top-0 z-50  text-primary-main shadow-lg"
    >
      <nav
        ref={navbarRef}
        className={`  p-6  w-full mx-auto flex items-center justify-between py-10 px-20 transition-all duration-300 `}
      >
        <div className=" flex w-[90%] mx-auto  glass2 p-4 rounded-full shadow-xl  items-center justify-between ">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            <NavLink to="/professional">SexWise Pro</NavLink>
          </h1>

          {/* Menu Icon for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Menu */}
          <div className={`md:flex space-x-8 ${isOpen ? "block" : "hidden"}`}>
            {user && user?.role === "professional" ? (
              // If user is logged in, show Dashboard, Jobs, and Logout
              <>
                <NavLink
                  to="/professional/dashboard"
                  className="block mt-4 md:mt-0 text-primary-main hover:text-primary-dark"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/professional/appointments"
                  className="block mt-4 md:mt-0 text-primary-main hover:text-primary-dark"
                >
                  Jobs
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block mt-4 md:mt-0 text-primary-main hover:text-primary-dark"
                >
                  Logout
                </button>
              </>
            ) : (
              // If no user is logged in, show Login and Sign Up
              <>
                <NavLink
                  to="/professional/login"
                  className="block mt-4 md:mt-0 text-primary-main hover:text-primary-dark"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/professional/register"
                  className="block mt-4 md:mt-0 text-primary-main hover:text-primary-dark"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ProfessionalNavbar;
