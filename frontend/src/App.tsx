import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Nav from './components/Nav';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';



function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />  
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;