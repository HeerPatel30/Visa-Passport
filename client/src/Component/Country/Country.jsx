import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";

// Asset imports (keeping your existing ones)
import indialogo from "../../assets/india-flag.png";
import auslogo from "../../assets/aus.png";
import irelandlogo from "../../assets/Flag_of_Ireland.svg.png";
import brazillogo from "../../assets/Flag_of_Brazil.svg.png";
import india from "../../assets/india.webp";
import aus from "../../assets/aus-1.avif";
import ireland from "../../assets/ireland.jpg";
import brazil from "../../assets/brazil.avif";

const countries = [
  { name: "India", logo: indialogo, background: india, accent: "text-orange-600", shadow: "hover:shadow-orange-100" },
  { name: "Australia", logo: auslogo, background: aus, accent: "text-blue-600", shadow: "hover:shadow-blue-100" },
  { name: "Ireland", logo: irelandlogo, background: ireland, accent: "text-green-600", shadow: "hover:shadow-green-100" },
  { name: "Brazil", logo: brazillogo, background: brazil, accent: "text-yellow-600", shadow: "hover:shadow-yellow-100" },
];

const Country = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements for Light Theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* --- Section Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
             <div className="h-[2px] w-8 bg-indigo-600" />
             <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase">Global Opportunities</span>
             <div className="h-[2px] w-8 bg-indigo-600" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Immigration & Visa Services <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Across the Globe
            </span>
          </h2>
          
          <p className="max-w-xl text-slate-500 text-lg leading-relaxed">
            Expertly guided pathways to the world's most sought-after destinations. 
            Your future starts with a single step.
          </p>
        </motion.div>

        {/* --- Cards Grid --- */}
        <div className="flex flex-wrap gap-10 justify-center">
          {countries.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative w-[280px] h-[380px] bg-white rounded-[2rem] overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50 transition-all duration-500 ${country.shadow} hover:shadow-2xl border border-slate-100`}
            
            >
              {/* Image Layer with Zoom */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 group-hover:scale-110 opacity-90"
                style={{ backgroundImage: `url(${country.background})` }}
              />
              
              {/* Light Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white group-hover:via-white/10 transition-all duration-500" />

              {/* Top Flag Badge */}
              <div className="absolute top-6 left-6 w-14 h-14 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                <img 
                  src={country.logo} 
                  alt={country.name} 
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Bottom Content Area */}
              <div className="absolute bottom-0 inset-x-0 p-8 pt-20">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{country.name}</h3>
                
                {/* Reveal Text */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-in-out">
                  <p className="text-sm font-bold mb-4 leading-snug backdrop-blur-md bg-white/30 p-2 rounded-lg border border-white/50">
                    Full assistance for student, work, and residency visas.
                  </p>
                </div>

                <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-tighter ${country.accent} group-hover:gap-4 transition-all`}>
                  <span>Explore Now</span>
                  <MoveRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Country;