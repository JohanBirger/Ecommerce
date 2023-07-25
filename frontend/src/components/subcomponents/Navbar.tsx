import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../index.css';
import logo from '../../watermelon.webp';
import LogoutButton from './../subcomponents/LogoutButton';
import IconCart from './../subcomponents/shoppingcart'
import IconUser from './../subcomponents/userIcon';
import LoginModal from '../../components/LoginModal';
import { openLoginModal } from '../../services/Modals/ModalService'
import {sessionStateObservable } from '../../services/sessionService';
import { HashLink } from 'react-router-hash-link';



const NavLanding = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const isLandingPage = location.pathname === '/';
  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
 

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

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);  

  return (
    <nav className={` ${isLandingPage ? 'transparent nav-fixed' : 'moralis-blue nav-sticky' } ${scrolled ? 'scrolled-nav' : ''} `}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
           
            <button type="button"  onClick={toggleMenu} className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:none focus:none " aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>

              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto" src={logo} alt="Your Company"/>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
              
        
              <HashLink to="/#products" className={`${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Products</HashLink>                
                
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          

          { loggedIn ? (
          <>
          <Link to="/cart" className={` ${scrolled ? 'text-black' : "text-white "} flex text-sm`} id="cart-button" aria-expanded="false" aria-haspopup="false">
                  <span className="sr-only">Open user menu</span>
                <IconCart 
                  text="" 
                  styleText={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300  rounded`} 
                  styleIcon={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 rounded h-7`}/>
              
                </Link>
          <div className="relative ml-3">
              <div>
                <Link to="/profile" className={` ${scrolled ? 'text-black' : "text-white "} flex text-sm pl-2`} id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                <IconUser 
                  text="" 
                  styleText={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300  rounded`} 
                  styleIcon={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 rounded h-7`}/>
              
                </Link>
              </div>
              

            
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              
              </div>
            </div>
          </>):
          (<>
          <div className="relative ml-3">
              
              <button className='btn-nav'
                onClick={openLoginModal}>
                Login
              </button>
              <LoginModal/>
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              
              </div>
            </div>
          
          </>)
            
          }           
            
          </div>
        </div>
      </div>

    {
      showMenu?(
      <>
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link to="/#products" className={`${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Products</Link>
          
        </div>
      </div>
      </>): null
    }
      

      
    </nav>
    
  );
};

export default NavLanding;
