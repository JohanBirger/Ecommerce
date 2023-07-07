import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import logo from '../watermelon.png';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import LogoutButton from './LogoutButton';
import IconCart from '../icons/shoppingcart'
import IconUser from '../icons/userIcon';

const NavLanding = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  enum Role {
    User = 'user',
    Admin = 'admin',
  }

  const fetchRoles = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.log('Access token not found');
        return;
      }

      const decodedToken: { roles: Role[] } = jwt_decode(access_token);
      const userRoles = decodedToken.roles;
      setRoles(userRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleLogout = () => {
    setRoles([]); // Update the roles state when logging out
  };

  useEffect(() => {
    fetchRoles();
  }, [location]);

  return (
    <nav className="bg-gray-800">
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/">
          <img src={logo} alt="logo" className="h-8" />
        </Link>
        {roles.includes(Role.Admin) && (
        
            <>
            <ul>
              <li>
                <Link
                  to="/admin"
                  className="text-white hover:text-gray-300 px-2 py-1 rounded"
                >
                  Update Product
                </Link>
              </li>
          </ul>
            </>
          ) }
        <button
          className="block sm:hidden text-white hover:text-gray-300 focus:outline-none"
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
              to="/"
              className="text-white hover:text-gray-300 px-2 py-1 rounded"
            >
              Products
            </Link>
          </li>
          {roles.includes(Role.User) || roles.includes(Role.Admin) ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-300 px-2 py-1 rounded"
                >
                  My Account
                </Link>
              </li>
              <li>
                <LogoutButton onLogout={handleLogout} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 px-2 py-1 rounded"
                >
                  <IconUser text="Login"/>
                  
                </Link>
              </li>
            </>
          )}
          

          <li>
            <Link
              to="/cart"
              className="text-white hover:text-gray-300 px-2 py-1 rounded"
            >
                   <IconCart/>
            </Link>
          </li>
        </ul>
      </div>

      {showMenu && (
        <ul className="sm:hidden flex flex-col items-center justify-center px-4 py-2">
          <li>
            <Link
              to="/"
              className="block text-white hover:text-gray-300 py-1 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block text-white hover:text-gray-300 py-1 rounded"
            >
                <IconUser text="Login"/>
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className="block text-white hover:text-gray-300 py-1 rounded"
            >
              Cart
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavLanding;
