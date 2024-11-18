/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { FaRegUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null); // Ref to track the dropdown

  // Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("sexwiseUser");
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/auth/login");
  };

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* User button */}
      <button
        className="flex align-middle gap-2 items-center text-gray-800"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown on click
      >
        <FaRegUserCircle />
        <p>{user.name}</p>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-2">
            <Link to="/dashboard">
              <li className="px-4 py-2 hover:bg-gray-100">My Dashboard</li>
            </Link>

            <li className="px-4 py-2 hover:bg-gray-100">
              <button onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
