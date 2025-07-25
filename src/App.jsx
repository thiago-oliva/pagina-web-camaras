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
import WelcomeBanner from './components/WelcomeBanner';
import './components/CartAnimation.css';

function App() {
  // Corrección para mobile y padding
  useEffect(() => {
    const handleResizeAndScroll = () => {
      // Ajuste para mobile
      document.body.style.overflowX = 'hidden';
      document.body.style.minWidth = '320px';
      
      // Ajuste de padding para navbar mobile
      if (window.innerWidth < 992) {
        document.body.style.paddingBottom = '80px';
      } else {
        document.body.style.paddingBottom = '0';
      }

      // Scroll suave para anclas
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    handleResizeAndScroll();
    window.addEventListener('resize', handleResizeAndScroll);
    window.addEventListener('load', handleResizeAndScroll);

    return () => {
      window.removeEventListener('resize', handleResizeAndScroll);
      window.removeEventListener('load', handleResizeAndScroll);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="position-relative">
            <WelcomeBanner />
            <div className="content-wrapper">
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
            </div>
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