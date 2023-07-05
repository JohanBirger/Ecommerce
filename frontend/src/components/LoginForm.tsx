import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {  email: email, password: password });
      console.log(response)
      console.log(response.status)

      if (response.status === 201) {
        const { token } = response.data;
        console.log(token)
        // Store the token in local storage or state
        // Redirect to the desired page
        localStorage.setItem('token', token);

        navigate('/');
      } else {
        const { message }: any = response.data; // Update the type annotation to 'any'
        console.error('Login error1:', message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          
          const { message }: any = axiosError.response.data; // Update the type annotation to 'any'
        
          console.error('Error response from server', message);
        } else {

       
          console.error('Network error or other errors', axiosError.message);
        }
      } else {
    
        console.error('Non-Axios error', error);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;