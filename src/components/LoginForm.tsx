import { useState } from "react";

interface Props {
  broker: string;
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<Props> = ({ broker, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mt-4">
      <h3 className="text-md mb-2">Login to {broker}</h3>
      <input
        className="border w-full px-3 py-2 mb-2 rounded"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="border w-full px-3 py-2 mb-4 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={() => onLogin(username, password)}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
