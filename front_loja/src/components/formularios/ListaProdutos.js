import React, { useState, useEffect } from 'react';

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:5238/produtos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProdutos(data);
        } else {
          setError('Erro ao buscar produtos.');
        }
      } catch {
        setError('Erro ao buscar produtos. Tente novamente mais tarde.');
      }
    };

    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        const response = await fetch(`http://localhost:5238/produtos/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setProdutos(produtos.filter((produto) => produto.produtoId !== id));
          alert('Produto excluído com sucesso!');
        } else {
          setError('Erro ao excluir produto.');
        }
      } catch {
        setError('Erro ao excluir produto. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Listar Produtos</h2>

      {error && (
        <div className="mb-4 text-red-600 text-center font-medium bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Descrição</th>
              <th className="px-4 py-2 border">Preço</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <tr key={produto.produtoId} className="text-gray-800 hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{produto.produtoId}</td>
                  <td className="px-4 py-2 border">{produto.nome}</td>
                  <td className="px-4 py-2 border">{produto.descricao}</td>
                  <td className="px-4 py-2 border text-right">
                    R$ {produto.preco.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => (window.location.href = `/produtos/editar/${produto.produtoId}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(produto.produtoId)}
                      className="text-red-600 hover:text-red-800 font-medium ml-4"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4"
                >
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListarProdutos;
