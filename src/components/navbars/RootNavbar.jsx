import { useRef, useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { NAVLINKS } from "../../constants";
import { useSelector } from "react-redux";
import UserMenu from "./components/UserMenu";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const { pathname } = location;

  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > navbarHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarHeight]);

  return (
    <div
      style={{ height: navbarHeight }}
      className=" w-full top-0 z-50 bg-white text-primary-main shadow-lg"
    >
      <nav
        ref={navbarRef}
        className={`container bg-white fixed mx-auto flex items-center justify-between py-4 px-4 transition-all duration-300 `}
      >
        <Link className="text-2xl font-bold flex align-middle items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10" /> SexWise
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAVLINKS.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className="text-primary-main
              hover:text-primary-dark"
            >
              {link.link}
            </NavLink>
          ))}
          {user ? (
            <UserMenu user={user} />
          ) : (
            <div className="flex gap-3">
              <Link
                to="/auth/login"
                className="rounded-full border px-4 py-2 hover:bg-primary-dark hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="rounded-full  px-3 py-2 bg-primary-main text-white hover:bg-primary-dark "
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary-mainfocus:outline-none"
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
          <div className="md:hidden flex flex-col space-y-4 mt-4 bg-white p-4 rounded shadow-md">
            {NAVLINKS.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className="text-primary-main hover:text-primary-dark"
                onClick={() => setIsOpen(false)}
              >
                {link.link}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
      <div style={{ height: navbarHeight }} />
    </div>
  );
};

export default Navbar;
