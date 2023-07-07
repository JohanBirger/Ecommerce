import React, { useState, FormEvent } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface LoginResponse {
  access_token: string;
}

interface ErrorResponse {
  message: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const [status,setStatus] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        password: password,
      });

      // Store the access token in local storage or state
      const { access_token } = response.data;
      await localStorage.setItem('access_token', access_token);
      setStatus('Success');
      // Redirect to the desired page or perform other actions
      navigate('/',{ replace: true });
      
    } catch (error: any) {
      
      console.error('Registration error:', error.response?.data.message || error.message);
      setStatus(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="max-w-xs mx-auto">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
        />
      </div>
      {status && <div className="text-red-500 mb-4">{status}</div>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-1/1"
      >
        Login
      </button>
    </form>
    <button onClick={() => navigate('/register')}
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded my-2 w-1/1"
      >Become member</button>
  </div>
  );
};

export default LoginForm;
