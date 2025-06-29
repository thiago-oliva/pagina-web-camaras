import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = '5491132042963'; // Reemplaza con tu número
  const defaultMessage = encodeURIComponent('Hola, me gustaría recibir más información sobre sus productos de seguridad.');

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${defaultMessage}`, '_blank');
  };

  return (
    <div className="whatsapp-container">
      <button 
        onClick={handleClick}
        className="whatsapp-float"
        aria-label="Contactar por WhatsApp"
      >
        <i className="fab fa-whatsapp whatsapp-icon"></i>
      </button>
      <span className="whatsapp-tooltip">¿Necesitas ayuda?</span>
    </div>
  );
};

export default WhatsAppButton;