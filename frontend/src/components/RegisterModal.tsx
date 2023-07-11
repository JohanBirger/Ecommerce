import Modal from 'react-modal';
import RegisterForm from './RegisterForm';
import {useState,useEffect} from 'react';
import { registerModalStateObservable, closeRegisterModal } from '../services/ModalService'




const RegisterModal: React.FC= () => {
  const [isRegisterModalOpen,setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    
    const registerSubscription = registerModalStateObservable.subscribe((isOpen) => {
      setIsRegisterModalOpen(isOpen);
    });
  
    return () => {
      registerSubscription.unsubscribe();
    };
  }, []);

  return (
    <Modal
      isOpen={isRegisterModalOpen}
      onRequestClose={closeRegisterModal}
      contentLabel="Register Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
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
      <RegisterForm /> 
    </Modal>
  );
};

export default RegisterModal;
