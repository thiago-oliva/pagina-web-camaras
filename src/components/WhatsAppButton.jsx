import React from 'react';
import './WhatsAppButton.css'; // Opcional: para estilos específicos

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5491132042963" // Reemplaza con tu número
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contactar por WhatsApp"
    >
      <i className="fab fa-whatsapp whatsapp-icon"></i>
    </a>
  );
};

export default WhatsAppButton;