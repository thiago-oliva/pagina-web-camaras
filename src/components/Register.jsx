import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card, Spinner } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
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
        dni: formData.dni
      });
      
      // Mensaje de éxito con formato mejorado
      navigate('/login', { 
        state: { 
          success: (
            <div className="text-center">
              <h4 className="text-success mb-3">
                <i className="fas fa-check-circle me-2"></i>
                ¡Registro exitoso!
              </h4>
              <p className="mb-2">
                Hemos enviado un enlace de confirmación a:
              </p>
              <p className="fw-bold mb-3">{formData.email}</p>
              <p className="mb-1">
                Por favor revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
              </p>
              <p className="small text-muted mt-3">
                ¿No ves el email? Revisa tu carpeta de spam o solicita otro enlace.
              </p>
            </div>
          )
        },
        replace: true
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
          
          {error && (
            <Alert variant="danger" className="text-center">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tucorreo@ejemplo.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Mínimo 6 caracteres"
              />
              <Form.Text className="text-muted">
                La contraseña debe tener al menos 6 caracteres
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre completo *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: Juan Pérez"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DNI *</Form.Label>
              <Form.Control
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
                placeholder="Ej: 12345678"
                pattern="[0-9]{7,8}"
                title="Ingresa tu DNI sin puntos ni espacios"
              />
            </Form.Group>

            <Button 
              disabled={loading} 
              className="w-100 py-2" 
              variant="primary" 
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus me-2"></i>
                  Registrarse
                </>
              )}
            </Button>
            
            <div className="text-center mt-3">
              <p className="mb-0">
                ¿Ya tienes cuenta?{' '}
                <a href="/login" onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}>
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;