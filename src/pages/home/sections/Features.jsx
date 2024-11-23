import React from "react";
import { Link } from "react-router-dom";
import {
  FaLock,
  FaUserSecret,
  FaVideo,
  FaShareSquare,
  FaMobileAlt,
  FaGlobe,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      title: "Highly Secured Platform",
      description:
        "Your data is safe with us. End-to-end encryption ensures your privacy.",
      icon: <FaLock className="text-4xl text-primary-dark" />,
    },
    {
      title: "Anonymity Feature",
      description:
        "Engage without revealing your identity. Your safety, your choice.",
      icon: <FaUserSecret className="text-4xl text-primary-dark" />,
    },
    {
      title: "Live Chat with Video",
      description:
        "Connect in real-time via chat or video with trusted professionals.",
      icon: <FaVideo className="text-4xl text-primary-dark" />,
    },
    {
      title: "Resource Sharing",
      description: "Access educational materials and share resources securely.",
      icon: <FaShareSquare className="text-4xl text-primary-dark" />,
    },
    {
      title: "Mobile Optimized",
      description:
        "Enjoy a seamless experience on any device, anytime, anywhere.",
      icon: <FaMobileAlt className="text-4xl text-primary-dark" />,
    },
    {
      title: "Global Access",
      description:
        "Reach expert support and resources from anywhere in the world.",
      icon: <FaGlobe className="text-4xl text-primary-dark" />,
    },
  ];

  return (
    <section className="bg-[#F1EFEE] rounded-3xl py-12 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-gray-800 text-3xl font-bold text-center mb-10">
          Why Choose SexWise?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center text-sm mb-4">
                {feature.description}
              </p>
              <div className="text-center">
                <Link
                  to="/features"
                  className="inline-block px-6 py-2 bg-primary-light text-white font-semibold rounded-full shadow hover:bg-primary-dark transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
