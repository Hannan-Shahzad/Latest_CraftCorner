

import React from "react";

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center">
      <div className="w-full h-full"> {/* Set a smaller width and height */}
        <video
          src="/SplashVideo.mp4" // Path to your video file
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
