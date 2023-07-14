import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordPage: React.FC = () => {
  return (
    <ResetPassword/>
  );
};

export default ResetPasswordPage;
