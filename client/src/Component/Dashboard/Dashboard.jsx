import React, { useEffect, useState, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector
} from "recharts";
import {
  FileText,
  LayoutDashboard,
  Globe,
  ShieldCheck,
  Clock,
  RefreshCcw,
  Plane
} from "lucide-react";
import PassportList from "./passportlist";
import VisaListMUI from "./visalist";

// --- VISUAL CONFIGURATION ---

const CHART_THEMES = {
  passport: [
    { start: "#6366f1", end: "#818cf8" },
    { start: "#ec4899", end: "#f472b6" },
    { start: "#8b5cf6", end: "#a78bfa" },
    { start: "#f43f5e", end: "#fb7185" },
    { start: "#f59e0b", end: "#fbbf24" },
  ],
  visa: [
    { start: "#f59e0b", end: "#fbbf24", name: "Pending" },
    { start: "#10b981", end: "#34d399", name: "Approved" },
    { start: "#ef4444", end: "#f87171", name: "Rejected" },
    { start: "#3b82f6", end: "#60a5fa", name: "Under Review" },
  ]
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.2))" }}
      />
    </g>
  );
};

const Dashboard = () => {
  const [passportData, setPassportData] = useState([]);
  const [visaData, setVisaData] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0 });
  const [activeIndexPassport, setActiveIndexPassport] = useState(0);
  const [activeIndexVisa, setActiveIndexVisa] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // --- REFRESH LOGIC ---
  const refreshAnalytics = useCallback(async () => {
    setIsSyncing(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
        uid: localStorage.getItem("uid"),
        unqkey: localStorage.getItem("unqkey"),
      };

      // Fetch both datasets in parallel
      const [passportRes, visaRes] = await Promise.all([
        fetch("https://visa-passport.onrender.com/admin/chart", { method: "POST", headers }),
        fetch("https://visa-passport.onrender.com/admin/visachart", { method: "POST", headers })
      ]);

      const passportResult = await passportRes.json();
      const visaResult = await visaRes.json();

      // Update Passport Data
      const passportRaw = Array.isArray(passportResult.data) ? passportResult.data : [];
      setPassportData(passportRaw.map(item => ({ name: item._id, value: item.count })));

      // Update Visa Data
      const visaRaw = Array.isArray(visaResult.data) ? visaResult.data : [];
      const labels = { 0: "Pending", 1: "Approved", 2: "Rejected", 3: "Under Review" };
      const formattedVisa = visaRaw.map(item => ({
        name: labels[item._id] || "Unknown",
        value: item.count,
      }));
      setVisaData(formattedVisa);

      // Stats Calculation
      const total = formattedVisa.reduce((acc, curr) => acc + curr.value, 0);
      const approved = formattedVisa.find(v => v.name === "Approved")?.value || 0;
      setStats({ total, approved, pending: total - approved });

    } catch (err) {
      console.error("Sync Error:", err);
    } finally {
      // Small timeout to allow animation to feel smooth
      setTimeout(() => setIsSyncing(false), 800);
    }
  }, []);

  useEffect(() => {
    refreshAnalytics();
  }, [refreshAnalytics]);

  return (
    <div className="min-h-screen relative font-sans text-slate-800 overflow-hidden bg-[#f0f4f8]">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#cbd5e1" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor:'rgba(99, 102, 241, 0.1)', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'rgba(255,255,255,0)', stopOpacity:1}} />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#grad1)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
        
        {/* --- HEADER --- */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-lg shadow-indigo-200 text-white transform hover:rotate-12 transition-transform duration-300">
              <LayoutDashboard size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Global Command Center</h1>
              <p className="text-slate-500 font-medium">Visa & Passport Analytics Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* --- REFRESH/SYNC BUTTON --- */}
            <button 
              onClick={refreshAnalytics}
              disabled={isSyncing}
              className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm border border-slate-200 font-bold transition-all active:scale-95 disabled:opacity-60"
            >
              <RefreshCcw size={18} className={`${isSyncing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              {isSyncing ? 'Syncing...' : 'Sync Analytics'}
            </button>

            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm text-sm font-semibold text-slate-600">
              <Globe size={16} className="text-indigo-500"/>
              <span>Ahmedabad, India</span>
            </div>
          </div>
        </header>

        {/* --- STATS OVERVIEW --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Applications" value={stats.total} icon={<FileText size={24} className="text-white" />} gradient="from-indigo-500 to-blue-500" shadow="shadow-indigo-200" />
          <StatCard title="Visas Approved" value={stats.approved} icon={<ShieldCheck size={24} className="text-white" />} gradient="from-emerald-500 to-teal-500" shadow="shadow-emerald-200" />
          <StatCard title="Processing / Action" value={stats.pending} icon={<Clock size={24} className="text-white" />} gradient="from-amber-400 to-orange-500" shadow="shadow-orange-200" />
        </div>

        {/* --- CHARTS GRID --- */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          <ChartCard title="Passport Demographics" subtitle="Distribution by Type">
             <svg style={{ height: 0 }}>
                <defs>
                  {CHART_THEMES.passport.map((c, i) => (
                    <linearGradient key={`pgrad-${i}`} id={`passportGradient${i}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="5%" stopColor={c.start} stopOpacity={0.9}/>
                      <stop offset="95%" stopColor={c.end} stopOpacity={0.9}/>
                    </linearGradient>
                  ))}
                </defs>
              </svg>

            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  activeIndex={activeIndexPassport}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActiveIndexPassport(index)}
                  data={passportData}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {passportData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#passportGradient${index % CHART_THEMES.passport.length})`} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-slate-600 font-medium ml-1">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Visa Success Rate" subtitle="Current status breakdown">
              <svg style={{ height: 0 }}>
                <defs>
                  {CHART_THEMES.visa.map((c, i) => (
                    <linearGradient key={`vgrad-${i}`} id={`visaGradient${i}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="5%" stopColor={c.start} stopOpacity={0.9}/>
                      <stop offset="95%" stopColor={c.end} stopOpacity={0.9}/>
                    </linearGradient>
                  ))}
                </defs>
              </svg>

            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  activeIndex={activeIndexVisa}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActiveIndexVisa(index)}
                  data={visaData}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {visaData.map((entry, index) => {
                     const colorObj = CHART_THEMES.visa.find(c => c.name === entry.name) || CHART_THEMES.visa[index % 4];
                     const colorIndex = CHART_THEMES.visa.indexOf(colorObj);
                     return <Cell key={`cell-${index}`} fill={`url(#visaGradient${colorIndex})`} />;
                  })}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-slate-600 font-medium ml-1">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- DATA LISTS --- */}
        <div className="space-y-8">
          <GlassSection title="Passport Applications" icon={<Plane className="text-indigo-500" />}>
            <PassportList />
          </GlassSection>

          <GlassSection title="Visa Records" icon={<Globe className="text-emerald-500" />}>
            <VisaListMUI />
          </GlassSection>
        </div>

      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ title, value, icon, gradient, shadow }) => (
  <div className="relative group overflow-hidden bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className={`absolute top-0 right-0 p-4 opacity-10 rounded-bl-3xl bg-gradient-to-br ${gradient} w-24 h-24 transition-transform group-hover:scale-150 duration-500`}></div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{title}</p>
        <h3 className="text-4xl font-extrabold text-slate-800">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ${shadow} transform group-hover:rotate-12 transition-transform duration-300`}>
        {icon}
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, children }) => (
  <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl flex flex-col items-center">
    <div className="w-full mb-2 px-2">
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
    <div className="w-full flex-1 flex justify-center items-center relative">
        <div className="absolute inset-0 m-auto w-32 h-32 rounded-full border-4 border-slate-100/50 pointer-events-none"></div>
        {children}
    </div>
  </div>
);

const GlassSection = ({ title, icon, children }) => (
  <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 overflow-hidden">
    <div className="p-6 border-b border-slate-100/50 flex items-center gap-3 bg-white/40">
      <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
      <h3 className="font-bold text-xl text-slate-800">{title}</h3>
    </div>
    <div className="p-4">{children}</div>
  </section>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700">
        <p className="font-semibold text-sm mb-1">{payload[0].name}</p>
        <div className="flex items-center gap-2">
            <span className="block w-2 h-2 rounded-full bg-indigo-400"></span>
            <p className="text-lg font-bold">{payload[0].value} <span className="text-xs font-normal text-slate-400">records</span></p>
        </div>
      </div>
    );
  }
  return null;
};

export default Dashboard;