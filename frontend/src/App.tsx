import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import NavLanding from './components/subcomponents/Navbar';
import CartPage from './pages/CartPage';
import MyAccount from './pages/MyAccount';
import AdminPage from './pages/Adminpage';
import Footer from './components/subcomponents/Footer';
import SecurityPage from './pages/SecurityPage'
import RequestResetPasswordPage from './pages/RequestResetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import {initVisitor } from './services/sessionService';
import ImagePage from './pages/ImagePage';
import OneProductPage from './pages/OneProductPage';
import OrdersPage from './pages/OrdersPage';



function App() {
 
  initVisitor();
  return (
    <Router>
      <NavLanding/>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/profile" element={<MyAccount />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/requestresetpassword" element={<RequestResetPasswordPage />} />
      <Route path="/resetpassword/*" element={<ResetPasswordPage />} />
      <Route path="/products/*" element={<OneProductPage/>}/>
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/images" element={<ImagePage />} />
      <Route path="/orders/*" element={<OrdersPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;