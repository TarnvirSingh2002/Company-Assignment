import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css'; // For basic styling

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const role = isHost ? "host" : "guest";
      await register(name, email, password, role);
      navigate('/'); // Redirect to homepage on successful registration
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {message && <div className="error-message">{message}</div>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="isHost"
            checked={isHost}
            onChange={(e) => setIsHost(e.target.checked)}
          />
          <label htmlFor="isHost">Register as Host?</label>
        </div>
        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;