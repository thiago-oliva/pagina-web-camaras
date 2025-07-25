import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const LoadingScreen = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-3">Cargando Lococo's...</p>
      </div>
    </Container>
  );
};

export default LoadingScreen;