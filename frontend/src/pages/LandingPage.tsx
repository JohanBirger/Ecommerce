import React, {useState, useEffect}from 'react';
import LoginModal from '../components/LoginModal'
import Products from '../components/Products';
import {openLoginModal } from '../services/ModalService';
import Header from '../components/subcomponents/Header'
import { sessionStateObservable } from '../services/sessionService'


const LandingPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const sessionSubscription = sessionStateObservable.subscribe((session) => {
      const isLoggedIn = session?.loggedIn;
      if(isLoggedIn){
        setLoggedIn(isLoggedIn);
      }
      else{
        setLoggedIn(false);
      }
    });

    return () => {
      sessionSubscription.unsubscribe();
    };
  }, []);

  return (
    <div className="w-full bg-white min-h-screen">
      <Header>
        <h1 className="text-4xl md:text-6xl font-black text-center mt-20 pb-5">Exquisite Melons!</h1>
        <h2 className="text-4xl md:text-6xl font-black text-center">Only for members.</h2>
        <div className="text-white flex flex-col items-center mt-10 mx-4 sm:mx-40">
          <h3 className="md:text-2xl md:font-semibold text-center text-lg">Embark on a Journey of Exquisite Fruit Experiences and Join a Community of Connoisseurs Redefining Palate Pleasure</h3>
        </div>
        {!loggedIn&&
          <div className="flex justify-center items-center py-10">
          <div className="max-w-sm pt-5">
            <button className="btn-big-wide-contrast" onClick={openLoginModal}>
              Become a Melonist
            </button>
          </div>
        </div>
        }
        
        <LoginModal />
      </Header>
      <main className=''>
        <Products />
      </main>
  </div>
  );
};

export default LandingPage;