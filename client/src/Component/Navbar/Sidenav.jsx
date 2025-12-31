import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Track Status", path: "/search" },
    { name: "Contact", path: "/contactus" },
  ];

  return (
    <nav 
      className={`w-full fixed top-0 left-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 max-w-screen-2xl mx-auto">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200"
          >
             <span className="font-black text-xl tracking-tighter">V</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">
              VISTA<span className="text-indigo-600">PASS</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-1">
            International Travel Registry
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center p-1 bg-slate-100/50 backdrop-blur-md rounded-full border border-white/50">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name} className="relative">
                  <Link 
                    to={item.path} 
                    className={`relative z-10 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? "text-white" : "text-slate-600 hover:text-indigo-600"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-indigo-600 rounded-full -z-10 shadow-md shadow-indigo-200"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* <Link 
            to="/login" 
            className="group relative px-7 py-3 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest overflow-hidden transition-all hover:bg-indigo-600 active:scale-95 shadow-lg shadow-slate-200"
          >
            <span className="relative z-10">Sign In</span>
            <motion.div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link> */}
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
           <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-900 px-4 py-2 bg-slate-100 rounded-full">
             Login
           </Link>
           <button 
             onClick={() => setIsOpen(!isOpen)} 
             className="w-10 h-10 flex items-center justify-center bg-white shadow-sm border border-slate-100 rounded-xl text-slate-900"
           >
             {isOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 shadow-2xl"
          >
            <ul className="flex flex-col p-8 gap-3">
              {navItems.map((item, idx) => (
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.name}
                >
                  <Link 
                    to={item.path} 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors group"
                  >
                    <span className="font-black text-sm uppercase tracking-widest text-slate-900 group-hover:text-indigo-600">
                      {item.name}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                       <HiMenuAlt3 size={14} className="text-indigo-600" />
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Sidenav;