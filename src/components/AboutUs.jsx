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
                src={process.env.PUBLIC_URL + "/assets/lococos-logo.jpg"}                
                alt="Logo Lococo's"
                className="img-fluid"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </Col>
          <Col md={6}>
            <h2 className="mb-4">Lococo's</h2>
            <p className="lead">
              ¡Somos importadores y distribuidores líderes en equipos de seguridad, dedicados a la venta mayorista y minorista!
            </p>
            
            <h3 className="mt-4 mb-3">Nuestra misión</h3>
            <p>
              Ofrecer los mejores precios del mercado con productos de máxima calidad. Ayudamos a empresas y particulares a proteger lo que más valoran, adaptándonos a cada necesidad con soluciones personalizadas.
            </p>

            <h3 className="mt-4 mb-3">Nuestra trayectoria</h3>
            <p>
              Con sede central y 4 depósitos estratégicos, facilitamos la logística a nuestros clientes. Fundada en 2006, hemos crecido manteniendo nuestro compromiso con la excelencia, ganando reconocimiento en el sector de seguridad electrónica.
            </p>

            <h3 className="mt-4 mb-3">Nuestro diferencial</h3>
            <p>
              - Atención personalizada para cada tipo de cliente<br/>
              - Stock permanente en 5 ubicaciones<br/>
              - Asesoramiento técnico especializado<br/>
              - Precios competitivos para mayoristas y minoristas
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;