import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import { openRegisterModal } from '../services/ModalService'
import { closeLoginModal } from '../services/ModalService'
import { loginUser } from '../services/sessionService';
import { fetchCart } from '../services/Cart/CartServices';
import {cross} from 'react-icons-kit/icomoon/cross';
import {Icon} from 'react-icons-kit';


const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status,setStatus] = useState('');
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

      const status = await loginUser(email,password);
      setStatus(status);
      fetchCart();
      closeLoginModal();

      navigate('/',{ replace: true });
      
  
  };

  return (
    <div className="max-w-xs mx-auto">
         <button 
        className="absolute top-0 right-0 m-2" 
        onClick={closeLoginModal}
        >
        <Icon icon = {cross}/>
      </button>
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
      <div><button onClick={closeLoginModal} > <Link to="/requestresetpassword"> Forgot Password</Link> </button></div>
    </div>
  );
};

export default LoginForm;
