import React, { useEffect, useState } from 'react';

function ListaCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); 

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:5238/categorias?pageNumber=${currentPage}&pageSize=${pageSize}`,
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
        setCategorias(data); 
      } catch (err) {
        console.error('Erro ao buscar categorias:', err.message);
        setError(err.message);
      }
    };

    fetchCategorias();
  }, [currentPage, pageSize]); 

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (error) {
    return <p className="text-red-700 font-semibold">Erro: {error}</p>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Categorias Disponíveis</h1>
      
      {categorias.length === 0 ? (
        <p className="text-gray-600 text-center">Nenhuma categoria encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categorias.map(categoria => (
            <div
              key={categoria.categoriaId}
              className="border border-gray-300 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow duration-150"
            >
              <h2 className="font-semibold text-xl text-blue-600">{categoria.nome}</h2>
              <p className="text-gray-700">{categoria.descricao || 'Sem descrição'}</p>
            </div>
          ))}
        </div>
      )}
     
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Voltar
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export default ListaCategorias;
