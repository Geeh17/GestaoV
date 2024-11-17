import React from 'react';
import Cartao from '../components/Cartao';
import Grafico from '../components/Grafico';
import MenuPerfil from '../components/MenuPerfil';

function Painel() {
  return (
    <div className="flex-grow flex flex-col h-screen">
      <header className="flex items-center justify-between bg-blue-900 text-white px-6 py-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <MenuPerfil />
      </header>

      <main className="flex-grow bg-gray-100 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Cartao titulo="Earnings" valor="40.3920" cor="bg-blue-500" />
          <Cartao titulo="Referral Earnings" valor="15.7080" cor="bg-green-500" />
          <Cartao titulo="Total Earnings" valor="56.1000" cor="bg-orange-500" />
          <Cartao titulo="Balance / Credit" valor="29.1000" cor="bg-purple-500" />
        </div>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Sales Chart</h2>
          <Grafico />
        </section>
      </main>
    </div>
  );
}

export default Painel;
