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
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
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
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        setError('Erro ao excluir produto. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Listar Produtos</h2>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Nome</th>
            <th className="p-2 border-b">Descrição</th>
            <th className="p-2 border-b">Preço</th>
            <th className="p-2 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.produtoId}>
              <td className="p-2 border-b">{produto.produtoId}</td>
              <td className="p-2 border-b">{produto.nome}</td>
              <td className="p-2 border-b">{produto.descricao}</td>
              <td className="p-2 border-b">R$ {produto.preco.toFixed(2)}</td>
              <td className="p-2 border-b">
                <button
                  onClick={() => (window.location.href = `/produtos/editar/${produto.produtoId}`)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(produto.produtoId)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarProdutos;
