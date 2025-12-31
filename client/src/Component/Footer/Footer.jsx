import React from "react";
import { motion } from "framer-motion";
import { 
  MdLocationPin, 
  MdEmail, 
  MdKeyboardArrowRight, 
  MdAccessTimeFilled 
} from "react-icons/md";
import { 
  FaPhone, 
  FaInstagram, 
  FaFacebook, 
  FaWhatsapp, 
  FaCopyright,
  FaHeart
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0f172a] pt-12 overflow-hidden text-left">
      {/* Background decoration - reduced opacity to keep it subtle */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[200px] h-[200px] bg-indigo-500 rounded-full blur-[80px]" />
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-repeat opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Reduced gap from 12 to 8, and pb from 16 to 10 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* 1. Brand & Contact Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-black text-white tracking-tighter">
              VISTA<span className="text-indigo-500">PASS</span>
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Your trusted partner for seamless global transitions. Expert guidance for your international journey.
            </p>
            <ul className="space-y-2.5">
              <ContactLink icon={<MdLocationPin size={18}/>} text="123 Main Street, Mumbai, India" />
              <ContactLink icon={<MdEmail size={18}/>} text="support@vistapass.com" />
              <ContactLink icon={<FaPhone size={16}/>} text="+91 9876543210" />
            </ul>
          </div>

          {/* 2. Opening Hours */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <MdAccessTimeFilled className="text-indigo-500" /> Timings
            </h3>
            <div className="space-y-3">
              <div className="group">
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Mon - Fri</p>
                <p className="text-white text-sm font-medium">09:00 am - 07:00 pm</p>
              </div>
              <div className="group">
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Saturday</p>
                <p className="text-white text-sm font-medium">10:00 am - 05:00 pm</p>
              </div>
            </div>
          </div>

          {/* 3. Quick Links / Services */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Services</h3>
            <ul className="space-y-2">
              {["Visa Process", "Passport Process", "Consultation", "Legal Counsel"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white flex items-center gap-1 group transition-all text-xs">
                    <MdKeyboardArrowRight className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Social Connect */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Stay Connected</h3>
            <div className="flex gap-3 mt-2">
              <SocialIcon icon={<FaFacebook />} color="hover:bg-blue-600" />
              <SocialIcon icon={<FaInstagram />} color="hover:bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500" />
              <SocialIcon icon={<FaWhatsapp />} color="hover:bg-green-500" />
            </div>
            <p className="text-slate-500 text-[11px] mt-4 leading-relaxed italic">
              Follow for latest updates & success stories.
            </p>
          </div>

        </div>

        {/* --- Bottom Copyright Bar - Reduced py from 8 to 5 --- */}
        <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-500 text-[10px]">
          <div className="flex items-center gap-1.5">
            <FaCopyright className="text-xs" />
            <p>{currentYear} <span className="text-white font-bold">Vistapass</span>. All Rights Reserved.</p>
          </div>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-block"
            >
              <FaHeart className="text-red-500 mx-0.5" />
            </motion.span>
            <span>by</span>
            <span className="text-white hover:text-indigo-400 cursor-pointer transition-colors ml-0.5 font-bold tracking-tight">
              Heer Patel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

const ContactLink = ({ icon, text }) => (
  <li className="flex items-center gap-2 text-slate-400 group cursor-pointer hover:text-white transition-colors">
    <span className="text-indigo-500 group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-[13px]">{text}</span>
  </li>
);

const SocialIcon = ({ icon, color }) => (
  <motion.div 
    whileHover={{ y: -3, rotate: 5 }}
    className={`w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-white text-lg cursor-pointer transition-all duration-300 ${color} border border-slate-700 shadow-md`}
  >
    {icon}
  </motion.div>
);

export default Footer;