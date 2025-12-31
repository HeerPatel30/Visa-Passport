import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import visa from "../../assets/visa-pass.avif";
import { FaMapLocation, FaBookAtlas } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCall } from "react-icons/md";
import Services from "../Services/Services";

const About = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <div className="px-4 py-16 bg-white overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-2 items-center gap-12 lg:gap-16 max-w-[1200px] mx-auto">

        {/* ---------- Image Section: Refined Awesome Look ---------- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full flex justify-center lg:justify-start"
        >
          {/* Main Image with a soft shadow "lift" */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-[12px] border-slate-50 relative z-10">
            <img
              src={visa}
              alt="Visa Services"
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>

          {/* Experience Stat Box: Keeping your '34 Years' but making it POP */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="absolute -bottom-6 right-0 lg:-right-6 z-20 flex flex-col bg-gradient-to-br from-indigo-600 to-blue-700 w-[180px] py-8 rounded-[2.5rem] items-center text-center shadow-2xl border-4 border-white"
          >
            <div className="text-5xl text-white/30 mb-2">
              <FaTicketAlt />
            </div>
            <h1 className="text-4xl font-black text-white leading-none">34</h1>
            <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-[0.2em] mt-2">
              Years of <br/> Experience
            </p>
          </motion.div>
        </motion.div>

        {/* ---------- Text Section ---------- */}
        <div className="w-full">

          {/* Heading: Your original 'Red/Blue lines' but more modern */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-sm font-black text-indigo-600 tracking-[0.3em] uppercase">
              About Us
            </h2>
            <div className="flex flex-col gap-1.5">
              <div className="w-12 h-[3px] bg-red-500 rounded-full" />
              <div className="w-24 h-[3px] bg-indigo-600 rounded-full" />
            </div>
          </div>

          {/* Title & Paragraph */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] mb-6">
              We’re Trusted Immigration <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                Consultant Agency.
              </span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              We provide 100% genuine assistance for all your global mobility needs. 
              Our team ensures faster execution and reliable advice for every step 
              of your visa and passport process.
            </p>
          </div>

          {/* Icons Row: Cleaner & High-Contrast */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 transition-transform group-hover:scale-110 shadow-sm">
                <FaMapLocation className="text-2xl" />
              </div>
              <span className="font-bold text-slate-800 text-sm sm:text-base">
                Best Immigration <br/> Resources
              </span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110 shadow-sm">
                <FaBookAtlas className="text-2xl" />
              </div>
              <span className="font-bold text-slate-800 text-sm sm:text-base">
                Return Visas <br/> Available
              </span>
            </div>
          </div>

          {/* Checkmarks & Call: Professional & Punchy */}
          <div className="space-y-4 mb-10">
            {["Offer 100% Genuine Assistance", "Faster & Reliable Execution", "Accurate & Expert Advice"].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-2xl text-green-500" />
                <span className="font-bold text-slate-700 text-sm sm:text-base">{text}</span>
              </div>
            ))}
          </div>

          {/* Call CTA: Making the phone number stand out */}
          <div className="flex items-center gap-5 p-2 pr-8 bg-slate-50 w-fit rounded-full border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <MdCall size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Have any questions?</p>
              <p className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">+0123 456 7890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show services only on About page */}
      {isAboutPage && <div className="mt-24"><Services /></div>}
    </div>
  );
};

export default About;