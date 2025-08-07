import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Positions from "./Positions";
import Holdings from "./Holdings";
import Orderbook from "./Orderbook";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext";

const navItems = [
  { name: "Holdings", path: "/app/holdings" },
  { name: "Orderbook", path: "/app/orderbook" },
  { name: "Positions", path: "/app/positions" },
];

const HomePage = () => {
  const { logout } = useAuth();

  const { isDark, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* ✅ Top Navbar */}
      <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          📊 Broker Platform
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="text-sm text-yellow-600 dark:text-yellow-300 hover:opacity-80 transition"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1 p-4">
        <Routes>
          <Route path="holdings" element={<Holdings />} />
          <Route path="orderbook" element={<Orderbook />} />
          <Route path="positions" element={<Positions />} />
          <Route path="*" element={<Holdings />} />
        </Routes>
      </div>

      {/* ✅ Bottom Navigation */}
      <nav className="flex justify-around bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2">
        {navItems.map(item => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex-1 text-center py-2 rounded transition duration-200 ease-in-out
          ${
            location.pathname === item.path
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold"
              : "text-gray-600 dark:text-gray-300"
          }`}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HomePage;
