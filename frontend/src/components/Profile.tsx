import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


enum UserRole {
    Admin = 'Admin',
    User = 'User',
  }
  
  interface User {
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

      const response = await axios.get('http://localhost:8000/auth/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = response.data;
      console.log(data.username)
      
      const user: User = {
        name: data.username,
        role: data.roles,
      };
      
      console.log(user);
      setProfile(user);

    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };



  return (
    <div className="max-w-xs mx-auto">
    <h1 className="text-2xl font-bold mb-4"></h1>
    {profile ? (
      <div>
        {profile.name}-{profile.role}
      </div>
      
    ) : (
      <p></p>
    )}
    
  </div>
  );
};

export default Profile;