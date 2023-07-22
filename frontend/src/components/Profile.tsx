import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config.js';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import LogoutButton from './subcomponents/LogoutButton';
import LoginModal from './LoginModal';
import { openLoginModal } from '../services/ModalService'


enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

interface User {
  userId: string,
  name: string;
  role: UserRole;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.error('Access token not found');
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = response.data;

      const userId:any = await jwt_decode(access_token);
      

      const user: User = {
        userId: userId.sub,
        name: data.username,
        role: data.roles,
      };

      setProfile(user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="max-w-xs min-h-screen mx-auto">
      
      {profile ? (
        
        <div>
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div>
          <p>Username: {profile.name}</p>
          <p>Authorization: {profile.role}</p>
        </div>
         <div>
          <button className='btn-wide'>

          
         <Link to={`../orders/${profile.userId}`}><p className='text-black-500'>Orders</p></Link>
         </button>
         </div>
         
              <LogoutButton style={`btn-wide`}/>
         
         </div>
      ) : (
        <>
        <div className="relative ml-3 flex flex-col justify-center items-center">
              <p className='p-5'>Session Expired</p>
              <button className='btn-wide-contrast'
                onClick={openLoginModal}>
                Login
              </button>
              <LoginModal/>
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              
              </div>
            </div>
        </>
      )}
     
    </div>
  );
};

export default Profile;