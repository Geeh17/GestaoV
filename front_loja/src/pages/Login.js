import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para carregamento
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Usuário e senha são obrigatórios.');
      return;
    }

    setLoading(true); // Inicia o carregamento

    try {
      const response = await api.post('/login', {
        UsuarioNome: username.trim(),
        Senha: password.trim(),
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/dashboard'); // Redireciona após login bem-sucedido
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Usuário ou senha inválidos.');
      } else {
        setError('Erro no servidor. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && (
          <p className="text-red-500 mb-4" aria-live="polite">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="username">
            Usuário
          </label>
          <input
            id="username"
            type="text"
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading} // Desativa o campo durante o carregamento
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
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
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={loading} // Desativa o botão durante o carregamento
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="mt-4 text-center">
          <p>
            Não tem uma conta?{' '}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => navigate('/register')}
              disabled={loading} // Desativa o botão durante o carregamento
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
