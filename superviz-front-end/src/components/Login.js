// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Para gerar um ID único

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name) {
      const participantId = `${name}-${uuidv4()}`; // Gera um `participantId` único
      localStorage.setItem('participantName', name);
      localStorage.setItem('participantId', participantId); // Salva o ID único no localStorage
      onLogin(); // Atualiza o estado de autenticação
      navigate('/dashboard'); // Redireciona para o Dashboard após login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 border border-gray-300"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
