import React, { useEffect, useState } from 'react';
import { FaList, FaProductHunt, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function BarraLateral() {
  const [user, setUser] = useState({});
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const [isProdutoOpen, setIsProdutoOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); 
        setUser({
          name: decoded.name || 'Usuário',
          role: decoded.role || 'User',
        });
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-4 flex flex-col shadow-lg">
      <div className="flex items-center mb-8">
        <img
          src="https://via.placeholder.com/40"
          alt="User Profile"
          className="rounded-full w-10 h-10 mr-3"
        />
        <div>
          <h2 className="text-lg font-bold">{user.name}</h2>
          <span className="text-sm text-green-400">
            {user.role === 'Admin' ? 'Administrador' : 'Usuário'}
          </span>
        </div>
      </div>

      <nav className="flex-grow">
        <Link
          to="/dashboard"
          className="flex items-center py-2 px-4 hover:bg-blue-700 rounded mb-2"
        >
          <FaUser className="mr-2" /> Dashboard
        </Link>

        <div>
          <div
            onClick={() => setIsCategoriaOpen(!isCategoriaOpen)}
            className="flex items-center justify-between py-2 px-4 hover:bg-blue-700 cursor-pointer rounded"
          >
            <div className="flex items-center">
              <FaList className="mr-2" /> Categorias
            </div>
            <span>{isCategoriaOpen ? '-' : '+'}</span>
          </div>
          {isCategoriaOpen && (
            <div className="ml-6">
              <Link
                to="/categorias/nova"
                className="block py-2 px-4 hover:bg-blue-600 rounded"
              >
                Nova Categoria
              </Link>
              <Link
                to="/categorias"
                className="block py-2 px-4 hover:bg-blue-600 rounded"
              >
                Listar Categorias
              </Link>
            </div>
          )}
        </div>

        <div>
          <div
            onClick={() => setIsProdutoOpen(!isProdutoOpen)}
            className="flex items-center justify-between py-2 px-4 hover:bg-blue-700 cursor-pointer rounded"
          >
            <div className="flex items-center">
              <FaProductHunt className="mr-2" /> Produtos
            </div>
            <span>{isProdutoOpen ? '-' : '+'}</span>
          </div>
          {isProdutoOpen && (
            <div className="ml-6">
              <Link
                to="/produtos/novo"
                className="block py-2 px-4 hover:bg-blue-600 rounded"
              >
                Novo Produto
              </Link>
              <Link
                to="/produtos"
                className="block py-2 px-4 hover:bg-blue-600 rounded"
              >
                Listar Produtos
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/admin-settings"
          className="flex items-center py-2 px-4 hover:bg-blue-700 rounded mb-2"
        >
          <FaCog className="mr-2" /> Configurações
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center py-2 px-4 hover:bg-red-700 rounded mt-8 w-full text-left"
        >
          <FaSignOutAlt className="mr-2" /> Sair
        </button>
      </nav>

      <footer className="mt-4 text-sm text-center">
        <p>Trabalho Vianna 2024</p>
      </footer>
    </div>
  );
}

export default BarraLateral;
