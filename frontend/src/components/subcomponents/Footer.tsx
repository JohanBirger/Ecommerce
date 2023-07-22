import {Link} from 'react-router-dom';
import '../../index.css'

const Footer = () => {
  return (
    <footer className="space-color text-white py-4 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <ul className="flex space-x-4 text-white text-sm">
              <li>
                <Link to="/security" className="hover:text-gray-300">Privacy Policy</Link>
              </li>
              <li>
              <Link to="/" className="hover:text-gray-300">Terms</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">Coookie Policy</Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-gray-300">Security Policy</Link>
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