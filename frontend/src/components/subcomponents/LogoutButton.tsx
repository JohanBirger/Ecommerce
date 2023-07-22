import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, logoutUser } from '../../services/sessionService';

interface LogoutButtonProps {
  style: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ style }) => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await logoutUser();
    console.log(await getSession())
    
    navigate('/', { replace: true });
  }, []);

  return (
    <button onClick={handleLogout} className={style}>
      Logout
    </button>
  );
};

export default LogoutButton;