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

  // Função para buscar as categorias
  const fetchCategorias = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5238/categorias', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Debug: veja o que está sendo retornado
        setCategorias(data);
      } else {
        setError('Erro ao buscar categorias. Verifique sua conexão.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro ao buscar categorias. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategorias();
  }, []);

  // Função para enviar os dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    const categoria = {
      nome: nome,
      descricao: descricao,
    };
  
    // Para a requisição PUT, adicione o ID no corpo
    if (categoriaId) {
      categoria.categoriaId = categoriaId; // Inclua o ID explicitamente no corpo
    }
  
    console.log('Dados enviados:', categoria);
  
    try {
      const method = categoriaId ? 'PUT' : 'POST';
      const url = categoriaId
        ? `http://localhost:5238/categorias/${categoriaId}`
        : 'http://localhost:5238/categorias';
  
      console.log('URL da requisição:', url);
      console.log('Método HTTP:', method);
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(categoria),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Resposta do servidor:', data);
        setSuccess(`Categoria ${categoriaId ? 'atualizada' : 'cadastrada'} com sucesso!`);
        setNome('');
        setDescricao('');
        setCategoriaId(null);
        fetchCategorias();
      } else {
        const errorData = await response.json();
        console.error('Erro no servidor:', errorData);
        setError(`Erro: ${errorData.message || 'Erro desconhecido no servidor'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
  };  
  // Função para editar uma categoria
  const handleEdit = (categoria) => {
    console.log('Editando categoria:', categoria);
    setNome(categoria.nome); // Atualiza o campo "Nome"
    setDescricao(categoria.descricao); // Atualiza o campo "Descrição"
    setCategoriaId(categoria.categoriaId); // Define o ID da categoria a ser editada
    setError('');
    setSuccess('');
  };

  // Função para deletar uma categoria
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        const response = await fetch(`http://localhost:5238/categorias/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
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
  value={nome} // O valor do campo "Nome" deve ser o estado "nome"
  onChange={(e) => setNome(e.target.value)} // Atualiza o estado ao alterar o valor
  required
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
  type="text"
  value={descricao} // O valor do campo "Descrição" deve ser o estado "descricao"
  onChange={(e) => setDescricao(e.target.value)} // Atualiza o estado ao alterar o valor
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
  {categorias.length > 0 ? (
    categorias.map((categoria) => (
      <tr key={categoria.categoriaId}> {/* Use categoriaId como key */}
        <td className="border-b px-4 py-2">{categoria.categoriaId}</td>
        <td className="border-b px-4 py-2">{categoria.nome}</td>
        <td className="border-b px-4 py-2">{categoria.descricao}</td>
        <td className="border-b px-4 py-2">
        <button
  onClick={() => handleEdit(categoria)}
  className="text-blue-600 hover:underline mr-2"
>
  Editar
</button>
          <button
            onClick={() => handleDelete(categoria.categoriaId)}
            className="text-red-600 hover:underline"
          >
            Excluir
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center py-4">Nenhuma categoria encontrada.</td>
    </tr>
  )}
</tbody>

          </table>
        </>
      )}
    </div>
  );
}

export default Categorias;
