// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

function Register() {
  const [usuarioNome, setUsuarioNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Envia uma requisição para o endpoint de registro no back-end
      await axios.post('/register', { usuarioNome, senha });
      setSuccess('Usuário cadastrado com sucesso! Faça login para continuar.');
      setUsuarioNome('');
      setSenha('');
      setTimeout(() => navigate('/login'), 3000); // Redireciona para o login após 3 segundos
    } catch (err) {
      setError('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Registro de Usuário</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            value={usuarioNome}
            onChange={(e) => setUsuarioNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem uma conta? <button onClick={() => navigate('/login')}>Faça Login</button>
      </p>
    </div>
  );
}

export default Register;
