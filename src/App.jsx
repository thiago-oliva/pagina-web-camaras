import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { AuthProvider, useAuth } from './components/AuthContext';
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
import LogoutAnimation from './components/LogoutAnimation';
import AuthRedirect from './components/AuthRedirect';
import LoadingScreen from './components/LoadingScreen';
import './components/CartAnimation.css';

function AppContent() {
  const { loading, logoutLoading } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResizeAndScroll = () => {
      document.body.style.overflowX = 'hidden';
      document.body.style.minWidth = '320px';
      
      if (window.innerWidth < 992) {
        document.body.style.paddingBottom = '80px';
      } else {
        document.body.style.paddingBottom = '0';
      }

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

  if (initialLoad || loading) {
    return <LoadingScreen />;
  }

  if (logoutLoading) {
    return <LogoutAnimation />;
  }

  return (
    <>
      <Navbar />
      <main className="position-relative">
        <WelcomeBanner />
        <div className="content-wrapper">
          <Routes>
            <Route path="/login" element={
              <>
                <AuthRedirect />
                <Login />
              </>
            } />
            <Route path="/registrar" element={
              <>
                <AuthRedirect />
                <Register />
              </>
            } />
            <Route path="/email-confirmed" element={<EmailConfirmed />} />
            <Route path="/logout" element={
              <PrivateRoute>
                <LogoutAnimation />
              </PrivateRoute>
            } />
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
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;