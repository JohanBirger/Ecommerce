import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';



interface RegisterFormProps {
  closeRegister: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({closeRegister}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<string>('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/register', {
        username: username,
        email: email,
        password: password,
      });

      console.log('Registration successful:', response.data.message);
      setStatus('Success');
      // Handle successful registration (e.g., show success message, redirect to login page)
    } catch (error: any) {
      console.error('Registration error:', error.response?.data.message || error.message);
      setStatus(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="max-w-xs mx-auto ">
      <h2 className="text-2xl font-bold mb-2 md:mb-4 text-black">Create Account</h2>
      <form onSubmit={handleRegister} className="space-y-2  md:space-y-4">
        <div>
          <label className="block mb-1 text-black">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-1 py-1 rounded w-5/6 md:px-3 md:py-2  md:w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-black ">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 px-1 py-1 rounded w-5/6 md:px-3 md:py-2  md:w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-black ">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-1 py-1 rounded w-5/6 md:px-3 md:py-2  md:w-full"
          />
        </div>
        {status && <div className="text-red-500 mb-4">{status}</div>}
        <div className='flex justify-center items-center'>
        <button
          type="submit"
          className="btn-wide-action"
        >
          Create Account
        </button>
        </div>
        <div className='flex justify-center items-center'>
          <button
            onClick={closeRegister}
            className="btn-wide my-3"
            >
            Login
          </button>
          </div>
      </form>
      
    </div>
  );
};

export default RegisterForm;
