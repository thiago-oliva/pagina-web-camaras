import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Card, Button } from 'react-bootstrap';

const EmailConfirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpiar la URL después de la confirmación
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Card className="w-100" style={{ maxWidth: '500px' }}>
        <Card.Body className="text-center">
          <div className="mb-4">
            <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
          </div>
          <h2 className="mb-3">¡Email confirmado con éxito!</h2>
          <p className="mb-4">
            Tu cuenta ha sido verificada correctamente. Ahora puedes iniciar sesión y disfrutar de todos nuestros servicios.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/login')}
          >
            <i className="fas fa-sign-in-alt me-2"></i>
            Ir a Iniciar Sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmailConfirmed;