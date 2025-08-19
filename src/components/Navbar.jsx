import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { cartCount } = useContext(CartContext);
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Logo a la izquierda */}
        <a className="navbar-brand fw-bold fs-3" href="#inicio">
          🛡️ Sistema Seguridad
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Links a la izquierda */}
          <ul className="navbar-nav me-auto">
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
          </ul>

          {/* Iconos a la derecha */}
          <ul className="navbar-nav ms-auto">
            {/* Icono de carrito */}
            <li className="nav-item">
              <a className="nav-link position-relative" href="#carrito">
                <i className="fas fa-shopping-cart fa-lg"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </a>
            </li>

            {/* Icono de usuario */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <i className="fas fa-user fa-lg"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {loading ? (
                  <li><span className="dropdown-item-text">Cargando...</span></li>
                ) : user ? (
                  <>
                    <li><span className="dropdown-item-text">Hola, {user.email}</span></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#carrito">Mi Carrito</a></li>
                    <li><a className="dropdown-item" href="#perfil">Mi Perfil</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Cerrar Sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a className="dropdown-item" href="/login">
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Iniciar Sesión
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/registro">
                        <i className="fas fa-user-plus me-2"></i>
                        Registrarse
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}