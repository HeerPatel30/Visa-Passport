import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import loginBg from "../../assets/login.webp";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    code: "",
    password: ""
  });

  const [notification, setNotification] = useState({
    type: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3031/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formdata)
      });

      const ResponseBody = await response.json();

      if (ResponseBody.status) {
        // Extract from headers
        const token = response.headers.get("token");
        const uid = response.headers.get("uid");
        const unqkey = response.headers.get("unqkey");

        // Save to localStorage for future API calls
        localStorage.setItem("token", token);
        localStorage.setItem("uid", uid);
        localStorage.setItem("unqkey", unqkey);

        setNotification({
          type: "success",
          message: ResponseBody.message || "Login successful!"
        });

        // Redirect after short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setNotification({
          type: "error",
          message: ResponseBody.message || "Login failed."
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setNotification({
        type: "error",
        message: "Server error. Please try again."
      });
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-end"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/30 m-6 md:mr-16"
      >
        <h2 className="text-3xl font-bold text-center text-black mb-6">Login</h2>

        {/* Notification Box */}
        {notification.message && (
          <div
            className={`mb-4 p-3 rounded-xl text-sm font-medium ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-black">Code</label>
            <input
              type="text"
              name="code"
              value={formdata.code}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-white/30 rounded-xl bg-white/30 text-black placeholder-black/80 outline-none transition-all duration-300 focus:ring-2 focus:ring-white hover:bg-white/50 hover:shadow-lg"
              placeholder="Enter code"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-white/30 rounded-xl bg-white/30 text-black placeholder-black/80 outline-none transition-all duration-300 focus:ring-2 focus:ring-white hover:bg-white/50 hover:shadow-lg"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
