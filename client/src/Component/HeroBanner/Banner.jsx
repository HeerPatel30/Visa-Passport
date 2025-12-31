import React from "react";
import { MoveRight, Globe, FileText, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-slate-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-center bg-cover"
        style={{ 
          backgroundImage: `url('https://images.pexels.com/photos/7235804/pexels-photo-7235804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` 
        }}
      >
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-white/70 md:bg-gradient-to-r md:from-white md:via-white/80 md:to-transparent" />
      </div>
      
      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Tagline */}
          <p className="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-3">
            Trusted Travel Documentation
          </p>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-4">
            Easy Online <br />
            <span className="text-indigo-600">Visa & Passport</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 mb-8 max-w-lg">
            Skip the long queues. Apply for your travel documents from the comfort of your home with our simplified application process.
          </p>

          {/* Traditional Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Visa Button */}
            <button
              onClick={() => navigate("/visaform")}
              className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
            >
              <Plane size={20} />
              <span>Apply for Visa</span>
              <MoveRight size={18} className="opacity-70" />
            </button>

            {/* Passport Button */}
            <button
              onClick={() => navigate("/passportform")}
              className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-slate-300 transition-all transform active:scale-95"
            >
              <FileText size={20} />
              <span>Apply for Passport</span>
              <MoveRight size={18} className="opacity-70" />
            </button>
          </div>

          {/* Tertiary Link */}
          <button 
            onClick={() => navigate("/countries")}
            className="mt-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors group"
          >
            <Globe size={18} className="group-hover:rotate-12 transition-transform" />
            <span>Check visa requirements by country</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;