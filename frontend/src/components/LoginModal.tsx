import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import { loginModalStateObservable, closeLoginModal } from '../services/ModalService'



const LoginModal: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
 
  useEffect(() => {
    const registerSubscription = loginModalStateObservable.subscribe((isOpen) => {
      setIsLoginModalOpen(isOpen);
    });
  
    return () => {
      registerSubscription.unsubscribe();
    };
  }, []);

  return (
    <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
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
        <LoginForm/>
    </Modal>   
  );
};

export default LoginModal;