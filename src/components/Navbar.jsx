import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, isAdmin, isClient, logout } = useAuth();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      {/* Navbar para desktop (se oculta en móviles) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top d-none d-lg-block">
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
                <Link className="nav-link" to="#productos" onClick={scrollToTop}>Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#nosotros" onClick={scrollToTop}>Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#contacto" onClick={scrollToTop}>Contacto</Link>
              </li>
              {isAdmin() && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center">
              <Dropdown className="me-3">
                <Dropdown.Toggle variant="dark" id="dropdown-user" className="user-toggle">
                  <i className="fas fa-user-circle fa-lg"></i>
                  {user && <span className="ms-2 d-none d-lg-inline">{user.email}</span>}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end">
                  {user ? (
                    <>
                      <Dropdown.Item as={Link} to="/perfil">
                        <i className="fas fa-user me-2"></i>Mi Perfil
                      </Dropdown.Item>
                      {isAdmin() && (
                        <>
                          <Dropdown.Item as={Link} to="/admin">
                            <i className="fas fa-chart-line me-2"></i>Dashboard
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/registrar">
                            <i className="fas fa-user-plus me-2"></i>Registrar Usuario
                          </Dropdown.Item>
                        </>
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item as={Link} to="/login">
                        <i className="fas fa-sign-in-alt me-2"></i>Iniciar Sesión
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/registrar">
                        <i className="fas fa-user-plus me-2"></i>Registrarse
                      </Dropdown.Item>
                    </>
                  )}
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
        </div>
      </nav>

      {/* Navbar para móviles (estilo Mercado Libre) */}
      <nav className="mobile-navbar d-lg-none fixed-bottom">
        <div className="container">
          <div className="mobile-navbar-content">
            <Link to="/" className="mobile-nav-item" onClick={scrollToTop}>
              <i className="fas fa-home"></i>
              <span>Inicio</span>
            </Link>
            
            <div className="mobile-nav-item cart-mobile" onClick={(e) => {
              e.preventDefault();
              document.querySelector('.cart-button').click();
            }}>
              <i className="fas fa-shopping-cart"></i>
              <span>Carrito</span>
              {cart.length > 0 && (
                <span className="cart-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              )}
            </div>
            
            <div className="mobile-nav-item dropdown">
              <i className="fas fa-ellipsis-h"></i>
              <span>Más</span>
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <Link className="dropdown-item" to="/perfil">
                      <i className="fas fa-user me-2"></i>Mi Perfil
                    </Link>
                    {isAdmin() && (
                      <>
                        <Link className="dropdown-item" to="/admin">
                          <i className="fas fa-chart-line me-2"></i>Dashboard
                        </Link>
                        <Link className="dropdown-item" to="/registrar">
                          <i className="fas fa-user-plus me-2"></i>Registrar Usuario
                        </Link>
                      </>
                    )}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="dropdown-item" to="/login">
                      <i className="fas fa-sign-in-alt me-2"></i>Ingresar
                    </Link>
                    <Link className="dropdown-item" to="/registrar">
                      <i className="fas fa-user-plus me-2"></i>Registrarse
                    </Link>
                  </>
                )}
                <Link className="dropdown-item" to="#productos">
                  <i className="fas fa-boxes me-2"></i>Productos
                </Link>
                <Link className="dropdown-item" to="#nosotros">
                  <i className="fas fa-info-circle me-2"></i>Nosotros
                </Link>
                <Link className="dropdown-item" to="#contacto">
                  <i className="fas fa-phone me-2"></i>Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;