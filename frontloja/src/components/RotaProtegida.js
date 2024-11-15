// src/components/RotaProtegida.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function RotaProtegida({ children }) {
  const isAuthenticated = localStorage.getItem('jwt_token'); // Verifica se o token JWT está presente

  if (!isAuthenticated) {
    // Redireciona para o login se não estiver autenticado
    return <Navigate to="/login" />;
  }

  return children;
}

export default RotaProtegida;
