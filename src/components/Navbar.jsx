import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={scrollToTop}>Lococo's</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={scrollToTop}>Inicio</Link>
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
          </ul>

          <div className="d-flex align-items-center">
            <Dropdown className="me-3">
              <Dropdown.Toggle variant="dark" id="dropdown-user" className="user-toggle">
                <i className="fas fa-user-circle fa-lg"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item as={Link} to="/login">
                  <i className="fas fa-sign-in-alt me-2"></i>Iniciar Sesión
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/register">
                  <i className="fas fa-user-plus me-2"></i>Registrarse
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Link to="#" className="position-relative cart-icon" onClick={(e) => {
              e.preventDefault();
              document.querySelector('.cart-button').click();
            }}>
              <i className="fas fa-shopping-cart fa-lg"></i>
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="mobile-actions d-lg-none">
          <Link to="/login" className="user-mobile me-3">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="#" className="cart-mobile" onClick={(e) => {
            e.preventDefault();
            document.querySelector('.cart-button').click();
          }}>
            <i className="fas fa-shopping-cart"></i>
            {cart.length > 0 && (
              <span className="cart-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;