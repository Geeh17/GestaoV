import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BarraLateral from './components/BarraLateral';
import FormularioCategoria from './components/formularios/FormularioCategoria';
import ListaCategorias from './components/formularios/ListaCategorias';
import FormularioProduto from './components/formularios/FormularioProduto';
import ListaProdutos from './components/formularios/ListaProdutos';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard'; 

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <BarraLateral />} 
        <div className={`flex-1 p-4 ${isAuthenticated ? '' : 'w-full'}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Cadastro />} />

            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categorias/nova" element={<FormularioCategoria />} />
                <Route path="/categorias" element={<ListaCategorias />} />
                <Route path="/produtos/novo" element={<FormularioProduto />} />
                <Route path="/produtos" element={<ListaProdutos />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
