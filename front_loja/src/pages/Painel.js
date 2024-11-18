import React from 'react';
import Grafico from '../components/Grafico';

function Painel() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl overflow-x-auto p-4 bg-white rounded-lg shadow-lg">
        <Grafico />
      </div>
    </div>
  );
}

export default Painel;
