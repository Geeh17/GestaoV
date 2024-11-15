import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

function Dashboard() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/users/details'); 
        setUserName(response.data.User);
        setUserRole(response.data.Role);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <h1>Bem-vindo ao Dashboard, {userName}!</h1>
      <p>Seu papel: {userRole}</p>

      <div>
        {userRole === 'Admin' && (
          <div>
            <h2>Administração</h2>
            <button onClick={() => navigate('/produtos')}>Gerenciar Produtos</button>
            <button onClick={() => navigate('/categorias')}>Gerenciar Categorias</button>
          </div>
        )}
        {userRole === 'User' && (
          <div>
            <h2>Visualização</h2>
            <button onClick={() => navigate('/produtos')}>Ver Produtos</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
