import React, { useState } from 'react';
import { FaList, FaProductHunt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function BarraLateral() {
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const [isProdutoOpen, setIsProdutoOpen] = useState(false);

  return (
    <div className="w-64 h-screen bg-blue-700 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Logística Vianna</h2>
      <nav className="flex-grow">

        <div>
          <div
            onClick={() => setIsCategoriaOpen(!isCategoriaOpen)}
            className="flex items-center justify-between py-2 px-4 hover:bg-blue-800 cursor-pointer"
          >
            <div className="flex items-center">
              <FaList className="mr-2" /> Categorias
            </div>
            {isCategoriaOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isCategoriaOpen && (
            <div className="ml-6">
              <Link
                to="/categorias/nova"
                className="block py-2 px-4 hover:bg-blue-600 rounded"
              >
                Nova Categoria
              </Link>
              <Link
                to="/categorias"
                className="block py-2 px-4 hover:bg-blue-600 rounded"
              >
                Listar Categorias
              </Link>
            </div>
          )}
        </div>

        <div>
          <div
            onClick={() => setIsProdutoOpen(!isProdutoOpen)}
            className="flex items-center justify-between py-2 px-4 hover:bg-blue-800 cursor-pointer"
          >
            <div className="flex items-center">
              <FaProductHunt className="mr-2" /> Produtos
            </div>
            {isProdutoOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isProdutoOpen && (
            <div className="ml-6">
              <Link
                to="/produtos/novo"
                className="block py-2 px-4 hover:bg-blue-600 rounded"
              >
                Novo Produto
              </Link>
              <Link
                to="/produtos"
                className="block py-2 px-4 hover:bg-blue-600 rounded"
              >
                Listar Produtos
              </Link>
            </div>
          )}
        </div>
      </nav>
      <footer className="mt-4">
        <p className="text-xs">Desenvolvido por Geraldo Silva</p>
      </footer>
    </div>
  );
}

export default BarraLateral;
