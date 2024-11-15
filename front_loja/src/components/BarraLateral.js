import React from 'react';

function BarraLateral() {
  return (
    <div className="w-64 bg-blue-700 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Logistica Vianna</h2>
      <nav className="flex-grow">
        <a href="/dashboard" className="block py-2 hover:bg-blue-800">Dashboard</a>
        <a href="/categorias" className="block py-2 hover:bg-blue-800">Categoria</a>
        <a href="/produtos" className="block py-2 hover:bg-blue-800">Produto</a>
        <a href="/usuarios" className="block py-2 hover:bg-blue-800">Usuário</a>
        <a href="/conta" className="block py-2 hover:bg-blue-800">Conta</a>
        <a href="/configuracoes" className="block py-2 hover:bg-blue-800">Configurações</a>
      </nav>
      <footer className="mt-4">
        <p className="text-xs">Desenvolvido Geraldo Silva</p>
      </footer>
    </div>
  );
}

export default BarraLateral;
