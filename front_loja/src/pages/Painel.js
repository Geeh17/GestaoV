import React from 'react';
import Grafico from '../components/Grafico';

function Painel() {
  return (
    <div className="flex-grow flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl overflow-x-auto" style={{ minHeight: '400px' }}>
        <Grafico />
      </div>
    </div>
  );
}

export default Painel;
