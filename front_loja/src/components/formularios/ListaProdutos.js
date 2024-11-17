import React, { useEffect, useState } from 'react';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); 

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:5238/produtos?pageNumber=${currentPage}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        setProdutos(data); 
      } catch (err) {
        console.error('Erro ao buscar produtos:', err.message);
        setError(err.message);
      }
    };

    fetchProdutos();
  }, [currentPage, pageSize]); 

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (error) {
    return <p className="text-red-500">Erro: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Lista de Produtos</h1>
      
      {produtos.length === 0 ? (
        <p className="text-gray-500 mb-4">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {produtos.map((produto) => (
            <div
              key={produto.produtoId}
              className="border p-4 rounded shadow-md bg-white"
            >
              <h2 className="font-bold text-lg">{produto.nome}</h2>
              <p className="text-gray-700">Preço: R${produto.preco.toFixed(2)}</p>
              <p className="text-gray-700">
                Estoque: {produto.estoque || 'Não informado'}
              </p>
              <p className="text-gray-700">
                Categoria: {produto.categoriaNome || 'Sem categoria'}
              </p>
            </div>
          ))}
        </div>
      )}
    
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Voltar
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export default ListaProdutos;
