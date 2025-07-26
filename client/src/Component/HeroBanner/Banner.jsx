import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const imagearray = [
  {
    url: "https://images.pexels.com/photos/7235804/pexels-photo-7235804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "Fast, Easy, Hassle-Free Visa & Passport Solutions!",
    applyLink: "/visaform", // Replace with actual link
  },
  {
    url: "https://images.pexels.com/photos/7009468/pexels-photo-7009468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "Your Journey Begins Here – Trusted Visa & Passport Services.",
    applyLink: "/passportform", // Replace with actual link
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagearray.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagearray.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group z-0 mt-16 md:mt-0">
      {/* Background Image */}
      <div
        style={{ backgroundImage: `url(${imagearray[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative flex flex-col justify-end p-6 sm:p-10 group"
      >
        {/* Text Overlay (Responsive) */}
        {/* Text Overlay (Responsive) */}
        <div className="absolute bottom-16 sm:bottom-14 left-1/2 transform -translate-x-1/2 text-center w-full px-2">
          <div className="bg-black/50 text-white text-sm sm:text-lg md:text-xl font-semibold px-3 py-2 sm:px-4 sm:py-2 rounded-md w-fit mx-auto mb-3 sm:mb-4">
            {imagearray[currentIndex].text}
          </div>
        </div>

        {/* Apply Button (Responsive) */}
        <a
          href={imagearray[currentIndex].applyLink}
          className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-md text-xs sm:text-sm transition duration-300"
        >
          Apply Now
        </a>
      </div>

      {/* Left Arrow */}
      <div
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
        <BsChevronCompactLeft size={30} />
      </div>

      {/* Right Arrow */}
      <div
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={nextSlide}
      >
        <BsChevronCompactRight size={30} />
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imagearray.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`text-xl sm:text-2xl cursor-pointer ${
              slideIndex === currentIndex ? "text-gray-900" : "text-gray-400"
            }`}
            onClick={() => setCurrentIndex(slideIndex)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
