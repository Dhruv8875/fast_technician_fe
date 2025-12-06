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
      <div className="flex justify-between items-center px-5 py-3 bg-white/90 backdrop-blur-md shadow-sm border-b border-purple-100 sticky top-0 z-10">
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-400 to-indigo-500 blur-sm opacity-80" />
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Technician"
              className="relative w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
            />
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent tracking-wide">
          Fast Technician
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <IconButton
            onClick={handleBellClick}
            className="!bg-purple-50 hover:!bg-purple-100 !p-1.5 shadow-sm"
          >
            <Badge
              badgeContent={3}
              color="error"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.65rem",
                  minWidth: "16px",
                  height: "16px",
                },
              }}
            >
              <Bell size={20} className="text-purple-700" />
            </Badge>
          </IconButton>
          <IconButton className="!bg-purple-50 hover:!bg-purple-100 !p-1.5 shadow-sm">
            <Settings size={20} className="text-purple-700" />
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
          className="w-80 bg-white shadow-xl rounded-2xl p-4 border border-purple-100"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-semibold text-gray-900">
              Notifications
            </h3>
            <span className="text-[11px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">
              3 new
            </span>
          </div>

          <div className="divide-y text-sm max-h-60 overflow-y-auto">
            <div className="p-2 hover:bg-purple-50/80 cursor-pointer transition-colors">
              🔧 New request for AC Repair - Sector 45
            </div>
            <div className="p-2 hover:bg-purple-50/80 cursor-pointer transition-colors">
               Your job for Washing Machine is Accepted
            </div>
            <div className="p-2 hover:bg-purple-50/80 cursor-pointer transition-colors">
              Request for Fridge Repair was Rejected
            </div>
          </div>
        </motion.div>
      </Popover>
    </>
  );
}
