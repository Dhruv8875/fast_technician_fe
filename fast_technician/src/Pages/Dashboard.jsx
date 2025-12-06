import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { motion } from "framer-motion";
import TopBar from "../components/TopBar";
import MobileNavFooter from "../components/NavigationFooter";
import axios from "axios";

const socket = io("http://localhost:5000"); // backend URL

export default function Dashboard() {
  const [onDuty, setOnDuty] = useState(false);
  const [popupRequest, setPopupRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to socket server:", socket.id);
    });

    const handleNewRequest = (request) => {
      console.log("📩 New request received:", request);
      if (onDuty) {
        setPopupRequest(request);
      } else {
        console.log("Technician offline, popup skipped");
      }
    };

    socket.on("new_request", handleNewRequest);

    return () => {
      socket.off("new_request", handleNewRequest);
    };
  }, [onDuty]);

  const currentTechnician = JSON.parse(localStorage.getItem("user"));

  console.log("currentTechnician", currentTechnician);

  const handleAccept = async (requestId) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/requests/${requestId}/accept`,
        { technicianId: currentTechnician?.id } // note: _id not id
      );
      console.log("✅ Request accepted:", res.data);
      setPopupRequest(null);
    } catch (err) {
      console.error("❌ Error accepting request:", err);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/request/${requestId}/reject`
      );
      console.log("Request rejected:", res.data);
      setPopupRequest(null);
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  // Dummy stats (baad me API se bind kar sakta hai)
  const todayStats = {
    completed: 3,
    pending: 1,
    earningsToday: 650,
    rating: 4.9,
  };

  const walletInfo = {
    balance: 1240,
    thisMonth: 8450,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      <TopBar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 pb-20 overflow-y-auto">
        {/* Profile Card */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-sm"
          >
            {/* Outer glow border (soft) */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 opacity-60 blur-xl -z-10" />

            <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* Profile image ring */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 via-fuchsia-400 to-indigo-500 rounded-full opacity-90 blur-sm" />
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Technician"
                    className="relative w-24 h-24 rounded-full border-[3px] border-white object-cover"
                  />
                  {/* Online dot */}
                  <span
                    className={`absolute bottom-1 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      onDuty ? "bg-emerald-400" : "bg-rose-500"
                    }`}
                  />
                </div>

                <h2 className="mt-3 text-xl font-semibold text-gray-900">
                  {currentTechnician?.name}
                </h2>
                <p className="text-xs uppercase tracking-[0.2em] text-purple-500 mt-1">
                  Field Technician
                </p>

                {/* Online / Offline row */}
                <div className="flex items-center justify-between w-full mt-5 gap-3">
                  <motion.div
                    key={onDuty ? "online" : "offline"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        onDuty ? "bg-emerald-400" : "bg-rose-400"
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        onDuty ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {onDuty ? "Online & Available" : "Offline"}
                    </p>
                  </motion.div>

                  {/* Custom toggle */}
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={onDuty}
                      onChange={() => setOnDuty(!onDuty)}
                    />
                    <div className="w-12 h-6 rounded-full bg-gray-300 peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-fuchsia-500 transition-colors flex items-center px-1">
                      <span className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-6" />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* QUICK ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-6 max-w-sm mx-auto grid grid-cols-3 gap-3"
        >
          <button
            onClick={() => navigate("/requests")}
            className="flex flex-col items-center justify-center text-[11px] bg-white rounded-2xl shadow-sm py-3 border border-purple-100 hover:border-purple-400 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span className="text-lg">📍</span>
            <span className="mt-1 font-medium text-purple-700">Nearby</span>
          </button>
          <button
            onClick={() => navigate("/requests")}
            className="flex flex-col items-center justify-center text-[11px] bg-white rounded-2xl shadow-sm py-3 border border-purple-100 hover:border-purple-400 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span className="text-lg">📋</span>
            <span className="mt-1 font-medium text-purple-700">My Jobs</span>
          </button>
          <button
            onClick={() => navigate("/earnings")}
            className="flex flex-col items-center justify-center text-[11px] bg-white rounded-2xl shadow-sm py-3 border border-purple-100 hover:border-purple-400 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span className="text-lg">💰</span>
            <span className="mt-1 font-medium text-purple-700">Earnings</span>
          </button>
        </motion.div>

        {/* TODAY'S STATS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-6 max-w-sm mx-auto bg-white rounded-3xl shadow-md border border-purple-100 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Today&apos;s Overview
            </h3>
            <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">
              Live stats
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-purple-50 rounded-2xl py-3 border border-purple-100">
              <p className="text-[11px] text-purple-800/80">Jobs Completed</p>
              <p className="text-lg font-semibold text-purple-900">
                {todayStats.completed}
              </p>
            </div>
            <div className="bg-purple-50 rounded-2xl py-3 border border-purple-100">
              <p className="text-[11px] text-purple-800/80">Pending Jobs</p>
              <p className="text-lg font-semibold text-purple-900">
                {todayStats.pending}
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl py-3 border border-emerald-100">
              <p className="text-[11px] text-emerald-700/80">Earnings Today</p>
              <p className="text-lg font-semibold text-emerald-700">
                ₹{todayStats.earningsToday}
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl py-3 border border-amber-100">
              <p className="text-[11px] text-amber-700/80">Rating</p>
              <p className="text-lg font-semibold text-amber-700">
                {todayStats.rating}
                <span className="text-xs"> ★</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* WALLET CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-6 max-w-sm mx-auto"
        >
          <div className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-500 rounded-3xl shadow-lg p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Wallet Balance</p>
              <span className="text-[11px] bg-white/25 px-2 py-1 rounded-full">
                This month: ₹{walletInfo.thisMonth}
              </span>
            </div>
            <p className="text-2xl font-semibold mb-3">₹{walletInfo.balance}</p>
            <div className="flex justify-between items-center text-[11px]">
              <p className="text-white/90">
                Withdraw your earnings directly to bank.
              </p>
              <button className="bg-white text-purple-700 text-[11px] font-semibold px-3 py-1 rounded-full shadow-md active:scale-95 transition-transform">
                Withdraw
              </button>
            </div>
          </div>
        </motion.div>

        {/* ACTIVE REQUEST CARD (if popup exists) */}
        {popupRequest && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="mt-6 max-w-sm mx-auto bg-white rounded-3xl shadow-md border border-amber-200 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-amber-800">
                Active Incoming Request
              </h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-amber-50 text-amber-700 font-medium">
                New
              </span>
            </div>
            <p className="text-xs text-gray-700 mb-1">
              <strong>Name:</strong> {popupRequest.name}
            </p>
            <p className="text-xs text-gray-700 mb-1">
              <strong>Service:</strong> {popupRequest.serviceType}
            </p>
            <p className="text-xs text-gray-700">
              <strong>Issue:</strong> {popupRequest.issue}
            </p>
          </motion.div>
        )}

        {/* VIEW ALL REQUESTS BUTTON */}
        <div className="max-w-sm mx-auto mt-6 mb-2">
          <button
            onClick={() => navigate("/requests")}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 px-6 rounded-2xl shadow-md shadow-purple-400/40 border border-purple-500/60 transition-all active:scale-95"
          >
            View All Requests
          </button>
        </div>
      </div>

      <MobileNavFooter />

      {/* POPUP FOR NEW REQUEST (logic untouched) */}
      {popupRequest && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-6 w-11/12 max-w-md border border-purple-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              New Request Received
            </h2>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Name:</strong> {popupRequest.name}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Service:</strong> {popupRequest.serviceType}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Issue:</strong> {popupRequest.issue}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Location:</strong> lat {popupRequest.location.lat}, lng{" "}
              {popupRequest.location.lng}
            </p>

            <div className="flex justify-center mt-4 gap-3">
              <button
                onClick={() => handleAccept(popupRequest._id)}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2 rounded-2xl text-sm font-medium shadow-md active:scale-95 transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(popupRequest._id)}
                className="bg-rose-500 hover:bg-rose-400 text-white px-5 py-2 rounded-2xl text-sm font-medium shadow-md active:scale-95 transition"
              >
                Reject
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
