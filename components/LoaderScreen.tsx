"use client";
import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../public/loader_json/CraftingLoader.json"; // Path to your Lottie animation JSON file

const LoaderScreen: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center">
      <div className="md:w-1/2 md:h-auto">
        <Lottie animationData={loaderAnimation} loop />
      </div>
    </div>
  );
};

export default LoaderScreen;
