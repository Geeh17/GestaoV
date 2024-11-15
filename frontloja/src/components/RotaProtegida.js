import React from 'react';
import { Navigate } from 'react-router-dom';

function RotaProtegida({ children, requiredRole }) {
  const token = localStorage.getItem('jwt_token'); // Verifica se o token JWT está presente
  const userRole = localStorage.getItem('role');   // Obtém a Role do usuário

  if (!token) {
    // Redireciona para o login se não estiver autenticado
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redireciona para o dashboard ou outra página se a Role não for a necessária
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default RotaProtegida;
