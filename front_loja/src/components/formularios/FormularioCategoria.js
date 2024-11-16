import React, { useState } from 'react';

function FormularioCategoria() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }
  
    const categoria = {
      nome,
      descricao
    };
  
    try {
      const response = await fetch('http://localhost:5238/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoria)
      });
  
      if (response.ok) {
        alert('Categoria cadastrada com sucesso!');
        setNome('');
        setDescricao('');
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar categoria: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastrar Categoria</h2>
      
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
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Cadastrar Categoria
      </button>
    </form>
  );
}

export default FormularioCategoria;
