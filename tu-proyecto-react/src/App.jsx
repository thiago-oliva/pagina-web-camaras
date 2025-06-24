import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;