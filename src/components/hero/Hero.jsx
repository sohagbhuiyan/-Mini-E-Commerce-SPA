
import { useState, useEffect } from 'react';
import { slider, slider2 } from "../../Utils/images";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [slider, slider2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [images.length]);

  return (
    <>
   
    <div className="relative w-full h-64 md:h-92 overflow-hidden">
      {/* Sliding images */}
      <div
        className={`absolute w-full h-full transition-transform duration-1000 ease-in-out transform ${currentIndex === 0 ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <img src={images[0]} alt="Slider 1" className="w-full h-full object-cover" />
      </div>

      <div
        className={`absolute w-full h-full transition-transform duration-1000 ease-in-out transform ${currentIndex === 1 ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <img src={images[1]} alt="Slider 2" className="w-full h-full object-cover" />
      </div>

      {/* Circle navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1 h-1 rounded-full cursor-pointer transition-all duration-300 ease-in 
              ${currentIndex === index ? 'bg-gray-500' : 'bg-white'}`}
          />
        ))}
      </div>
      </div>

    </>   
  );
};

export default Hero;