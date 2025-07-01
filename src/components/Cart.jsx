import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Modal, Button, Table } from 'react-bootstrap';
import './Cart.css';

const Cart = ({ show, onHide }) => {
  const { cart, addToCart, removeFromCart, clearCart, total } = useContext(CartContext);

  const getPriceValue = (priceString) => {
    return parseFloat(priceString.replace(/[^0-9.]/g, '')) || 0;
  };

  return (
    <>
      {/* Botón flotante */}
      <Button 
        variant="primary" 
        onClick={() => onHide(false)} 
        className="cart-button" 
      >
        <i className="fas fa-shopping-cart"></i>
        {cart.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </Button>

      {/* Modal compartido */}
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ... (resto del código del modal igual que antes) ... */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
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