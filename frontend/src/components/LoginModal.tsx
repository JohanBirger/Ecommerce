import React, { useState } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';


interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose }) => {
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        content: {
          width: '24rem',
          height: '30rem',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <LoginForm />
      
    </Modal>    
  );
};

export default LoginModal;