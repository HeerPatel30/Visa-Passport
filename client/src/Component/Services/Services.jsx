import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { MoveRight, Zap, Shield, Heart, Globe } from "lucide-react";

import dollar from "../../assets/dollar_9731012.png";
import visa from "../../assets/visa_5968248.png";
import time from "../../assets/time_8465102.png";
import speech from "../../assets/speech_795232.png";
import Country from "../Country/Country";

const servicedata = [
  { 
    img: dollar, 
    title: "Cost-Effective", 
    desc: "Premium migration plans designed to fit your budget perfectly without compromising on quality.", 
    color: "from-orange-500 to-amber-400",
    lightBg: "bg-orange-50",
  },
  { 
    img: visa, 
    title: "Visa Assistance", 
    desc: "Expert handling of complex documentation for student, work, and permanent residency success.", 
    color: "from-blue-600 to-cyan-400",
    lightBg: "bg-blue-50",
  },
  { 
    img: time, 
    title: "Quick Processing", 
    desc: "Utilizing cutting-edge digital workflows to speed up embassy approvals and verification.", 
    color: "from-rose-500 to-pink-400",
    lightBg: "bg-rose-50",
  },
  { 
    img: speech, 
    title: "24/7 Support", 
    desc: "Our dedicated consultants are available round-the-clock to resolve your global queries.", 
    color: "from-emerald-500 to-teal-400",
    lightBg: "bg-emerald-50",
  },
  { 
    img: visa, 
    title: "Legal Counsel", 
    desc: "In-house certified immigration lawyers to handle appeals, legalities, and policy changes.", 
    color: "from-violet-600 to-purple-400",
    lightBg: "bg-violet-50",
  },
];

const Services = () => {
  const location = useLocation();
  const isServicePage = location.pathname === "/services";
  const duplicatedData = [...servicedata, ...servicedata];

  return (
    <div className="py-24 bg-[#FDFDFF] relative overflow-hidden">
      {/* --- Aesthetic Background Mesh --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- THE SPLIT LAYOUT HEADER --- */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-24 border-b border-slate-100 pb-16">
          
          {/* Left Side: Heading & Badge */}
          <div className="lg:w-1/2">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm mb-6"
            >
              <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              <p className="text-indigo-600 font-bold tracking-widest text-[10px] uppercase">Our Expertise</p>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
            >
              Tailor-Made <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
                Service Excellence
              </span>
            </motion.h1>
          </div>

          {/* Right Side: Paragraph & CTA link */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 lg:mt-12"
          >
            <p className="text-lg text-slate-500 leading-relaxed font-medium mb-8">
              We bridge the gap between your dreams and global reality. Our specialized immigration 
              frameworks ensure your journey to a new life is smooth, legal, and faster than ever.
            </p>
            
            <div className="flex items-center gap-3 text-indigo-600 font-bold text-sm cursor-pointer group">
               <span>Explore our methodology</span>
               <div className="h-[2px] w-8 bg-indigo-600 transition-all group-hover:w-12" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- INFINITE CAROUSEL --- */}
      <div className="relative flex overflow-hidden py-10">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </motion.div>
      </div>

      {isServicePage && <div className="mt-24"><Country /></div>}
    </div>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <div className="min-w-[340px] h-[460px] relative group mx-2">
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-[3.5rem] blur-3xl transition-all duration-700 scale-90 group-hover:scale-110`} />
      
      <div className="relative h-full w-full bg-white/90 backdrop-blur-md border border-white rounded-[3.5rem] p-10 flex flex-col justify-between shadow-sm group-hover:shadow-2xl group-hover:shadow-indigo-100/30 transition-all duration-500 whitespace-normal group-hover:-translate-y-4">
        
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <div className={`w-20 h-20 ${service.lightBg} rounded-[2rem] flex items-center justify-center border border-white shadow-sm transition-all duration-700 group-hover:rotate-[15deg] group-hover:scale-110`}>
              <img src={service.img} alt="" className="w-12 h-12 object-contain" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">
              {service.title}
            </h3>
            <p className="text-slate-500 leading-relaxed font-semibold text-[15px]">
              {service.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className={`h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-gradient-to-br ${service.color} transition-all duration-500`}>
            <MoveRight size={24} className="text-slate-400 group-hover:text-white transition-colors" />
          </div>
          <p className="text-[10px] font-black tracking-widest text-slate-300 uppercase">Immigration</p>
        </div>
      </div>
    </div>
  );
};

export default Services;