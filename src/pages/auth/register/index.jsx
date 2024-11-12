import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiSignUp } from "../../../services/auth";
import undrawImage from '../../../assets/images/login4.png';

const Register = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [withVendorRole, setWithVendorRole] = useState(false);
  const [redirect, setRedirect] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) navigate(redirect || "/adverts");
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
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    data.email = formData.get("email");
    data.password = password1;
    data.name = `${firstName} ${lastName}`;
    if (withVendorRole) {
      data.businessName = formData.get("businessName");
      data.businessEmail = formData.get("businessEmail");
      data.businessPhone = formData.get("businessPhone");
    }
    data.role = role;

    try {
      setLoading(true);
      const res = await apiSignUp(data);
      if (res.status === 201 || res.status === 200) {
        window.localStorage.setItem("eventlyUser", JSON.stringify(res.data));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data.user,
        });
        const params = new URLSearchParams(location.search);
        const redirecteURL = params.get("redirect");
        if (redirecteURL) navigate(redirecteURL);
        else navigate("/adverts");
        toast.success(`Welcome ${res.data.user.name.split(" ")[0]}`);
      }
    } catch (error) {
      toast.error("Error creating an account");
      console.log("Error creating account", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    if (e.target.checked) setRole("vendor");
    else setRole("user");
    setWithVendorRole(e.target.checked);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Left side - Registration Form */}
          <div className="w-full md:w-1/2 max-w-xl bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Join Evently</h2>
              <p className="text-gray-500 mt-2">Create your account to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className={labelClasses}>
                    First Name
                  </label>
                  <input
                    className={inputClasses}
                    id="firstName"
                    type="text"
                    placeholder="John"
                    name="firstName"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClasses}>
                    Last Name
                  </label>
                  <input
                    className={inputClasses}
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    disabled={loading}
                    required
                  />
                </div>
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
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="role"
                  name="role"
                  onChange={handleRoleChange}
                  disabled={loading}
                  className="w-4 h-4 rounded border-gray-300 text-[#F85339] focus:ring-[#F85339]"
                />
                <label htmlFor="role" className="text-gray-700 font-medium">
                  Register as a vendor
                </label>
              </div>

              {withVendorRole && (
                <div className="space-y-4 border-t border-gray-200 pt-4">
                  <div>
                    <label htmlFor="businessName" className={labelClasses}>
                      Business Name
                    </label>
                    <input
                      className={inputClasses}
                      id="businessName"
                      type="text"
                      placeholder="Your Business Name"
                      name="businessName"
                      disabled={loading}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="businessEmail" className={labelClasses}>
                      Business Email
                    </label>
                    <input
                      className={inputClasses}
                      id="businessEmail"
                      type="email"
                      placeholder="business@example.com"
                      name="businessEmail"
                      disabled={loading}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="businessPhone" className={labelClasses}>
                      Business Phone
                    </label>
                    <input
                      className={inputClasses}
                      id="businessPhone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      name="businessPhone"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>
              )}

              <button
                className={`
                  w-full py-3 px-4 rounded-lg font-semibold text-white
                  transition-all duration-200 ease-in-out
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#F85339] hover:bg-[#F85339]/90 active:scale-[0.98]'}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F85339]/80
                `}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="hidden md:block w-1/2 max-w-xl bg-white rounded-2xl shadow-xl p-8">
            <img
              src={undrawImage}
              alt="Registration illustration"
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
