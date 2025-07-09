import React, { useEffect } from 'react';
import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Cart from './components/Cart';
import './components/CartAnimation.css'; // Asegúrate de crear este archivo

function App() {
  // Efecto para añadir padding al body cuando el navbar móvil está activo
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        document.body.style.paddingBottom = '70px';
      } else {
        document.body.style.paddingBottom = '0';
      }
    };

    // Ejecutar al montar y cuando cambie el tamaño
    handleResize();
    window.addEventListener('resize', handleResize);

    // Limpiar el event listener al desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <CartProvider>
      {/* Navbar ahora contiene ambas versiones (desktop y mobile) */}
      <Navbar />
      
      <main>
        <Hero />
        <Products />
        <AboutUs />
        <Contact />
      </main>

      {/* Componentes flotantes */}
      <WhatsAppButton />
      <Cart />
      
      <Footer />
    </CartProvider>
  );
}

export default App;