import React, { useState, useEffect } from 'react';

function FormularioProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [estoque, setEstoque] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5238/categorias', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json(); 
          setCategorias(data);
        } else if (response.status === 204) { 
          setCategorias([]);
        } else {
          console.error('Erro ao buscar categorias:', response.statusText);
          alert(`Erro ao buscar categorias: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        alert('Ocorreu um erro ao buscar categorias. Tente novamente.');
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const token = localStorage.getItem('token'); 
    if (!token) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }

    const produto = {
      nome,
      descricao,
      preco: parseFloat(preco),
      dataCompra,
      estoque: parseInt(estoque),
      categoriaId: parseInt(categoriaId),
    };

    try {
      const response = await fetch('http://localhost:5238/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(produto), 
      });

      if (response.ok) {
        alert('Produto cadastrado com sucesso!');
        setNome('');
        setDescricao('');
        setPreco('');
        setDataCompra('');
        setEstoque('');
        setCategoriaId('');
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar produto: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastrar Produto</h2>
      
      <label className="block text-gray-700 font-semibold mb-2">Nome:</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-gray-700 font-semibold mb-2">Descrição:</label>
      <input
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-gray-700 font-semibold mb-2">Preço:</label>
      <input
        type="number"
        step="0.01"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-gray-700 font-semibold mb-2">Data de Compra:</label>
      <input
        type="date"
        value={dataCompra}
        onChange={(e) => setDataCompra(e.target.value)}
        required
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-gray-700 font-semibold mb-2">Estoque:</label>
      <input
        type="number"
        value={estoque}
        onChange={(e) => setEstoque(e.target.value)}
        required
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-gray-700 font-semibold mb-2">Categoria:</label>
      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(e.target.value)}
        required
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map(categoria => (
          <option key={categoria.categoriaId} value={categoria.categoriaId}>
            {categoria.nome}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Cadastrar Produto
      </button>
    </form>
  );
}

export default FormularioProduto;
