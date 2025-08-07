import { useState } from "react";
import BrokerSelector from "../components/BrokerSelector";
import LoginForm from "../components/LoginForm";
import { mockLogin } from "../api/mockAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/login-logo.svg";
import GrowwIcon from "../assets/groww.png";

const brokers = [
  { title: "Zerodha" },
  { title: "Groww", logo: GrowwIcon },
  { title: "Upstox" },
  { title: "AngelOne" },
];

const LoginPage = () => {
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (username: string, password: string) => {
    setError("");
    const response = await mockLogin(username, password);

    if (response.status === 200 && response.token) {
      login(response.token);
      navigate("/app");
    } else if (response.status === 400) {
      setError("❌ Invalid credentials. Try again.");
    } else {
      setError("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1320] text-white px-6">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-12">
        {/* Left Logo Illustration */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={Logo}
            alt="Broker Login Illustration"
            className="w-4/5 md:w-full max-w-md drop-shadow-xl"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 bg-[#1a1f2b] p-8 rounded-lg shadow-lg border border-gray-700 transition-all">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4 flex items-center gap-3">
            Broker Login
          </h1>
          {!selectedBroker ? (
            <BrokerSelector brokers={brokers} onSelect={setSelectedBroker} />
          ) : (
            <>
              <LoginForm broker={selectedBroker} onLogin={handleLogin} />
              {error && <div className="text-red-400 mt-4">{error}</div>}
              <button
                className="text-sm text-blue-400 mt-4 underline transition duration-200 hover:text-blue-300"
                onClick={() => setSelectedBroker(null)}
              >
                ← Choose another broker
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
