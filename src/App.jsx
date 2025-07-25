import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import EmailConfirmed from './components/EmailConfirmed';
import './components/CartAnimation.css';

function App() {
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

      // Manejar tokens de autenticación en la URL
      if (window.location.hash.includes('access_token')) {
        window.history.replaceState({}, document.title, window.location.pathname);
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
                <Route path="/email-confirmed" element={<EmailConfirmed />} />
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