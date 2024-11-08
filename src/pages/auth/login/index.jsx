import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { apiLogin } from "../../../services/auth";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaExclamationCircle } from "react-icons/fa";
import undrawImage from '../../../assets/images/login1.svg';

const Login = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (user) navigate(redirect || "/");
  }, [user]);

  const params = new URLSearchParams(location.search);
  const redirectURL = params.get("redirect");

  useEffect(() => {
    if (redirectURL) setRedirect(redirectURL.toString());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to handle login goes here (e.g send credentials to server)
    let data = {};
    const formData = new FormData(e.target);
    
    data.email = formData.get("email");
    data.password = formData.get("password");

    try {
      setLoading(true);
      const res = await apiLogin(data);
      if (res.status === 201 || res.status === 200) {
        window.localStorage.setItem("sexWiseUser", JSON.stringify(res.data));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data.user,
        });
        if (redirect) {
          navigate(redirect);
        } else navigate("/adverts");
        toast.success(`Welcome back, ${res.data.user.name.split(" ")[0]}! 👋`, {
          position: "top-center",
        });
      }
    } catch (error) {
      if (error.status === 401) {
        toast.error("Invalid email or password", {
          icon: <FaExclamationCircle className="text-red-500" />,
        });
        return console.log("Error signing in", error);
      }
      return console.log("Error signing in", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg border border-gray-200
    focus:border-gray-400 focus:ring-2 focus:ring-gray-200
    transition-all duration-200 ease-in-out
    placeholder:text-gray-400
  `;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={loading}
                    className={`${inputClasses} pl-10`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={loading}
                    className={`${inputClasses} pl-10`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  disabled={loading}
                  className="h-4 w-4 rounded border-gray-300 text-[#F85339] focus:ring-[#F85339]"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary-main hover:text-primary-dark transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full px-4 py-3 rounded-full
                ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary-main hover:bg-primary-dark text-white"
                }
                transition-all duration-200 ease-in-out
                font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F85339]
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="ml-2">Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={
                  redirect
                    ? `/auth/register?redirect=${redirect}`
                    : `/auth/register`
                }
                className="font-medium text-primary-main hover:text-primary-dark transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <div className="max-w-md">
          <img
            src={undrawImage}
            alt="Login illustration"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;