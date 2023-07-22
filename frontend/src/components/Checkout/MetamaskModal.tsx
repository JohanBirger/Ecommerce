import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import Metamask from './Metamask';
import { metamaskModalStateObservable, closeMetamaskModal } from '../../services/ModalService'



const MetamaskModal: React.FC = () => {
  const [isMetamaskModalOpen, setIsMetamaskModalOpen] = useState(false);
  Modal.setAppElement('#root'); // Replace '#root' with the ID or class of your root element
  useEffect(() => {
    const metamaskSubscription = metamaskModalStateObservable.subscribe((isOpen) => {
        setIsMetamaskModalOpen(isOpen);
        sessionStorage.setItem('metamaskModalOpen',JSON.stringify(isOpen));
    });
  
    return () => {
      
      metamaskSubscription.unsubscribe();
    };
  }, []);

  return (
    <Modal
        isOpen={isMetamaskModalOpen}
        onRequestClose={closeMetamaskModal}
        ariaHideApp={true}
        shouldCloseOnOverlayClick={false}
        contentLabel="Login Modal"
        style={{
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            width: 'auto',
            maxWidth: '30rem',
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
        <Metamask/>
    </Modal>   
  );
};

export default MetamaskModal;