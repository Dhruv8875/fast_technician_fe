import { useDispatch } from "react-redux";
// import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
    // navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">FixFinder Technician</h1>

      <div className="flex items-center gap-4">
        {/* Technician Photo (mini) */}
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="Tech"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
