import React from 'react';
import BarraLateral from '../components/BarraLateral';
import Cartao from '../components/Cartao';
import Grafico from '../components/Grafico';

function Dashboard() {
  return (
    <div className="flex">
      <BarraLateral />
      <div className="flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Cartao titulo="Earning" valor="40.3920" cor="bg-blue-500" />
          <Cartao titulo="Referral Earning" valor="15.7080" cor="bg-green-500" />
          <Cartao titulo="Total Earning" valor="56.1000" cor="bg-orange-500" />
          <Cartao titulo="Balance / Credit" valor="29.1000" cor="bg-indigo-500" />
          <Cartao titulo="Total Invoice" valor="6" cor="bg-purple-500" />
          <Cartao titulo="Total Agent" valor="2" cor="bg-teal-500" />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Sales Chart for 2015</h2>
          <Grafico />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
