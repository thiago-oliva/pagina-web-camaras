import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#inicio">Lococo's</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#inicio">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#productos">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#nosotros">Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">Contacto</a>
            </li>
            <li className="nav-item d-lg-none"> {/* Visible solo en mobile */}
              <a className="nav-link" href="#" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.cart-button').click();
              }}>
                <i className="fas fa-shopping-cart"></i>
                {cart.length > 0 && (
                  <span className="badge bg-danger ms-1">{cart.length}</span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;