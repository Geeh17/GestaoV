import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuPerfil() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.nome) {
      setUserName(user.nome);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); 
  };

  return (
    <div className="relative">
      <button className="focus:outline-none">{userName ? `Olá, ${userName}` : 'Perfil'}</button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
        <a href="/profile" className="block px-4 py-2">Perfil</a>
        <button onClick={handleLogout} className="block px-4 py-2 w-full text-left">Sair</button>
      </div>
    </div>
  );
}

export default MenuPerfil;
