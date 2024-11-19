import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BarraLateral from "./components/BarraLateral";
import FormularioCategoria from "./components/formularios/FormularioCategoria";
import ListaCategorias from "./components/formularios/ListaCategorias";
import FormularioProduto from "./components/formularios/FormularioProduto";
import ListaProdutos from "./components/formularios/ListaProdutos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Painel from "./pages/Painel";
import Home from "./pages/Home";
import AdminSettings from "./pages/AdminSettings"; 

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
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/register" element={<Cadastro />} />

            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Painel />} />
                <Route
                  path="/categorias/nova"
                  element={<FormularioCategoria />}
                />
                <Route path="/categorias" element={<ListaCategorias />} />
                <Route path="/produtos/novo" element={<FormularioProduto />} />
                <Route path="/produtos" element={<ListaProdutos />} />
                <Route path="/admin-settings" element={<AdminSettings />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
