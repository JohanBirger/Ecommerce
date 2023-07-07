// frontend/src/pages/RegisterPage.tsx
import React from 'react';
import RegisterForm from '../components/RegisterForm';


const RegisterPage: React.FC = () => {
  return (
    <div className='container m-auto py-10'>
      <RegisterForm/>
    </div>
  );
};

export default RegisterPage;