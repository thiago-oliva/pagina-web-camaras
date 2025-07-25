import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = '5491132042963';
  const defaultMessage = encodeURIComponent('Hola, me gustaría recibir más información sobre sus productos de seguridad.');

  return (
    <div className="whatsapp-container">
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contactar por WhatsApp"
        style={{ textDecoration: 'none' }} // Elimina el subrayado directamente aquí
      >
        <i className="fab fa-whatsapp whatsapp-icon"></i>
        <span className="whatsapp-tooltip">¿Necesitas ayuda?</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;