import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAVLINKS } from "../../constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <h3 className="text-2xl font-bold text-blue-600">Sex-Wise</h3>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {NAVLINKS.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className="text-gray-700 hover:text-blue-600"
            >
              {link.link}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
            {NAVLINKS.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.link}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
