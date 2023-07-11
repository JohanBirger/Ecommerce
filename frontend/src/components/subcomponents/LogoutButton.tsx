import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../config.js';
import { rolesStateObservable } from '../../services/RolesService';

interface LogoutButtonProps {
  style: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ style }) => {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`);
      localStorage.removeItem('access_token');
      setIsLoggedOut(true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  useEffect(() => {
    const rolesSubscription = rolesStateObservable.subscribe((userRoles) => {
      if (isLoggedOut) {
        navigate('/', { replace: true });
      }
    });

    return () => {
      rolesSubscription.unsubscribe();
    };
  }, [isLoggedOut, navigate]);

  return (
    <button onClick={handleLogout} className={style}>
      Logout
    </button>
  );
};

export default LogoutButton;