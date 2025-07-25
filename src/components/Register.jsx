import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card, Spinner } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    dni: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await register(formData.email, formData.password, {
        nombre: formData.nombre,
        apellido: formData.apellido,
        dni: formData.dni
      });
      
      navigate('/login', { 
        state: { 
          message: 'Registro exitoso. Por favor inicia sesión.' 
        } 
      });
    } catch (err) {
      setError(err.message || 'Error al registrar. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Card className="w-100" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Registro de Usuario</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" />
                  <span className="ms-2">Registrando...</span>
                </>
              ) : 'Registrarse'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;