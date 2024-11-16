import React from 'react';

function Cartao({ titulo, valor, cor }) {
  return (
    <div className={`p-6 rounded-lg shadow-md text-white ${cor} flex flex-col items-center`}>
      <h3 className="text-2xl font-bold">{valor}</h3>
      <p>{titulo}</p>
      <a href="#" className="text-sm mt-2 underline">More info</a>
    </div>
  );
}

export default Cartao;
