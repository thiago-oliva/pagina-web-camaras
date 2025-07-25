import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import './components/CartAnimation.css';

function App() {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        document.body.style.paddingBottom = '70px';
      } else {
        document.body.style.paddingBottom = '0';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registrar" element={<Register />} />
              <Route path="/admin" element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              <Route path="/" element={
                <>
                  <Hero />
                  <Products />
                  <AboutUs />
                  <Contact />
                </>
              } />
            </Routes>
          </main>
          <WhatsAppButton />
          <Cart />
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;