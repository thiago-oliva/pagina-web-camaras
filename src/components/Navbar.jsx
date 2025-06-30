import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Lococo's</Link>
        
        {/* Botón hamburguesa para mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>

          {/* Sección derecha con usuario y carrito */}
          <div className="d-flex align-items-center">
            {/* Dropdown de usuario */}
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
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/mi-cuenta">
                  <i className="fas fa-cog me-2"></i>Mi Cuenta
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Carrito con badge */}
            <Link to="/carrito" className="position-relative cart-icon">
              <i className="fas fa-shopping-cart fa-lg"></i>
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Versión mobile simplificada */}
        <div className="mobile-actions d-lg-none">
          <Link to="/login" className="user-mobile me-3">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/carrito" className="cart-mobile">
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