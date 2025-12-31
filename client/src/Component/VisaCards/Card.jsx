import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MoveRight, Globe, GraduationCap, Briefcase, Plane, Home, ShieldCheck } from "lucide-react";

// Asset imports
import card1 from "../../assets/card1.jpeg";
import card2 from "../../assets/card2.avif";
import card3 from "../../assets/card3.avif";
import card4 from "../../assets/card4.avif";
import card5 from "../../assets/card5.avif";
import card6 from "../../assets/card6.avif";

const cardData = [
  { img: card1, title: "Job Visa", desc: "Premium employment pathways for top-tier professionals seeking global career growth.", icon: <Briefcase size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
  { img: card2, title: "Travel Visa", desc: "Swift processing for explorers looking to discover new horizons with family.", icon: <Plane size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
  { img: card3, title: "Work Permit", desc: "Full legal authorization for international employment and business ventures.", icon: <ShieldCheck size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
  { img: card4, title: "Student Visa", desc: "Your gateway to the world's most prestigious educational institutions and degrees.", icon: <GraduationCap size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
  { img: card5, title: "Permanent Residency", desc: "Long-term settlement planning and citizenship paths for global citizens.", icon: <Home size={20} />, color: "text-rose-600", bg: "bg-rose-50" },
  { img: card6, title: "Tourist Visa", desc: "Hassle-free entry permits for leisure travel and short-term cultural visits.", icon: <Globe size={20} />, color: "text-cyan-600", bg: "bg-cyan-50" },
];

const Card = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Background soft glow for extra style */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        
        {/* --- Stylized Split Header --- */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-3/5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col gap-1.5">
                <div className="w-12 h-[3px] bg-red-600 rounded-full" />
                <div className="w-24 h-[3px] bg-indigo-600 rounded-full" />
              </div>
              <h2 className="text-xs font-black text-indigo-600 tracking-[0.4em] uppercase">Specialized Pathways</h2>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Enabling Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 italic">Success Stories.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 text-lg text-slate-500 font-medium leading-relaxed mb-4 border-l-4 border-slate-100 pl-6"
          >
            We bridge the gap between complex visa protocols and your global ambitions with tailor-made legal expertise.
          </motion.p>
        </div>

        {/* --- Stylish Overlap Grid --- */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-20">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative w-full sm:w-[360px] group"
              onClick={() => navigate("/services")}
            >
              {/* Image Layer - Stylish Portrait */}
              <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={card.img} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={card.title} 
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Floating Text Card - The Stylish Part */}
              <div className="absolute -bottom-10 left-6 right-6 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-indigo-100 group-hover:shadow-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12`}>
                    {card.icon}
                  </div>
                  <div className="h-1 w-10 bg-slate-100 rounded-full mt-4 group-hover:bg-indigo-600 transition-colors" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight transition-colors group-hover:text-indigo-600">
                  {card.title}
                </h3>
                
                <p className="text-slate-500 text-[13px] font-semibold leading-relaxed mb-6">
                  {card.desc}
                </p>

                <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] tracking-widest uppercase cursor-pointer">
                  <span>Explore More</span>
                  <MoveRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;