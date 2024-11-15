import React from 'react';

function Cartao({ titulo, valor, cor }) {
  return (
    <div className={`p-6 rounded-lg shadow-md text-white ${cor}`}>
      <h3 className="text-2xl font-bold">{valor}</h3>
      <p>{titulo}</p>
    </div>
  );
}

export default Cartao;
