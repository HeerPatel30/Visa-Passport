import React, { useState } from 'react';
import { HiMenu, HiX } from "react-icons/hi";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gray-200 shadow-md">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div>
          <img src="/assets/react-logo.svg" alt="React logo" className="w-10 h-10 object-contain" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <ul className="flex space-x-6 text-base font-medium">
            {["Home", "About", "Service", "Contact"].map((item) => (
              <li
                key={item}
                className="px-2 cursor-pointer transition duration-300 hover:border-t-2 hover:border-b-2 border-black"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-200 shadow-md border-t border-gray-300">
          <ul className="flex flex-col items-center py-4 space-y-4">
            {["Home", "About", "Service", "Contact"].map((item) => (
              <li
                key={item}
                className="cursor-pointer transition duration-300 hover:border-t-2 hover:border-b-2 border-black"
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
