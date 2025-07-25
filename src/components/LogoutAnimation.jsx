import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './LogoutAnimation.css';

const LogoutAnimation = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Spinner animation="grow" variant="primary" />
      <p className="mt-3">Cerrando sesión...</p>
    </Container>
  );
};

export default LogoutAnimation;