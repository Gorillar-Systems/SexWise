import React from "react";
import Hero from "./sections/Hero";
import "./home.css";
import Features from "./sections/Features";
import Services from "./sections/Services";
import BecomeProfessional from "./sections/BecomeProfessional";

const Home = () => {
  return (
    <div className="px-4 flex flex-col gap-6">
      <Hero />
      <Services />
      <Features />
      <BecomeProfessional />
    </div>
  );
};

export default Home;
