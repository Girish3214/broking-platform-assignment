import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { DarkModeProvider } from "./context/DarkModeContext.tsx";
import { TradeProvider } from "./context/TradeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <AuthProvider>
        <TradeProvider>
          <App />
        </TradeProvider>
      </AuthProvider>
    </DarkModeProvider>
  </StrictMode>
);
