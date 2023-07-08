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
          width: '24rem',
          height: '30rem',
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column', 
          justifyContent: 'center',
        },
      }}
    >
      <RegisterForm />
      <div className='flex justify-center items-center'>
      <button
        onClick={closeRegister}
        className="btn-wide my-3"
      >
        Login
      </button>
      </div>
    </Modal>
  );
};

export default RegisterModal;
