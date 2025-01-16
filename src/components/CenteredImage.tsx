// src/components/CenteredImage.tsx
import React, { useState, useEffect } from "react";

interface CenteredImageProps {
  src: string;
  alt: string;
  duration?: number; // Duration in milliseconds
}

const CenteredImage: React.FC<CenteredImageProps> = ({
  src,
  alt,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Set hidden state after the duration
    }, duration);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [duration]);

  return (
    <div className={`FlagLogoDiv ${!isVisible ? "hidden" : ""}`}>
      <img src={src} alt={alt} className="FlagLogo" />
    </div>
  );
};

export default CenteredImage;
