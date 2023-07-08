import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <ul className="flex space-x-4 text-white text-sm">
              <li>
                <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Terms</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Security Policy</a>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0 text-white">
            <p>&copy; 2023 Melon. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};




export default Footer;