import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BarraLateral from "./components/BarraLateral";
import AppRoutes from "./routes/routes"; // Corrija o caminho, se necessário

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    }
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="flex h-screen">
        {isAuthenticated && (
          <div className="w-64 fixed h-screen bg-blue-900 text-white flex flex-col">
            <BarraLateral onLogout={handleLogout} />
          </div>
        )}
        <div
          className={`flex-1 ${
            isAuthenticated ? "ml-64" : "w-full"
          } bg-gray-100`}
        >
          <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
        </div>
      </div>
    </Router>
  );
}

export default App;
