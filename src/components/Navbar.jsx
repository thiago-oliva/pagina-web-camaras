import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import { Dropdown } from 'react-bootstrap';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import '../styles.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = ['/login', '/registrar'].includes(location.pathname);
  const isHomePage = location.pathname === '/';

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

  // Navbar simplificado y elegante para páginas de autenticación
  if (isAuthPage) {
    return (
      <nav className="navbar auth-navbar fixed-top">
        <div className="container">
          <RouterLink className="navbar-brand auth-brand" to="/" onClick={scrollToTop}>
            <span className="logo-text">LOCOCO'S</span>
            <span className="logo-subtitle">SISTEMAS DE SEGURIDAD</span>
          </RouterLink>
        </div>
      </nav>
    );
  }

  const renderSectionLink = (to, text, offset = -70) => {
    if (isHomePage) {
      return (
        <ScrollLink
          to={to}
          spy={true}
          smooth={true}
          offset={offset}
          duration={500}
          className="nav-link"
          style={{ cursor: 'pointer' }}
        >
          {text}
        </ScrollLink>
      );
    } else {
      return (
        <RouterLink
          className="nav-link"
          to="/"
          onClick={() => {
            sessionStorage.setItem('scrollToSection', to);
            scrollToTop();
          }}
        >
          {text}
        </RouterLink>
      );
    }
  };

  return (
    <>
      {/* Navbar para desktop */}
      <nav className="navbar navbar-expand-lg navbar-dark main-navbar fixed-top d-none d-lg-block">
        <div className="container">
          <RouterLink className="navbar-brand" to="/" onClick={scrollToTop}>
            <span className="logo-text">LOCOCO'S</span>
          </RouterLink>
          
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <RouterLink className="nav-link" to="/" onClick={scrollToTop}>Inicio</RouterLink>
              </li>
              <li className="nav-item">
                {renderSectionLink('productos', 'Productos')}
              </li>
              <li className="nav-item">
                {renderSectionLink('nosotros', 'Nosotros')}
              </li>
              <li className="nav-item">
                {renderSectionLink('contacto', 'Contacto')}
              </li>
              {isAdmin() && (
                <li className="nav-item">
                  <RouterLink className="nav-link" to="/admin">Admin</RouterLink>
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
                      <Dropdown.Item as={RouterLink} to="/perfil">
                        <i className="fas fa-user me-2"></i>Mi Perfil
                      </Dropdown.Item>
                      {isAdmin() && (
                        <Dropdown.Item as={RouterLink} to="/admin">
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
                      <Dropdown.Item as={RouterLink} to="/login">
                        <i className="fas fa-sign-in-alt me-2"></i>Iniciar Sesión
                      </Dropdown.Item>
                      <Dropdown.Item as={RouterLink} to="/registrar">
                        <i className="fas fa-user-plus me-2"></i>Registrarse
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <RouterLink to="#" className="cart-icon ms-3" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.cart-button')?.click();
              }}>
                <i className="fas fa-shopping-cart fa-lg"></i>
                {cart.length > 0 && (
                  <span className="cart-badge">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </RouterLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar para móviles */}
      <nav className="mobile-navbar d-lg-none fixed-bottom">
        <div className="container">
          <div className="mobile-navbar-content">
            <RouterLink to="/" className="mobile-nav-item">
              <i className="fas fa-home"></i>
              <span>Inicio</span>
            </RouterLink>
            
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
                    <RouterLink className="dropdown-item" to="/perfil">
                      <i className="fas fa-user me-2"></i>Mi Perfil
                    </RouterLink>
                    {isAdmin() && (
                      <RouterLink className="dropdown-item" to="/admin">
                        <i className="fas fa-chart-line me-2"></i>Dashboard
                      </RouterLink>
                    )}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <RouterLink className="dropdown-item" to="/login">
                      <i className="fas fa-sign-in-alt me-2"></i>Ingresar
                    </RouterLink>
                    <RouterLink className="dropdown-item" to="/registrar">
                      <i className="fas fa-user-plus me-2"></i>Registrarse
                    </RouterLink>
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