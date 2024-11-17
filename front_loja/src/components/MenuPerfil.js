import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuPerfil() {
  const [userName, setUserName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.nome) {
      setUserName(user.nome);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#menu-perfil')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div id="menu-perfil" className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="focus:outline-none px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        aria-label="Menu do perfil"
      >
        {userName ? `Olá, ${userName}` : 'Perfil'}
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <a
            href="/profile"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            Perfil
          </a>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 w-full text-left hover:bg-gray-100 transition"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuPerfil;
