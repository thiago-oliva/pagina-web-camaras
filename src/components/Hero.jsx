import React from 'react';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <header className="min-vh-100 d-flex align-items-center bg-dark text-white" id="inicio" style={{ background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))' }}>
      <div className="container text-center py-5">
        <h1 className="display-4 fw-bold mb-4">Sistemas de Seguridad con Cámaras</h1>
        <p className="lead mb-5 fs-4">Protege lo que más te importa con nuestra tecnología</p>
        <Link
          to="productos"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="btn btn-primary btn-lg px-5 py-3 fw-bold"
        >
          Ver Productos
        </Link>
      </div>
    </header>
  );
};

export default Hero;