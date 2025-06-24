import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logoEmpresa from '../assets/logo-empresa.png'; // Asegúrate de tener esta imagen

const AboutUs = () => {
  return (
    <section id="nosotros" className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img 
              src={logoEmpresa} 
              alt="Logo de la empresa" 
              className="img-fluid" 
              style={{ maxHeight: '300px' }}
            />
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