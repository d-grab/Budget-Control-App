import React from "react";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

const HeroContainer = () => {
  return (
    <div className="hero-container mt-1 mb-4 shadow">
      <HeroLeft />
      <HeroRight />
    </div>
  );
};

export default HeroContainer;
