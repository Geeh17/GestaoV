import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { jwtDecode } from "jwt-decode";


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

      // Armazena o token no localStorage
      localStorage.setItem("jwt_token", token);

      // Decodifica o token para obter a role
      const decoded = jwtDecode(token);
      const userRole = decoded.Role;

      // Armazena a role no localStorage
      localStorage.setItem("role", userRole);

      // Redireciona para o Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            value={usuarioNome}
            onChange={(e) => setUsuarioNome(e.target.value)}
            required
          />
        </div>
        <div>
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
