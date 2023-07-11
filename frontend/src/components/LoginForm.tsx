import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import { BACKEND_URL } from '../config.js';
import { openRegisterModal } from '../services/ModalService'
import { closeLoginModal } from '../services/ModalService'



const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status,setStatus] = useState('');
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        email: email,
        password: password,
      });

      // Store the access token in local storage or state
      const { access_token } = response.data;
      await localStorage.setItem('access_token', access_token);
      setStatus('Success');
      // Redirect to the desired page or perform other actions
      closeLoginModal();

      navigate('/',{ replace: true });
      
    } catch (error: any) {
      
      console.error('Registration error:', error.response?.data.message || error.message);
      setStatus(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="max-w-xs mx-auto">
      <h2 className="text-2xl font-bold mb-2 md:mb-4 text-black">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
        <div>
          <label className="block mb-1 text-black">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-1 py-1 rounded w-4/5 md:px-3 md:py-2  md:w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-black">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-1 py-1 rounded w-4/5 md:px-3 md:py-2  md:w-full"
          />
        </div>
        {status && <div className="text-red-500 mb-4">{status}</div>}
        <div className="flex justify-center items-center">
          <button type="submit" className="btn-wide-action">Login</button>
        </div>
        
        <RegisterModal/>
      
      </form>
      <div className="flex justify-center items-center">
        <button onClick={openRegisterModal} className="btn-wide mt-2">Create Account</button>
      </div>
      <div><button onClick={closeLoginModal} > <Link to="/resetpassword"> Forgot Password</Link> </button></div>
    </div>
  );
};

export default LoginForm;
