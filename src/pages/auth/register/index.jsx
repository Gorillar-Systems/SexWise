import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { apiSignUp } from "../../../services/auth";
import undrawImage from "../../../assets/images/register.svg";

const RegisterForm = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [redirect, setRedirect] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    let data = {};
    const formData = new FormData(e.target);

    const password1 = formData.get("password");
    const password2 = formData.get("confirmPassword");
    if (password1 !== password2) {
      toast.error("Passwords do not match!");
      return;
    }

    data.userName = formData.get("userName");
    data.email = formData.get("email");
    data.password = password1;
    data.phoneNumber = formData.get("phoneNumber");
    data.dateOfBirth = formData.get("dateOfBirth");
    data.sex = formData.get("sex");
    data.subscriptionType = formData.get("subscriptionType");

    try {
      setLoading(true);
      console.log(data);
      const res = await apiSignUp(data);
      if (res.status === 201 || res.status === 200) {
        window.localStorage.setItem("sexWiseUser", JSON.stringify(res.data));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data.user,
        });
        const params = new URLSearchParams(location.search);
        const redirecteURL = params.get("redirect");
        if (redirecteURL) navigate(redirecteURL);
        else navigate("/consultation");
        toast.success(`Welcome ${res.data.user.userName}`);
      }
    } catch (error) {
      toast.error("Error creating an account");
      console.log("Error creating account", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg border border-gray-200 
    focus:border-[#F85339] focus:ring-2 focus:ring-[#F85339]/20 focus:outline-none
    transition-all duration-200 ease-in-out
    placeholder:text-gray-400 text-gray-700
    disabled:bg-gray-50 disabled:cursor-not-allowed
  `;

  const labelClasses = "block text-gray-700 font-medium mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Registration Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
              <p className="text-gray-500 mt-2">
                Create your account to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="userName" className={labelClasses}>
                    Username
                  </label>
                  <input
                    className={inputClasses}
                    id="userName"
                    type="text"
                    placeholder="john_doe"
                    name="userName"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    className={inputClasses}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    name="email"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phoneNumber" className={labelClasses}>
                    Phone Number
                  </label>
                  <input
                    className={inputClasses}
                    id="phoneNumber"
                    type="text"
                    placeholder="123-456-7890"
                    name="phoneNumber"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className={labelClasses}>
                    Date of Birth
                  </label>
                  <input
                    className={inputClasses}
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sex" className={labelClasses}>
                    Sex
                  </label>
                  <select
                    className={inputClasses}
                    id="sex"
                    name="sex"
                    disabled={loading}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="subscriptionType" className={labelClasses}>
                    Subscription Type
                  </label>
                  <select
                    className={inputClasses}
                    id="subscriptionType"
                    name="subscriptionType"
                    disabled={loading}
                    required
                  >
                    <option value="One-time">One-time</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="password" className={labelClasses}>
                  Password
                </label>
                <div className="relative">
                  <input
                    className={inputClasses}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    name="password"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className={labelClasses}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className={inputClasses}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    name="confirmPassword"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-full font-semibold text-white transition-all duration-200 ease-in-out ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-main hover:bg-primary-dark active:scale-[0.98]"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="hidden md:block">
            <img
              src={undrawImage}
              alt="Registration illustration"
              className="rounded-2xl object-cover h-[70vh] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
