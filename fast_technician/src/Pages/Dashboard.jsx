// src/pages/Dashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch, IconButton, Badge, Popover } from "@mui/material";
import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";
import TopBar from "../components/TopBar";

export default function Dashboard() {
  const [onDuty, setOnDuty] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleBellClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    <TopBar />

      {/* 🔹 Profile Card */}
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-md rounded-2xl p-5 w-full max-w-xs text-center border border-gray-100"
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Technician"
                className="w-24 h-24 rounded-full border-4 border-blue-500 mb-3"
              />
              <span
                className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
                  onDuty ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              ></span>
            </div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500 text-sm">Technician</p>
            <div className="flex items-center justify-between w-full px-6 mt-4">
              <motion.p
                key={onDuty}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`font-medium ${
                  onDuty ? "text-green-600" : "text-red-500"
                }`}
              >
                {onDuty ? "Online" : "Offline"}
              </motion.p>
              <Switch
                checked={onDuty}
                onChange={() => setOnDuty(!onDuty)}
                color="primary"
              />
            </div>
          </div>
        </motion.div>

        {/* 🔹 Go to Requests Button */}
        <button
          onClick={() => navigate("/requests")}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-md transition duration-200"
        >
          View All Requests
        </button>
      </div>
    </div>
  );
}
