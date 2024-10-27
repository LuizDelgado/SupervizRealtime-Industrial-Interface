// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Atualiza o estado de autenticação sempre que o `localStorage` muda
    const participantName = localStorage.getItem('participantName');
    setIsAuthenticated(!!participantName);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true); // Atualiza o estado quando o usuário loga
  };



  return (
    <Router>
      <Routes key={isAuthenticated ? 'authenticated' : 'guest'}>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
