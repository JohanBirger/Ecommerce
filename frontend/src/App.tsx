import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import NavLanding from './components/Navbar';
import CartPage from './pages/CartPage';
import MyAccount from './pages/MyAccount';
import AdminPage from './pages/Adminpage';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <NavLanding/>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/profile" element={<MyAccount />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;