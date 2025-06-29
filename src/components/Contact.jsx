import React from 'react';

const Contact = () => {
  return (
    <section id="contacto" className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Contacto y Ubicación</h2>
        <div className="row">
          <div className="col-md-6 mb-4 order-md-1 order-2"> {/* Mapa abajo en mobile */}
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.220144724576!2d-58.47090792422799!3d-34.59898037295632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb60bcf3d7c9d%3A0x1f8b0c8e6d5f5b5e!2sAlejandro%20Magari%C3%B1os%20Cervantes%201928%2C%20C1416DYN%20CABA!5e0!3m2!1ses-419!2sar!4v1620000000000!5m2!1ses-419!2sar"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Ubicación de Lococo's Security"
                className="rounded shadow"
              ></iframe>
            </div>
          </div>
          <div className="col-md-6 order-md-2 order-1"> {/* Info contacto arriba */}
            <div className="bg-light p-4 rounded shadow">
              <h4 className="mb-4">Información de contacto</h4>
              
              <div className="mb-4">
                <h5>Direcciones</h5>
                <p className="mb-2">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  <strong>Sede Central:</strong> Alejandro Magariños Cervantes 1928, Comuna 11, C1416DYN CABA
                </p>
                <p className="mb-2">
                  <i className="fas fa-warehouse text-primary me-2"></i>
                  <strong>Depósitos:</strong> Consultar ubicaciones adicionales
                </p>
              </div>

              <div className="mb-4">
                <h5>Teléfonos</h5>
                <p className="mb-2">
                  <i className="fas fa-phone text-primary me-2"></i>
                  <strong>Ventas al público:</strong> +54 9 11 2574-8954
                </p>
                <p className="mb-2">
                  <i className="fas fa-users text-primary me-2"></i>
                  <strong>Ventas a gremios:</strong> +54 9 11 3204-2963
                </p>
                <p className="mb-2">
                  <i className="fas fa-building text-primary me-2"></i>
                  <strong>Ventas mayoristas:</strong> +54 9 11 3204-2963<br/>
                  <small className="text-muted">(Avisar que es compra mayorista)</small>
                </p>
              </div>

              <div className="mb-4">
                <h5>Horario de atención</h5>
                <p className="mb-2">
                  <i className="far fa-clock text-primary me-2"></i>
                  Lunes a Viernes: 10:00 - 13:00 hs y 14:00 - 18:00 hs
                </p>
                <p className="mb-2">
                  <i className="far fa-clock text-primary me-2"></i>
                  Sábados: 10:00 - 13:00 hs
                </p>
                <p>
                  <i className="fas fa-envelope text-primary me-2"></i>
                  Email: guxotech@gmail.com
                </p>
              </div>

              <div className="mt-4">
                <h5>Seguinos en redes</h5>
                <div className="d-flex">
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
        </div>
      </div>
    </section>
  );
};

export default Contact;