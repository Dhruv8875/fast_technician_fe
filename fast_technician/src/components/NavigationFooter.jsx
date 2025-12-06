import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { GiAutoRepair } from "react-icons/gi";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

export default function MobileNavFooter() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", icon: AiFillHome, label: "Home", path: "/" },
    { id: "service", icon: GiAutoRepair, label: "Service", path: "/requests" },
    { id: "center", icon: MdOutlinePowerSettingsNew, label: "", path: "/chat", isCenter: true },
    { id: "history", icon: MdHistory, label: "History", path: "/history" },
    { id: "profile", icon: FaUser, label: "Profile", path: "/profile" },
  ];

  useEffect(() => {
    const current = navItems.find((item) => item.path === location.pathname);
    if (current) setActiveTab(current.id);
  }, [location.pathname]);

  const handleNavigation = (id, path) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-transparent flex justify-center items-center z-50">
      <div className="relative w-full">
        <div className="relative bg-white   shadow-t-2xl">
         
          <div className="flex items-center justify-around h-20 px-2 relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isCenter = item.isCenter;

              if (isCenter) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id, item.path)}
                    className="absolute left-1/2 -translate-x-1/2 -top-7 flex items-center justify-center w-16 h-16 bg-purple-700 rounded-full shadow-lg transition-transform duration-200 active:scale-95 hover:scale-105 z-10"
                  >
                    <Icon size={28} className="text-white" />
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id, item.path)}
                  className="flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 hover:scale-105"
                >
                  <Icon
                    size={22}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-purple-700" : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`text-xs transition-colors duration-200 ${
                      isActive ? "text-purple-700" : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
