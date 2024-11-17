import React from 'react';
import MenuPerfil from '../components/MenuPerfil';

function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between bg-blue-900 text-white px-6 py-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <MenuPerfil />
      </header>
      <main className="flex-grow bg-gray-100 p-6">
        <p>Bem-vindo ao sistema! Selecione uma opção no menu lateral.</p>
      </main>
    </div>
  );
}

export default Dashboard;
