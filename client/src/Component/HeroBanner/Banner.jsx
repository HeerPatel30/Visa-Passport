import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const imagearray = [
  {
    url: "https://images.pexels.com/photos/7235804/pexels-photo-7235804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Global Mobility",
    subtitle: "Fast, Easy, Hassle-Free Visa & Passport Solutions!",
    applyLink: "/visaform",
    color: "from-indigo-600 to-blue-500"
  },
  {
    url: "https://images.pexels.com/photos/7009468/pexels-photo-7009468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Seamless Travel",
    subtitle: "Your Journey Begins Here – Trusted Visa & Passport Services.",
    applyLink: "/passportform",
    color: "from-blue-600 to-cyan-500"
  },
];

const Banner = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagearray.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === imagearray.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[600px] md:h-[750px] overflow-hidden bg-slate-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ backgroundImage: `url(${imagearray[currentIndex].url})` }}
          className="absolute inset-0 bg-center bg-cover"
        >
          {/* Subtle Overlay Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent" />
          
          {/* Content Container */}
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[2px] w-8 bg-indigo-600" />
                <p className="text-indigo-600 font-bold tracking-[0.3em] text-xs uppercase">
                  {imagearray[currentIndex].title}
                </p>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 drop-shadow-sm">
                Unlock Your <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${imagearray[currentIndex].color}`}>
                  Global Future
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-lg">
                {imagearray[currentIndex].subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={imagearray[currentIndex].applyLink}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-200 transition-all"
                >
                  Start Application <MoveRight size={20} />
                </motion.a>

                <button onClick={() => navigate("/countries")} className="bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-white transition-all">
                  View Countries

                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modern Navigation Arrows */}
      <div className="absolute bottom-12 right-12 flex gap-4 z-10">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center bg-white/50 backdrop-blur-md text-slate-800 hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
        >
          <BsChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center bg-white/50 backdrop-blur-md text-slate-800 hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
        >
          <BsChevronRight size={20} />
        </button>
      </div>

      {/* Progress Line Indicators */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 flex gap-1 px-1">
        {imagearray.map((_, index) => (
          <div
            key={index}
            className={`h-full flex-1 rounded-t-full transition-all duration-500 ${
              index === currentIndex ? "bg-indigo-600" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;