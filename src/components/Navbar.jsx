import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = ['/login', '/registrar'].includes(location.pathname);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLogout = async () => {
    navigate('/logout');
    await new Promise(resolve => setTimeout(resolve, 500));
    await logout();
  };

  // Navbar simplificado para páginas de autenticación
  if (isAuthPage) {
    return (
      <nav className="navbar simplified-navbar fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/" onClick={scrollToTop}>
            <img 
              src="/logo-lococos.png" 
              alt="Lococo's" 
              className="navbar-logo"
            />
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Navbar para desktop */}
      <nav className="navbar navbar-expand-lg navbar-dark main-navbar fixed-top d-none d-lg-block">
        <div className="container">
          <Link className="navbar-brand" to="/" onClick={scrollToTop}>
            <span className="logo-text">LOCOCO'S</span>
          </Link>
          
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={scrollToTop}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#nosotros">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#contacto">Contacto</Link>
              </li>
              {isAdmin() && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-user">
                  <i className="fas fa-user-circle fa-lg"></i>
                  {user && <span className="ms-2">{user.email}</span>}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  {user ? (
                    <>
                      <Dropdown.Item as={Link} to="/perfil">
                        <i className="fas fa-user me-2"></i>Mi Perfil
                      </Dropdown.Item>
                      {isAdmin() && (
                        <Dropdown.Item as={Link} to="/admin">
                          <i className="fas fa-chart-line me-2"></i>Dashboard
                        </Dropdown.Item>
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

              <Link to="#" className="cart-icon ms-3" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.cart-button')?.click();
              }}>
                <i className="fas fa-shopping-cart fa-lg"></i>
                {cart.length > 0 && (
                  <span className="cart-badge">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar para móviles */}
      <nav className="mobile-navbar d-lg-none fixed-bottom">
        <div className="container">
          <div className="mobile-navbar-content">
            <Link to="/" className="mobile-nav-item">
              <i className="fas fa-home"></i>
              <span>Inicio</span>
            </Link>
            
            <div className="mobile-nav-item cart-mobile" onClick={(e) => {
              e.preventDefault();
              document.querySelector('.cart-button')?.click();
            }}>
              <i className="fas fa-shopping-cart"></i>
              <span>Carrito</span>
              {cart.length > 0 && (
                <span className="cart-badge">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
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
                      <Link className="dropdown-item" to="/admin">
                        <i className="fas fa-chart-line me-2"></i>Dashboard
                      </Link>
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
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;