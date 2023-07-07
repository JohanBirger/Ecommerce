import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import NavLanding from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import MyAccount from './pages/MyAccount';
import AdminPage from './pages/Adminpage';


function App() {
  return (
    <Router>
      <NavLanding/>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />  
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/profile" element={<MyAccount />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;