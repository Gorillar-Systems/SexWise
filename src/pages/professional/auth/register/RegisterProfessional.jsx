import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { apiRegisterProfessional } from "../../../../services/auth";

const RegisterProfessional = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "professional") navigate("/professional");
  }, [user]);

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

    data.fullName = formData.get("fullName");
    data.email = formData.get("email");
    data.password = password1;
    data.phoneNumber = formData.get("phoneNumber");
    data.sex = formData.get("sex");
    data.dateOfBirth = formData.get("dateOfBirth");
    data.licenseNumber = formData.get("licenseNumber");
    data.services = Array.from(formData.getAll("services"));
    // data.mobileMoneyNumber = formData.get("mobileMoneyNumber");
    // data.bankName = formData.get("bankName");
    // data.accountNumber = formData.get("accountNumber");

    try {
      setLoading(true);
      console.log("pro data-->", data);
      const res = await apiRegisterProfessional(data);
      console.log(res.data);
      if (res.status === 201 || res.status === 200) {
        window.localStorage.setItem("sexWiseUser", JSON.stringify(res.data));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data.user,
        });
        navigate("/dashboard/professional/appointments");
        toast.success(`Welcome ${res.data.user.fullName}`);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="container max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Sign Up as a Professional</h2>
          <p className="text-gray-500 mt-2">
            Create your professional account to start offering services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className={labelClasses}>
                Full Name
              </label>
              <input
                className={inputClasses}
                id="fullName"
                type="text"
                placeholder="John Doe"
                name="fullName"
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

          {/* Phone Number and Gender */}
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
              <label htmlFor="dateOfBirth" className={labelClasses}>
                Date of Birth
              </label>
              <input
                className={inputClasses}
                id="dateOfBirth"
                type="date"
                placeholder="Date of Birth"
                name="dateOfBirth"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* License Number and Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="licenseNumber" className={labelClasses}>
                License Number
              </label>
              <input
                className={inputClasses}
                id="licenseNumber"
                type="text"
                placeholder="License Number"
                name="licenseNumber"
                disabled={loading}
                required
              />
            </div>
            <div>
              <label htmlFor="services" className={labelClasses}>
                Services Offered
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="services"
                    value="consultation"
                    className="form-checkbox"
                    disabled={loading}
                  />
                  <span className="ml-2">Consultation</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="services"
                    value="therapy"
                    className="form-checkbox"
                    disabled={loading}
                  />
                  <span className="ml-2">Therapy</span>
                </label>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Payment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mobileMoneyNumber" className={labelClasses}>
                  Mobile Money Number
                </label>
                <input
                  className={inputClasses}
                  id="mobileMoneyNumber"
                  type="text"
                  placeholder="Mobile Money Number"
                  name="mobileMoneyNumber"
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <label htmlFor="bankName" className={labelClasses}>
                  Bank Name
                </label>
                <input
                  className={inputClasses}
                  id="bankName"
                  type="text"
                  placeholder="Bank Name"
                  name="bankName"
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="accountNumber" className={labelClasses}>
                  Bank Account Number
                </label>
                <input
                  className={inputClasses}
                  id="accountNumber"
                  type="text"
                  placeholder="Account Number"
                  name="accountNumber"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
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
    </div>
  );
};

export default RegisterProfessional;
