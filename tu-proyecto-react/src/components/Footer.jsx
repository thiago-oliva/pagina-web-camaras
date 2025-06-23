import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Tu Marca de Cámaras. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;