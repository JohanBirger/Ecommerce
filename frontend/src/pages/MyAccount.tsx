import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';

const MyAccount: React.FC = () => {
  return (
    <div className='container m-auto py-10'>
      <Profile/>
    </div>
  );
};

export default MyAccount;