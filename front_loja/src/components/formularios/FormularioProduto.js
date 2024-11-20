import React, { useState, useEffect } from 'react';

function FormularioProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [estoque, setEstoque] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [produtoId, setProdutoId] = useState(null);

  useEffect(() => {
    // Buscar categorias para o dropdown
    const fetchCategorias = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5238/categorias', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        } else {
          console.error('Erro ao buscar categorias:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    // Buscar dados do produto se estiver em modo de edição
    const fetchProduto = async () => {
      const token = localStorage.getItem('token');
      const pathParts = window.location.pathname.split('/');
      const produtoIdFromUrl = pathParts[pathParts.length - 1]; // Obter ID da URL

      if (produtoIdFromUrl && produtoIdFromUrl !== 'novo') {
        setProdutoId(produtoIdFromUrl); // Atualizar estado com o ID do produto

        try {
          const response = await fetch(`http://localhost:5238/produtos/${produtoIdFromUrl}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const produto = await response.json();
            setNome(produto.nome);
            setDescricao(produto.descricao);
            setPreco(produto.preco);
            setDataCompra(produto.dataCompra);
            setEstoque(produto.estoque);
            setCategoriaId(produto.categoriaId);
          } else {
            alert('Erro ao carregar produto para edição.');
          }
        } catch (error) {
          console.error('Erro ao carregar produto:', error);
        }
      }
    };

    fetchProduto();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const produto = {
      nome,
      descricao,
      preco: parseFloat(preco),
      dataCompra,
      estoque: parseInt(estoque),
      categoriaId: parseInt(categoriaId),
    };

    try {
      const method = produtoId ? 'PUT' : 'POST';
      const url = produtoId
        ? `http://localhost:5238/produtos/${produtoId}` // Para atualizar, inclui o ID na URL
        : 'http://localhost:5238/produtos'; // Para criar, usa a URL sem ID

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produto),
      });

      if (response.ok) {
        alert(`Produto ${produtoId ? 'atualizado' : 'cadastrado'} com sucesso!`);
        if (!produtoId) {
          setNome('');
          setDescricao('');
          setPreco('');
          setDataCompra('');
          setEstoque('');
          setCategoriaId('');
        }
      } else {
        alert('Erro ao salvar produto.');
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 sm:mt-20"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {produtoId ? 'Editar Produto' : 'Cadastrar Produto'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Preço:</label>
          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Data de Compra:
          </label>
          <input
            type="date"
            value={dataCompra}
            onChange={(e) => setDataCompra(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Estoque:</label>
          <input
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Categoria:</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {produtoId ? 'Atualizar Produto' : 'Cadastrar Produto'}
      </button>
    </form>
  );
}

export default FormularioProduto;
