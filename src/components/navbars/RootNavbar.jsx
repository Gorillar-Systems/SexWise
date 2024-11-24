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
      className="bg-black glass fixed w-full top-0 z-50 text-primary-main shadow-lg"
    >
      <nav
        ref={navbarRef}
        className={`p-6 w-full mx-auto flex items-center justify-between transition-all duration-300`}
      >
        <div className="flex w-[90%] mx-auto glass2 p-4 rounded-full shadow-xl items-center justify-between">
          {/* Logo */}
          <Link className="text-2xl font-bold flex align-middle items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10" /> SexWise
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVLINKS.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className="text-primary-main text-sm hover:text-primary-dark"
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
                  className="rounded-full px-3 py-2 bg-primary-main text-white hover:bg-primary-dark"
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
              className="text-primary-main focus:outline-none"
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
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40 flex flex-col items-center justify-center">
          <div className="bg-white w-[90%] max-w-sm mx-auto p-8 rounded-lg shadow-lg text-center relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="flex flex-col space-y-4 mt-4">
              {NAVLINKS.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className="text-primary-main text-lg hover:text-primary-dark"
                  onClick={() => setIsOpen(false)}
                >
                  {link.link}
                </NavLink>
              ))}
              {user ? (
                <UserMenu user={user} />
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    to="/auth/login"
                    className="rounded-full border px-4 py-2 hover:bg-primary-dark hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="rounded-full px-3 py-2 bg-primary-main text-white hover:bg-primary-dark"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
