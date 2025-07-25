import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Card, Spinner } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { supabase } from '../supabaseClient';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await register(email, password, {
        nombre,
        apellido,
        dni,
        role: 'client' // Cambiar a 'admin' si es necesario
      });
      
      // Redirigir a página de éxito o login con mensaje
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
          <h2 className="text-center mb-4">Registrar Nuevo Cliente</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                value={apellido} 
                onChange={(e) => setApellido(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control 
                type="text" 
                value={dni} 
                onChange={(e) => setDni(e.target.value)} 
                required 
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" />
                  <span className="ms-2">Registrando...</span>
                </>
              ) : 'Registrar Cliente'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;