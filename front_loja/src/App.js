import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarraLateral from './components/BarraLateral';
import FormularioCategoria from './components/formularios/FormularioCategoria';
import ListaCategorias from './components/formularios/ListaCategorias';
import FormularioProduto from './components/formularios/FormularioProduto';
import ListaProdutos from './components/formularios/ListaProdutos';
import Login from './pages/Login';
import Grafico from './components/Grafico';

function App() {
  return (
    <Router>
      <div className="flex">
        <BarraLateral />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/dashboard" element={<Grafico />} />
            <Route path="/categorias/nova" element={<FormularioCategoria />} />
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/produtos/novo" element={<FormularioProduto />} />
            <Route path="/produtos" element={<ListaProdutos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
