import React from 'react';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <header className="hero-section min-h-screen flex items-center justify-center bg-gray-900" id="inicio">
      <div className="container text-center text-white py-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Sistemas de Seguridad con Cámaras</h1>
        <p className="text-xl md:text-2xl mb-8">Protege lo que más te importa con nuestra tecnología</p>
        <Link
          to="productos"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
        >
          Ver Productos
        </Link>
      </div>
    </header>
  );
};

export default Hero;