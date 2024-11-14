import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';

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
      className=" w-full top-0 z-50 bg-white text-primary-main shadow-lg"
    >
      <nav
        ref={navbarRef}
     className="bg-primary-main text-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <NavLink to="/professional">SexWise Pro</NavLink>
        </h1>

        {/* Menu Icon for Mobile */}
        <button onClick={toggleMenu} className="md:hidden text-2xl focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className={`md:flex space-x-8 ${isOpen ? "block" : "hidden"}`}>
          {user ? (
            // If user is logged in, show Dashboard, Jobs, and Logout
            <>
              <NavLink
                to="/professional/dashboard"
                className="block mt-4 md:mt-0 text-white hover:text-gray-300"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/professional/appointments"
                className="block mt-4 md:mt-0 text-white hover:text-gray-300"
              >
                Jobs
              </NavLink>
              <button
                onClick={handleLogout}
                className="block mt-4 md:mt-0 text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            // If no user is logged in, show Login and Sign Up
            <>
              <NavLink
                to="/professional/login"
                className="block mt-4 md:mt-0 text-white hover:text-gray-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/professional/register"
                className="block mt-4 md:mt-0 text-white hover:text-gray-300"
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
