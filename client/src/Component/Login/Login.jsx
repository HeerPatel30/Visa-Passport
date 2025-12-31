import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import loginBg from "../../assets/login.webp";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({ code: "", password: "" });
  const [notification, setNotification] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://visa-passport.onrender.com/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formdata)
      });

      const ResponseBody = await response.json();

      if (ResponseBody.status === 200) {
        localStorage.setItem("token", response.headers.get("token"));
        localStorage.setItem("uid", response.headers.get("uid"));
        localStorage.setItem("unqkey", response.headers.get("unqkey"));

        setNotification({ type: "success", message: "Access Granted. Redirecting..." });
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setNotification({ type: "error", message: ResponseBody.message || "Invalid Admin Credentials" });
      }
    } catch (error) {
      setNotification({ type: "error", message: "Connection failed. Please check server." });
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden">
      
      {/* --- Left Side: Cinematic Image & Branding --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <img 
          src={loginBg} 
          alt="Immigration" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent" />
        
        <div className="relative z-10 p-16 flex flex-col justify-between w-full">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-lg">
               <span className="font-black text-xl">V</span>
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">
              VISTA<span className="text-indigo-400">PASS</span>
            </span>
          </Link>

          <div className="max-w-md">
            <h2 className="text-5xl font-black text-white leading-tight mb-6">
              Empowering Global <br /> <span className="text-indigo-400">Ambitions.</span>
            </h2>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed">
              Log in to the administrative portal to manage global transitions and visa registries securely.
            </p>
          </div>

          <div className="flex items-center gap-3 text-white/60 text-sm font-bold tracking-widest uppercase">
            <ShieldCheck size={20} className="text-indigo-400" />
            Secure Admin Environment
          </div>
        </div>
      </div>

      {/* --- Right Side: Clean Login Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Please enter your administrator details.</p>
          </div>

          {notification.message && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${
                notification.type === "success" 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                : "bg-rose-50 text-rose-700 border border-rose-100"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${notification.type === "success" ? "bg-emerald-500" : "bg-rose-500"}`} />
              {notification.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Admin Code</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input
                  type="text"
                  name="code"
                  value={formdata.code}
                  onChange={handleChange}
                  placeholder="EMP-001"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-indigo-600 focus:bg-white transition-all font-semibold text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-indigo-600 focus:bg-white transition-all font-semibold text-slate-900"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2"
            >
              Authenticate <ArrowRight size={18} />
            </motion.button>
          </form>

          <p className="mt-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            Internal Use Only • Vistapass Registry
          </p>
        </motion.div>
      </div>
    </div>
  );
}