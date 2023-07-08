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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            width: 'auto',
            maxWidth: '24rem',
            maxHeight: '30rem',
            height: 'auto',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        },
        }}
    >
        <LoginForm onRequestClose={onRequestClose} />
    </Modal>   
  );
};

export default LoginModal;