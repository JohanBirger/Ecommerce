import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import logo from '../watermelon.webp';
import LogoutButton from './subcomponents/LogoutButton';
import IconCart from './subcomponents/shoppingcart'
import IconUser from './subcomponents/userIcon';
import LoginModal from '../components/LoginModal';
import { openLoginModal } from '../services/ModalService'
import { rolesStateObservable, fetchRoles, Role } from '../services/RolesService'


const NavLanding = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const rolesSubscription = rolesStateObservable.subscribe((userRoles) => {
      setRoles(userRoles);
    });
    fetchRoles();
    return () => {
      rolesSubscription.unsubscribe();
    };
  }, [location]);

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
    <nav className={` ${isLandingPage ? 'transparent nav-fixed' : 'moralis-blue nav-sticky' } ${scrolled ? 'scrolled-nav' : ''}`}>
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center" >
          <img src={logo} alt="logo" className="h-8 px-2" />
          <p className={` ${scrolled ? 'text-black' : "text-white "} text-2xl font-bold`}>Melon</p>
        </Link>

        <div className="text-white hover:text-gray-300 px-2 py-1 rounded">
          <Link className="block sm:hidden" to="/cart">
            <IconCart text="" 
                      styleText={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-3 rounded`} 
                      styleIcon={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 rounded h-7`}/>
          </Link>
        </div>

        
        <button
          className={` ${scrolled ? 'text-black' : "text-white "} block sm:hidden hover:text-gray-300 focus:outline-none`}
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {showMenu ? (
              <path
                className=""
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            ) : (
              <path
                className="block"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            )}
          </svg>
        </button>

        <ul className="hidden sm:flex sm:items-center sm:justify-between">
          <li>
            <Link
              to="/#products"
              className={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-3  rounded`}
              onClick={() => {
                const productsElement = document.getElementById('products');
                if (productsElement) {
                  productsElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              
              Products
            </Link>
          </li>
          {roles.includes(Role.User) || roles.includes(Role.Admin) ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-2 py-1 rounded`}
                >
                  <IconUser 
                    text="My Account" 
                    styleText={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-3 rounded`} 
                    styleIcon={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 rounded h-7`}/>
                </Link>
              </li>
              <li>
                <LogoutButton style={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-3  rounded`}/>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={openLoginModal}>
                  <IconUser 
                    text="Login" 
                    styleText={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-3 rounded`} 
                    styleIcon={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 rounded h-7`}/>
                </button>
                <LoginModal/>
              </li>
            </>
          )}

          <li>
            <Link
              to="/cart"
              className="text-white hover:text-gray-300 px-2 py-1 rounded"
            >
              <IconCart text="Shopping Cart" 
                        styleText={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-3 rounded`} 
                        styleIcon={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 rounded h-7`}/>
            </Link>
          </li>
        </ul>
      </div>

      {showMenu && (roles.includes(Role.User) || roles.includes(Role.Admin)) &&  (
        <>
        
        <li className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-end  flex flex-col lg:h-auto'>
                <Link
                  to="/profile"
                  className={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300  px-3 md:px-2 py-1 rounded`}
                >
                  <IconUser 
                    text="My Account" 
                    styleText={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-3 rounded`} 
                    styleIcon={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 rounded h-7`}/>
                </Link>
              </li>
              <li className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-end  flex flex-col lg:h-auto'>
                <LogoutButton style={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-3 md:px-3  rounded`}/>
              </li>
       
        </>
        )
      }
      {showMenu && roles.includes(Role.Admin) &&  (
       <>
      
       <li className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-end  flex flex-col lg:h-auto'>
           <Link
             to="/admin"
             className={` ${scrolled ? 'text-black' : "text-white "} hover:text-gray-300 px-3 py-1 rounded`}
           >
             Update Products
           </Link>
         </li>
      
     </>
        )
      }
      {showMenu &&!(roles.includes(Role.User)|| roles.includes(Role.Admin))&&(
        <>
        
        <ul className="sm:hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto">
    <li className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-end  flex flex-col lg:h-auto'>
      <button onClick={openLoginModal}>
        <IconUser
          text="Login"
          styleText={` ${scrolled ? 'text-black' : 'text-white'}  px-2 py-1 rounded`}
          styleIcon={` ${scrolled ? 'text-black' : 'text-white'}  px-2 py-1 rounded`}
        />
        <LoginModal />
      </button>
    </li>
  </ul>
        </>
      )}
    </nav>
    
  );
};

export default NavLanding;
