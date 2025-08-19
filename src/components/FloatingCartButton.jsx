import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Cart from "./Cart";

const FloatingCartButton = () => {
  const { cartCount, cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      {/* Botón flotante del carrito */}
      <div className="cart-floating-button">
        <button
          className="btn btn-primary rounded-circle p-3"
          onClick={() => setShowCart(!showCart)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '90px',
            zIndex: 1000,
            width: '60px',
            height: '60px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
        >
          <i className="fas fa-shopping-cart"></i>
          {cartCount > 0 && (
            <span 
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '0.7rem' }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Modal del carrito */}
      {showCart && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowCart(false)}
        >
          <div 
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Mi Carrito</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowCart(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Cart items={cart} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para el modal */}
      <style jsx>{`
        .modal {
          backdrop-filter: blur(3px);
        }
        .modal-content {
          max-height: 80vh;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
};

export default FloatingCartButton;