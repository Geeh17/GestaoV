import React from 'react';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("jwt_token"); // Atualizado para o nome do token
    localStorage.removeItem("role");
    navigate("/login"); // Usa o navigate para redirecionar
  }

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Perfil;
