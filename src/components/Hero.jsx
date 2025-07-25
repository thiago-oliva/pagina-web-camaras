import React from 'react';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <header className="hero-section" id="inicio">
      <div className="container text-center text-white py-5">
        <h1 className="display-4">Sistemas de Seguridad con Cámaras</h1>
        <p className="lead">Protege lo que más te importa con nuestra tecnología</p>
        <Link
          to="#productos"
          spy={true}
          smooth={true}
          offset={-70} // Ajusta este valor según la altura de tu navbar
          duration={500}
          className="btn btn-primary btn-lg mt-3"
        >
          Ver Productos
        </Link>
      </div>
    </header>
  );
};

export default Hero;