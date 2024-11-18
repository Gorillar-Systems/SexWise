import { useSelector } from "react-redux";
import HeroBg from "../../../assets/images/heroBg.jpg";
import {Link} from 'react-router-dom'

const Hero = () => {
  const {user }= useSelector((state) => ({ ...state }));  
  return (
    <div
      id="hero-section"
      className="h-[88vh] flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
     
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"></div>

      <div className="relative text-center text-white px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Your Journey to Better Sexual Health Starts Here
        </h1>
        <p className="mt-4 text-lg md:text-xl font-light">
          Empowering you with knowledge, support, and expert care in a judgment-free space.
        </p>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <Link to={user? "/consultation":"/auth/register"} className="px-6 py-3 bg-primary-main hover:bg-primary-dark text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105">
            Get Started
          </Link>
          <button className="px-6 py-3 bg-white text-primary-main hover:text-primary-dark font-semibold rounded-full shadow-md transition-transform transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
