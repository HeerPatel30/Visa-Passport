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

// Generate pastel colors dynamically
const getColors = (count) => {
  const colors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4",
    "#8bc34a", "#e91e63", "#ffeb3b", "#a1887f", "#4dd0e1",
  ];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

// Outside label with percent and name
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
  const [chartData, setChartData] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://visa-passport.onrender.com/admin/chart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            uid: localStorage.getItem("uid"),
            unqkey: localStorage.getItem("unqkey"),
          },
        });

        const result = await res.json();
        const rawData = Array.isArray(result.data) ? result.data : [];

        const formatted = rawData.map((item) => ({
          name: item._id,
          value: item.count,
        }));

        setChartData(formatted);
        setColors(getColors(formatted.length));
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="p-6 bg-white shadow-xl rounded-2xl max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Application Status Overview
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              labelLine
              label={renderCustomizedLabel}
              isAnimationActive={true}
              animationDuration={1000}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: "14px" }} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <PassportList />
      </div>
    </div>
  );
};

export default Dashboard;
