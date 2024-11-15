import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css"; 

function Login() {
  const [usuarioNome, setUsuarioNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { usuarioNome, senha });
      const token = response.data.token;

      localStorage.setItem("jwt_token", token);

      const decoded = jwtDecode(token);
      const userRole = decoded.Role;

      localStorage.setItem("role", userRole);

      navigate("/dashboard");
    } catch (err) {
      setError("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Nome de Usuário:</label>
          <input
            type="text"
            value={usuarioNome}
            onChange={(e) => setUsuarioNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta?{" "}
        <button onClick={() => navigate("/register")}>Cadastre-se</button>
      </p>
    </div>
  );
}

export default Login;
