import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/app" replace /> : <LoginPage />
          }
        />
        <Route
          path="/app/*"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
