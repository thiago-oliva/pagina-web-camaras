import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import { Modal, Button, Table, Alert, Form } from 'react-bootstrap';
import { supabase } from '../supabaseClient';
import './Cart.css';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart, total } = useContext(CartContext);
  const { user, isClient } = useAuth();
  const [show, setShow] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    notas: ''
  });

  const handleClose = () => {
    setShow(false);
    setOrderSuccess(false);
    setError('');
    setShippingInfo({
      nombre: '',
      direccion: '',
      telefono: '',
      notas: ''
    });
  };
  
  const handleShow = () => setShow(true);

  const getPriceValue = (priceString) => {
    return parseFloat(priceString.replace(/[^0-9.]/g, '')) || 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!isClient()) {
      setError('Debes iniciar sesión como cliente para completar la compra');
      return;
    }

    // Validar información básica
    if (!shippingInfo.nombre || !shippingInfo.direccion || !shippingInfo.telefono) {
      setError('Por favor completa los campos obligatorios (*)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Crear la venta en Supabase
      const { data: newVenta, error: ventaError } = await supabase
        .from('ventas')
        .insert([{
          punto_venta_id: 1, // Punto de venta online
          cliente_id: user.id,
          fecha: new Date().toISOString(),
          total: total * 1.21, // Aplicar IVA
          estado: 'pendiente',
          vendedor_id: user.id, // El cliente es su propio vendedor en compras online
          forma_pago: 'online',
          observaciones: shippingInfo.notas,
          direccion_entrega: shippingInfo.direccion,
          telefono_contacto: shippingInfo.telefono
        }])
        .select()
        .single();

      if (ventaError) throw ventaError;

      // Crear detalles de venta
      const detallesVenta = cart.map(item => ({
        venta_id: newVenta.id,
        producto_id: item.id,
        cantidad: item.quantity,
        precio_unitario: getPriceValue(item.price),
        descuento: 0
      }));

      const { error: detalleError } = await supabase
        .from('ventas_detalle')
        .insert(detallesVenta);

      if (detalleError) throw detalleError;

      // Éxito - limpiar carrito y mostrar confirmación
      clearCart();
      setOrderSuccess(true);
    } catch (err) {
      console.error('Error al crear la orden:', err);
      setError('Error al procesar la compra. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        variant="primary" 
        onClick={handleShow} 
        className="cart-button" 
      >
        <i className="fas fa-shopping-cart"></i>
        {cart.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderSuccess ? (
            <Alert variant="success">
              <Alert.Heading>¡Orden creada con éxito!</Alert.Heading>
              <p>
                Tu orden #12345 ha sido registrada. 
                <br />
                <strong>Próximos pasos:</strong>
                <ol>
                  <li>Te contactaremos para confirmar disponibilidad</li>
                  <li>Coordinaremos método de pago</li>
                  <li>Prepararemos tu pedido para envío o retiro</li>
                </ol>
                <strong>Gracias por tu compra.</strong>
              </p>
            </Alert>
          ) : cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <>
              {error && <Alert variant="danger">{error}</Alert>}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={`${item.id}-${Date.now()}`}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>${getPriceValue(item.price).toFixed(2)}</td>
                      <td>${(getPriceValue(item.price) * item.quantity).toFixed(2)}</td>
                      <td>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => removeFromCart(item.id)}
                          className="me-2"
                        >
                          <i className="fas fa-minus"></i>
                        </Button>
                        <Button 
                          variant="success" 
                          size="sm" 
                          onClick={() => addToCart({...item, quantity: 1})}
                        >
                          <i className="fas fa-plus"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end fw-bold">Subtotal:</td>
                    <td colSpan="2" className="fw-bold">${total.toFixed(2)}</td>
                  </tr>
                  {isClient() && (
                    <tr>
                      <td colSpan="3" className="text-end fw-bold">IVA (21%):</td>
                      <td colSpan="2" className="fw-bold">${(total * 0.21).toFixed(2)}</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="3" className="text-end fw-bold">Total:</td>
                    <td colSpan="2" className="fw-bold">
                      ${isClient() ? (total * 1.21).toFixed(2) : total.toFixed(2)}
                      {!isClient() && <small className="text-muted d-block">+IVA (visible al iniciar sesión)</small>}
                    </td>
                  </tr>
                </tfoot>
              </Table>

              {/* Formulario de envío */}
              {isClient() && (
                <div className="mt-4">
                  <h5>Información de Envío/Retiro</h5>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre completo *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="nombre"
                        value={shippingInfo.nombre || (user?.user_metadata?.full_name || '')}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Dirección de envío *</Form.Label>
                      <Form.Control 
                        as="textarea"
                        rows={2}
                        name="direccion"
                        value={shippingInfo.direccion}
                        onChange={handleInputChange}
                        required
                        placeholder="Calle, número, ciudad, provincia"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono de contacto *</Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="telefono"
                        value={shippingInfo.telefono}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Notas adicionales</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2}
                        name="notas"
                        value={shippingInfo.notas}
                        onChange={handleInputChange}
                        placeholder="Instrucciones especiales, horarios de entrega, etc."
                      />
                    </Form.Group>
                  </Form>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {orderSuccess ? 'Cerrar' : 'Seguir Comprando'}
          </Button>
          <Button variant="danger" onClick={clearCart} disabled={cart.length === 0 || orderSuccess}>
            Vaciar Carrito
          </Button>
          <Button 
            variant="primary" 
            onClick={handleCheckout} 
            disabled={cart.length === 0 || orderSuccess || loading}
          >
            {loading ? 'Procesando...' : isClient() ? 'Confirmar Compra' : 'Iniciar Sesión para Comprar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;