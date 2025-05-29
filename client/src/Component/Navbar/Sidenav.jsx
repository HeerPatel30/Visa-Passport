import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from "react-icons/hi";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Contact", path: "/contactus" }, // You'll need a Contact page if not already added
  ];

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
            {navItems.map((item) => (
              <li key={item.name} className="px-2 transition duration-300 hover:border-t-2 hover:border-b-2 border-black">
                <Link to={item.path}>{item.name}</Link>
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
            {navItems.map((item) => (
              <li key={item.name} onClick={() => setIsOpen(false)} className="transition duration-300 hover:border-t-2 hover:border-b-2 border-black">
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Sidenav;
