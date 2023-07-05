import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        email: email,
        password: password,
      });

      console.log('Registration successful:', response.data.message);
      // Handle successful registration (e.g., show success message, redirect to login page)
    } catch (error: any) {
      if (error.response) {
        console.error('Registration error:', error.response.data.message);
        // Handle registration error (e.g., show error message to the user)
      } else {
        console.error('Registration error:', error.message);
        // Handle other types of errors
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
