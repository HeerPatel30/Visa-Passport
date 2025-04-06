import React, { useState } from 'react';
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from 'framer-motion';

const menuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-gray-200 p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      {/* Logo */}
      <div>
        <img src="/assets/react-logo.svg" alt="React logo" className="w-12" />
      </div>

      {/* Desktop Nav (Hidden on Small Screens) */}
      <div className="hidden md:flex">
        <ul className="flex space-x-6">
          {["Home", "About", "Service", "Contact"].map((item) => (
            <li
              key={item}
              className="px-2 cursor-pointer transition-all duration-300 
                         hover:border-t-2 hover:border-b-2 border-black border-solid"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Shown when `isOpen` is true) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-200 shadow-md md:hidden z-50">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {["Home", "About", "Service", "Contact"].map((item) => (
              <li
                key={item}
                className="cursor-pointer transition-all duration-300 
                           hover:border-t-2 hover:border-b-2 border-black border-solid"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Sidenav;