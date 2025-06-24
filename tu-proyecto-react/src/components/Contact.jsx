import React from 'react';

const Contact = () => {
  return (
    <section id="contacto" className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Contacto</h2>
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Nombre" required />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="mb-3">
                <input type="tel" className="form-control" placeholder="Teléfono" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" rows="5" placeholder="Mensaje" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
          <div className="col-md-6">
            <h4>Información de contacto</h4>
            <p><i className="fas fa-map-marker-alt me-2"></i> Dirección de tu local/emprendimiento</p>
            <p><i className="fas fa-phone me-2"></i> Teléfono: +54 11 1234-5678</p>
            <p><i className="fas fa-envelope me-2"></i> Email: info@tumarca.com</p>
            <p><i className="fas fa-clock me-2"></i> Horario: Lunes a Viernes 9-18hs</p>
            
            <div className="mt-4">
              <h5>Seguinos en redes</h5>
              <a 
                href="https://www.facebook.com/p/Guxotech-100068367043904/" 
                className="me-3 text-dark social-icon" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Visítanos en Facebook"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a 
                href="https://www.instagram.com/guxotech/" 
                className="me-3 text-dark social-icon" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Síguenos en Instagram"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a 
                href="https://wa.me/5491132042963" 
                className="me-3 text-dark social-icon" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Contáctanos por WhatsApp"
              >
                <i className="fab fa-whatsapp fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;