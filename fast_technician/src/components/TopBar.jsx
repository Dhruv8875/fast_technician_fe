import { useState } from "react";
import { IconButton, Badge, Popover } from "@mui/material";
import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleBellClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* 🔹 Top Bar */}
      <div className="flex justify-between items-center px-5 py-3 bg-white shadow-sm sticky top-0 z-10">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Technician"
          className="w-10 h-10 rounded-full border-4 border-blue-500"
        />
        <h1 className="text-lg font-semibold">Fast Technician</h1>
        <div className="flex items-center gap-3">
          <IconButton onClick={handleBellClick}>
            <Badge badgeContent={3} color="error">
              <Bell size={22} />
            </Badge>
          </IconButton>
          <IconButton>
            <Settings size={22} />
          </IconButton>
        </div>
      </div>

      {/* 🔹 Notification Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-80 bg-white shadow-lg rounded-xl p-4"
        >
          <h3 className="text-md font-semibold mb-3">Notifications</h3>
          <div className="divide-y text-sm">
            <div className="p-2 hover:bg-gray-50 cursor-pointer">
              🔧 New request for AC Repair - Sector 45
            </div>
            <div className="p-2 hover:bg-gray-50 cursor-pointer">
              ✅ Your job for Washing Machine is Accepted
            </div>
            <div className="p-2 hover:bg-gray-50 cursor-pointer">
              ❌ Request for Fridge Repair was Rejected
            </div>
          </div>
        </motion.div>
      </Popover>
    </>
  );
}
