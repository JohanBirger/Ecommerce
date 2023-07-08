import React, {useState} from 'react';

import LoginModal from '../components/LoginModal'
import Products from '../components/ProductContainer';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-full bg-white min-h-screen">
      <header className="moralis-blue text-white py-10 min-h-screen">
        <h1 className="text-6xl font-black text-center mt-20 pb-5">Exquisite Melons!</h1>
        <h2 className="text-6xl font-black text-center">Only for members.</h2>
        <div className="text-white flex flex-col items-center mt-10 mx-4 sm:mx-40">
          <h3 className="text-2xl font-semibold text-center">Embark on a Journey of Exquisite Fruit Experiences and Join a Community of Connoisseurs Redefining Palate Pleasure</h3>
        </div>
        <div className="flex justify-center items-center py-10">
          <div className="max-w-sm">
            <button className="btn-wide-contrast" onClick={openModal}>
              Become a Melon
            </button>
          </div>
        </div>
        <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </header>
      <main className=''>
        <Products />
      </main>
  </div>
  );
};

export default LandingPage;