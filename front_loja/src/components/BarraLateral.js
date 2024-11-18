import React, { useEffect, useState } from 'react';
import { FaList, FaProductHunt, FaUser, FaCog, FaSignOutAlt, FaBars, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function BarraLateral({ onLogout }) {
  const [user, setUser] = useState({ name: 'Usuário', role: 'User' });
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const [isProdutoOpen, setIsProdutoOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          alert('Sua sessão expirou. Faça login novamente.');
          onLogout();
        } else {
          setUser({
            name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 'Usuário',
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'User',
          });
        }
      } catch (error) {
        onLogout();
      }
    }
  }, [onLogout]);

  const Submenu = ({ title, icon: Icon, links, isOpen, toggle }) => (
    <div>
      <div
        onClick={toggle}
        className="flex items-center justify-between py-2 px-4 hover:bg-blue-700 cursor-pointer rounded"
      >
        <div className="flex items-center">
          <Icon className="mr-2" /> {title}
        </div>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div className="ml-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block py-2 px-4 hover:bg-blue-600 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <button
        className="md:hidden p-4 bg-blue-900 text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars />
      </button>
      <div
        className={`fixed inset-y-0 left-0 bg-blue-900 text-white w-64 p-4 flex flex-col shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:translate-x-0 lg:relative`}
      >
        <div className="mb-8">
          <h2 className="text-lg font-bold">{user.name}</h2>
          <span className="text-sm text-green-400">
            {user.role === 'ADM' ? 'Administrador' : 'Usuário'}
          </span>
        </div>

        <nav className="flex-grow">
          <Link
            to="/"
            className="flex items-center py-2 px-4 hover:bg-blue-700 rounded mb-2"
          >
            <FaHome className="mr-2" /> Tela Inicial
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center py-2 px-4 hover:bg-blue-700 rounded mb-2"
          >
            <FaUser className="mr-2" /> Dashboard
          </Link>

          <Submenu
            title="Categorias"
            icon={FaList}
            links={[
              { path: '/categorias/nova', label: 'Nova Categoria' },
              { path: '/categorias', label: 'Listar Categorias' },
            ]}
            isOpen={isCategoriaOpen}
            toggle={() => setIsCategoriaOpen(!isCategoriaOpen)}
          />

          <Submenu
            title="Produtos"
            icon={FaProductHunt}
            links={[
              { path: '/produtos/novo', label: 'Novo Produto' },
              { path: '/produtos', label: 'Listar Produtos' },
            ]}
            isOpen={isProdutoOpen}
            toggle={() => setIsProdutoOpen(!isProdutoOpen)}
          />

          {user.role === 'ADM' && (
            <Link
              to="/admin-settings"
              className="flex items-center py-2 px-4 hover:bg-blue-700 rounded mb-2"
            >
              <FaCog className="mr-2" /> Configurações
            </Link>
          )}

          <button
            onClick={onLogout}
            className="flex items-center py-2 px-4 hover:bg-red-700 rounded mt-8 w-full text-left"
          >
            <FaSignOutAlt className="mr-2" /> Sair
          </button>
        </nav>       
      </div>
    </>
  );
}

export default BarraLateral;
