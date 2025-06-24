import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <section id="nosotros" className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <div className="shadow-lg rounded overflow-hidden" style={{ maxWidth: '450px', margin: '0 auto' }}>
              <img
                src="https://via.placeholder.com/450x300?text=Logo+Empresa"
                alt="Logo temporal"
                className="img-fluid"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </Col>
          <Col md={6}>
            <h2 className="mb-4">¿Quiénes somos?</h2>
            <p className="lead">
              Somos una empresa que se dedica a la importación y distribución de equipos de seguridad.
            </p>
            
            <h3 className="mt-5 mb-3">Nuestro objetivo</h3>
            <p>
              Continuar teniendo siempre el mejor precio del mercado, ofreciendo productos de calidad 
              y soporte técnico especializado.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;