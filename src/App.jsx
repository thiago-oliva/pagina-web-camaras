import React from 'react';
import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import WhatsAppButton from './components/WhatsAppButton'; 

function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <AboutUs />
        <Contact />
      </main>
      <WhatsAppButton />
      <Cart />
      <Footer />
    </CartProvider>
  );
}

export default App;