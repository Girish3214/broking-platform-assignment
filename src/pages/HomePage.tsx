import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Positions from "./Positions";
import Holdings from "./Holdings";
import Orderbook from "./Orderbook";

const navItems = [
  { name: "Holdings", path: "/app/holdings" },
  { name: "Orderbook", path: "/app/orderbook" },
  { name: "Positions", path: "/app/positions" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Content */}
      <div className="flex-1 p-4 relative">
        <Routes>
          <Route path="holdings" element={<Holdings />} />
          <Route path="orderbook" element={<Orderbook />} />
          <Route path="positions" element={<Positions />} />
          <Route path="*" element={<Holdings />} /> {/* Default screen */}
        </Routes>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex justify-around bg-white shadow-md border-t p-2">
        {navItems.map(item => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex-1 text-center py-2 rounded 
              ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600"
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
