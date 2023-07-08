import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LogoutButtonProps {
  onLogout: () => void;
  style: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout,style }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/auth/logout');
      localStorage.removeItem('access_token');
      onLogout(); // Call the callback function passed as prop
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout} className={style}>
      Logout
    </button>
  );
};

export default LogoutButton;