import { useState } from "react";
import BrokerSelector from "../components/BrokerSelector";
import LoginForm from "../components/LoginForm";
import { mockLogin } from "../api/mockAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const brokers = ["Zerodha", "Groww", "Upstox", "AngelOne"];

const LoginPage = () => {
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (username: string, password: string) => {
    setError("");
    const response = await mockLogin(selectedBroker!, username, password);

    if (response.status === 200 && response.token) {
      login(response.token); // sets auth context and triggers rerender
      navigate("/app");
    } else if (response.status === 400) {
      setError("❌ Invalid credentials. Try again.");
    } else {
      setError("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Broker Platform Login</h1>
        {!selectedBroker ? (
          <BrokerSelector brokers={brokers} onSelect={setSelectedBroker} />
        ) : (
          <>
            <LoginForm broker={selectedBroker} onLogin={handleLogin} />
            {error && <div className="text-red-600 mt-4">{error}</div>}
            <button
              className="text-sm text-blue-500 mt-4 underline"
              onClick={() => setSelectedBroker(null)}
            >
              ← Choose another broker
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
