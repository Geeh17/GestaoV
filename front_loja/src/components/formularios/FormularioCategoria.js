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
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        setError('Erro ao buscar categorias. Verifique sua conexão.');
      }
    } catch (error) {
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
    const categoria = { CategoriaId: categoriaId, Nome: nome, Descricao: descricao };

    try {
      const method = categoriaId ? 'PUT' : 'POST';
      const url = categoriaId
        ? `http://localhost:5238/categorias/${categoriaId}`
        : 'http://localhost:5238/categorias';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoria)
      });

      if (response.ok) {
        setSuccess(`Categoria ${categoriaId ? 'atualizada' : 'cadastrada'} com sucesso!`);
        setNome('');
        setDescricao('');
        setCategoriaId(null);
        fetchCategorias();
      } else {
        const errorData = await response.json();
        setError(`Erro: ${errorData.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      setError('Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
  };

  const handleEdit = (categoria) => {
    setNome(categoria.Nome);
    setDescricao(categoria.Descricao);
    setCategoriaId(categoria.CategoriaId);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        const response = await fetch(`http://localhost:5238/categorias/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setSuccess('Categoria deletada com sucesso!');
          fetchCategorias();
        } else {
          setError('Erro ao deletar categoria.');
        }
      } catch (error) {
        setError('Ocorreu um erro ao deletar a categoria. Tente novamente.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Gerenciar Categorias</h2>

      {error && <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>}
      {success && <div className="mb-4 text-green-600 text-center font-semibold">{success}</div>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {categoriaId ? 'Atualizar Categoria' : 'Cadastrar Categoria'}
        </button>
      </form>

      {loading ? (
        <div className="text-center text-gray-600">Carregando categorias...</div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Lista de Categorias</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="border-b-2 px-4 py-2 text-left">ID</th>
                <th className="border-b-2 px-4 py-2 text-left">Nome</th>
                <th className="border-b-2 px-4 py-2 text-left">Descrição</th>
                <th className="border-b-2 px-4 py-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.CategoriaId}>
                  <td className="border-b px-4 py-2">{categoria.CategoriaId}</td>
                  <td className="border-b px-4 py-2">{categoria.Nome}</td>
                  <td className="border-b px-4 py-2">{categoria.Descricao}</td>
                  <td className="border-b px-4 py-2">
                    <button
                      onClick={() => handleEdit(categoria)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(categoria.CategoriaId)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Categorias;
