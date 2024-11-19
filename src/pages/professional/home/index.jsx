import React from "react";
import { useNavigate } from "react-router-dom";
import professionalBg from "../../../assets/images/professionalBg.jpg";

const ProfessionalHome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${professionalBg})`,
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-600/60"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 flex flex-col items-center text-center text-white">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome Professionals!
        </h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Join our platform and connect with clients seeking your expertise.  
          Whether you're a therapist, counselor, or consultant, we provide a space for you to grow your career and make an impact.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-col md:flex-row gap-6">
          <button
            onClick={() => navigate("/professional/signup")}
            className="px-6 py-3 bg-white text-primary-main hover:bg-gray-200 font-semibold rounded-lg shadow-md transition transform hover:scale-105"
          >
            Sign Up as a Professional
          </button>
          <button
            onClick={() => navigate("/jobs")}
            className="px-6 py-3 bg-primary-main hover:bg-primary-dark font-semibold rounded-lg shadow-md transition transform hover:scale-105"
          >
            Find Jobs
          </button>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md text-gray-700">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Flexible Opportunities</h3>
            <p>
              Choose jobs that suit your schedule and expertise. Work on your terms, when you want.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-gray-700">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Diverse Clients</h3>
            <p>
              Connect with clients from various backgrounds looking for professional guidance.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-gray-700">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Grow Your Career</h3>
            <p>
              Gain visibility, expand your portfolio, and make a meaningful impact on people's lives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHome;
