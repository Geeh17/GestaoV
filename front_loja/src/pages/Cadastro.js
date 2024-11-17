import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Cadastro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Estado para carregamento
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !password.trim()) {
      setError('Nome de usuário e senha são obrigatórios.');
      return;
    }

    setLoading(true); // Inicia o carregamento

    try {
      const response = await api.post('/register', {
        UsuarioNome: username.trim(),
        Senha: password.trim(),
      });

      if (response.status === 201) {
        setSuccess('Cadastro realizado com sucesso! Redirecionando para login...');
        setUsername('');
        setPassword('');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao realizar o cadastro:', error.response ? error.response.data : error.message);
      setError(error.response?.data || 'Erro ao realizar o cadastro. Tente novamente.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleCadastro}>
        <h2 className="text-2xl font-bold mb-4">Cadastro</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium">Usuário</label>
          <input
            type="text"
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading} // Desativa o campo durante o carregamento
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading} // Desativa o campo durante o carregamento
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          disabled={loading} // Desativa o botão durante o carregamento
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
        <button
          type="button"
          className="w-full bg-gray-500 text-white p-2 rounded mt-2 hover:bg-gray-600 transition"
          onClick={() => navigate('/login')}
          disabled={loading} // Desativa o botão durante o carregamento
        >
          Voltar para Login
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
