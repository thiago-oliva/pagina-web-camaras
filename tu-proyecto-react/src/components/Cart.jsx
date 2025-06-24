import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Modal, Button, Table } from 'react-bootstrap';

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useContext(CartContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1000 }}>
        <i className="fas fa-shopping-cart"></i> {cart.length > 0 && <span className="badge bg-danger">{cart.length}</span>}
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="text-end fw-bold">Total:</td>
                  <td className="fw-bold">${total.toFixed(2)}</td>
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