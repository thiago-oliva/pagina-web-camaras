import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { Modal, Button, Table } from 'react-bootstrap';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useContext(CartContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Función para extraer el valor numérico del precio
  const getPriceValue = (priceString) => {
    return parseFloat(priceString.replace(/[^0-9.]/g, '')) || 0;
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
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
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
                        onClick={() => {
                          // Simulamos agregar otro item igual
                          const productToAdd = {...item, quantity: 1};
                          removeFromCart(item.id); // Primero lo eliminamos
                          addToCart(productToAdd); // Luego lo agregamos de nuevo
                        }}
                      >
                        <i className="fas fa-plus"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end fw-bold">Total:</td>
                  <td colSpan="2" className="fw-bold">${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={clearCart} disabled={cart.length === 0}>
            Vaciar Carrito
          </Button>
          <Button variant="primary" disabled={cart.length === 0}>
            Finalizar Compra
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;