// src/components/features/LoginPage/LoginPage.js

import React, { useState } from 'react';
import '../LoginPage/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (username.trim() === '') {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (password === '') {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Simulate a simple authentication check
      if (username === 'admin' && password === 'password') {
        onLogin(true);
      } else {
        setErrors({ general: 'Invalid credentials' });
      }
    }
  };

  return (
    <div className="login-container">
      <h2 data-testid="login-header">Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <button type="button" data-testid="login-button" onClick={handleLogin}>
          Login
        </button>
        {errors.general && <p className="error-message">{errors.general}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
