import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import "../styles/Login.css"; 

function Register() {
  const [usuarioNome, setUsuarioNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', { usuarioNome, senha });
      setSuccess('Usuário cadastrado com sucesso! Faça login para continuar.');
      setUsuarioNome('');
      setSenha('');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuário</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Nome de Usuário: </label>
          <input
            type="text"
            value={usuarioNome}
            onChange={(e) => setUsuarioNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha: </label>
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
