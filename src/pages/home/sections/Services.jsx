import { Link } from "react-router-dom";
import {
  FaHandsHelping,
  FaLock,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";

const Services = () => {
  const features = [
    {
      title: "Professional Counseling",
      description:
        "Expert advice for your sexual health and relationship concerns.",
      link: "/book-counseling",
      icon: FaHandsHelping,
    },
    {
      title: "Safe and Private Consultations",
      description: "Discreet and secure sessions via chat, audio, or video.",
      link: "/book-consultation",
      icon: FaLock,
    },
    {
      title: "Intimacy Products",
      description: "Shop trusted intimacy products with discreet delivery.",
      link: "/shop-products",
      icon: FaShoppingCart,
    },
  ];

  return (
    <div className="rounded-3xl bg-[#FFE1E2] p-8 flex flex-col md:flex-row items-center gap-8">
      {/* Section Title */}
      <h2 className="text-gray-800 text-3xl font-bold mb-8 md:mb-0 w-full md:w-1/3 text-center md:text-left">
        What Are You Looking For?
      </h2>

      {/* Features Grid */}
      <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <Link
              to={feature.link}
              key={index}
              className="p-6 flex flex-col h-auto justify-between gap-4 rounded-3xl shadow-lg bg-gradient-to-br from-primary-light to-primary-main text-white hover:bg-gradient-to-bl hover:from-primary-main hover:to-primary-dark transition-all duration-300 transform hover:scale-105"
            >
              <FeatureIcon className="text-gray-200 text-5xl " />
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              <div className="flex justify-end items-center ">
                <FaArrowRight className="text-white text-2xl " />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
