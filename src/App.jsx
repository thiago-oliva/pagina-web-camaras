import React, { useState } from 'react';
import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Cart from './components/Cart';

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      <Navbar setShowCart={setShowCart} />
      <main>
        <Hero />
        <Products />
        <AboutUs />
        <Contact />
      </main>
      <WhatsAppButton />
      <Cart show={showCart} onHide={() => setShowCart(false)} />
      <Footer />
    </CartProvider>
  );
}

export default App;