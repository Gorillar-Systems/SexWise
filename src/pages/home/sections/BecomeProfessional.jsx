import React from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaHandshake, FaRocket } from "react-icons/fa";

const BecomeProfessional = () => {
  const benefits = [
    {
      title: "Grow Your Career",
      description:
        "Reach a wider audience and grow your client base with our platform.",
      icon: <FaBriefcase className="text-4xl text-primary-dark" />,
    },
    {
      title: "Flexible Work",
      description:
        "Set your schedule, choose your services, and work on your own terms.",
      icon: <FaHandshake className="text-4xl text-primary-dark" />,
    },
    {
      title: "Fast Onboarding",
      description:
        "Join our network in just a few steps and start offering your expertise.",
      icon: <FaRocket className="text-4xl text-primary-dark" />,
    },
  ];

  return (
    <section className="bg-[#F9F3F3] py-12 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-gray-800 text-3xl font-bold text-center mb-8">
          Become a Professional on SexWise
        </h2>
        <p className="text-gray-600 text-center text-lg mb-10">
          Join a growing network of experts and make a difference in people’s
          lives. Whether you're a therapist, counselor, or educator, SexWise
          empowers you to reach your goals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/become-a-professional"
            className="px-8 py-3 bg-primary-light text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BecomeProfessional;
