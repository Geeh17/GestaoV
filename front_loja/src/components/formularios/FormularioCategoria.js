import React, { useState, useEffect } from 'react';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoriaId, setCategoriaId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  const fetchCategorias = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5238/categorias', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        setError('Erro ao buscar categorias. Verifique sua conexão.');
      }
    } catch {
      setError('Erro ao buscar categorias. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const categoria = { nome, descricao, ...(categoriaId && { categoriaId }) };

    try {
      const method = categoriaId ? 'PUT' : 'POST';
      const url = categoriaId
        ? `http://localhost:5238/categorias/${categoriaId}`
        : 'http://localhost:5238/categorias';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(categoria),
      });

      if (response.ok) {
        setSuccess(`Categoria ${categoriaId ? 'atualizada' : 'cadastrada'} com sucesso!`);
        setNome('');
        setDescricao('');
        setCategoriaId(null);
        fetchCategorias();
      } else {
        setError('Erro no servidor ao processar a solicitação.');
      }
    } catch {
      setError('Erro ao enviar os dados. Tente novamente.');
    }
  };

  const handleEdit = (categoria) => {
    setNome(categoria.nome);
    setDescricao(categoria.descricao);
    setCategoriaId(categoria.categoriaId);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        const response = await fetch(`http://localhost:5238/categorias/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          setSuccess('Categoria deletada com sucesso!');
          fetchCategorias();
        } else {
          setError('Erro ao deletar categoria.');
        }
      } catch {
        setError('Erro ao deletar a categoria. Tente novamente.');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Gerenciar Categorias</h2>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      {success && <div className="mb-4 text-green-500 text-center">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição:</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {categoriaId ? 'Atualizar Categoria' : 'Cadastrar Categoria'}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500 mt-6">Carregando categorias...</p>
      ) : (
        <table className="w-full mt-6 border-collapse bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nome</th>
              <th className="border px-4 py-2">Descrição</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length > 0 ? (
              categorias.map((categoria) => (
                <tr key={categoria.categoriaId} className="bg-white">
                  <td className="border px-4 py-2">{categoria.categoriaId}</td>
                  <td className="border px-4 py-2">{categoria.nome}</td>
                  <td className="border px-4 py-2">{categoria.descricao}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(categoria)}
                      className="text-blue-500 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(categoria.categoriaId)}
                      className="text-red-500 hover:underline ml-4"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Nenhuma categoria encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Categorias;
