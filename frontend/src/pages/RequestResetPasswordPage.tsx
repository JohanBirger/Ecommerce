import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import RequestResetPassword from '../components/RequestPasswordReset';

const RequestResetPasswordPage: React.FC = () => {
  return (
    <RequestResetPassword/>
  );
};

export default RequestResetPasswordPage;