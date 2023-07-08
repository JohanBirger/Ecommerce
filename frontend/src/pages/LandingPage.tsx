import React, {useState} from 'react';
import Products from '../components/Products';
import LoginModal from '../components/LoginModal'

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-white min-h-screen">
      <header className="moralis-blue text-white py-10 min-h-screen">
        <h1 className="text-6xl font-black  text-center mt-20">Exquisite Melons! </h1>
        <h1 className= "text-6xl font-black text-center">Only for members.</h1>
        <div className='text-white flex flex-col items-center mt-10 m-40'>
        <h1 className= "text-2xl font-200 text-center"> Embark on a Journey of Exquisite Fruit Experiences and Join a Community of Connoisseurs Redefining Palate Pleasure</h1>
        </div>
        <div className='flex justify-center items-center my-10'>
        <button className="btn-wide-contrast" onClick={openModal}>
         Become a Melon
        </button>
        </div>
        <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </header>
      <main className="container mx-auto py-8 w-full bg-white">
        <Products />
      </main>
      <footer className=" py-4">
        <p className="text-center text-gray-600">© 2023 Melon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;