import Modal from 'react-modal';
import RegisterForm from './RegisterForm';


interface RegisterModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onRequestClose }) => {
  const closeRegister = () => {
    onRequestClose(); // Call the onRequestClose function provided as a prop
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
      <RegisterForm closeRegister={closeRegister} /> {/* Pass the closeRegister prop */}
    </Modal>
  );
};

export default RegisterModal;
