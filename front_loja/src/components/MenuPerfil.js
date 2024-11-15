import React from 'react';

function MenuPerfil() {
  return (
    <div className="relative">
      <button className="focus:outline-none">Perfil</button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
        <a href="/profile" className="block px-4 py-2">Perfil</a>
        <a href="/logout" className="block px-4 py-2">Sair</a>
      </div>
    </div>
  );
}

export default MenuPerfil;
