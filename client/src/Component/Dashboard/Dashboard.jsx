import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PassportList from "./passportlist";
import VisaListMUI from "./visalist";

// Generate pastel colors dynamically
const getColors = (count) => {
  const colors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4",
    "#8bc34a", "#e91e63", "#ffeb3b", "#a1887f", "#4dd0e1",
  ];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

// Custom label renderer for pie chart
const renderCustomizedLabel = ({
  cx, cy, midAngle, outerRadius, percent, name,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#444"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={13}
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Dashboard = () => {
  const [passportData, setPassportData] = useState([]);
  const [visaData, setVisaData] = useState([]);
  const [passportColors, setPassportColors] = useState([]);
  const [visaColors, setVisaColors] = useState([]);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          uid: localStorage.getItem("uid"),
          unqkey: localStorage.getItem("unqkey"),
        };

        // Passport Chart    https://visa-passport.onrender.com/admin/chart
        const passportRes = await fetch("https://visa-passport.onrender.com/admin/chart", {
          method: "POST",
          headers,
        });
        const passportResult = await passportRes.json();
        const passportRaw = Array.isArray(passportResult.data) ? passportResult.data : [];

        const passportFormatted = passportRaw.map((item) => ({
          name: item._id,
          value: item.count,
        }));

        setPassportData(passportFormatted);
        setPassportColors(getColors(passportFormatted.length));

        // Visa Chart
        const visaRes = await fetch("https://visa-passport.onrender.com/admin/visachart", {
          method: "POST",
          headers,
        });
        const visaResult = await visaRes.json();
        const visaRaw = Array.isArray(visaResult.data) ? visaResult.data : [];

        const visaStatusLabels = {
          0: "Pending",
          1: "Approved",
          2: "Rejected",
          3: "Under Review",
        };

        const visaFormatted = visaRaw.map((item) => ({
          name: visaStatusLabels[item._id] || "Unknown",
          value: item.count,
        }));

        setVisaData(visaFormatted);
        setVisaColors(getColors(visaFormatted.length));
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchCharts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Passport Chart */}
        <div className="p-6 bg-white shadow-xl rounded-2xl">
          <h2 className="text-xl font-bold text-center mb-4 text-blue-800">
            Passport Application Status
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={passportData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                labelLine
                label={renderCustomizedLabel}
              >
                {passportData.map((_, i) => (
                  <Cell key={`passport-cell-${i}`} fill={passportColors[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Visa Chart */}
        <div className="p-6 bg-white shadow-xl rounded-2xl">
          <h2 className="text-xl font-bold text-center mb-4 text-green-800">
            Visa Application Status
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={visaData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                dataKey="value"
                nameKey="name"
                labelLine
                label={renderCustomizedLabel}
              >
                {visaData.map((_, i) => (
                  <Cell key={`visa-cell-${i}`} fill={visaColors[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Passport List */}
      <div className="mt-10">
        <PassportList />
      </div>
      <div className="mt-10">
        < VisaListMUI/>
      </div>
    </div>
  );
};

export default Dashboard;
