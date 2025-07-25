import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import './CartAnimation.css';
import './Products.css';

const ProductCard = ({ product }) => {
  // 1. Todos los hooks se llaman primero, incondicionalmente
  const { addToCart } = useContext(CartContext);
  const { isClient } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [displayPrice, setDisplayPrice] = useState('');
  const [stockStatus, setStockStatus] = useState('');

  // 2. Creamos el objeto seguro con valores por defecto
  const safeProduct = product ? {
    id: product.id || '',
    price: product.price || '',
    stock: product.stock || 0,
    brand: product.brand || 'Marca no disponible',
    category: product.category || 'Categoría no disponible',
    image: product.image || '',
    title: product.title || 'Producto sin título',
    code: product.code || '',
    priceGuild: product.priceGuild || '',
    ...product
  } : null;

  // 3. useEffect se llama incondicionalmente
  useEffect(() => {
    if (!safeProduct) return; // Salir temprano si no hay producto

    const price = isClient() ? safeProduct.price : safeProduct.price;
    setDisplayPrice(price || 'Consultar precio');
    
    if (safeProduct.stock === 0) {
      setStockStatus('Agotado');
    } else if (safeProduct.stock <= 5) {
      setStockStatus(`Últimas ${safeProduct.stock} unidades`);
    } else {
      setStockStatus('Disponible');
    }
  }, [isClient, safeProduct]);

  // 4. Manejo del renderizado condicional
  if (!safeProduct) {
    return (
      <div className="product-card placeholder">
        <div className="card h-100">
          <div className="card-img-container position-relative">
            <div className="placeholder-image"></div>
          </div>
          <div className="card-body">
            <p className="text-muted">Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (safeProduct.stock === 0) return;
    
    addToCart({
      ...safeProduct,
      basePrice: safeProduct.price
    });
    setIsAnimating(true);
    setShowNotification(true);
    
    setTimeout(() => setIsAnimating(false), 800);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="product-card">
      <div className={`card h-100 ${isAnimating ? 'card-added' : ''}`}>
        <div className="card-img-container position-relative">
          <img 
            src={safeProduct.image || process.env.PUBLIC_URL + '/assets/placeholder-image.png'} 
            className="card-img-top" 
            alt={safeProduct.title}
            onError={(e) => {
              e.target.src = process.env.PUBLIC_URL + '/assets/placeholder-image.png';
            }}
          />
          <div className="card-img-overlay">
            <h5 className="text-white">{safeProduct.title}</h5>
            {safeProduct.code && (
              <div className="position-absolute top-0 end-0 bg-dark text-white p-2">
                {safeProduct.code}
              </div>
            )}
          </div>
          {stockStatus && (
            <div className={`position-absolute top-0 start-0 p-2 ${
              safeProduct.stock === 0 ? 'bg-danger' : 
              safeProduct.stock <= 5 ? 'bg-warning text-dark' : 'bg-success'
            }`}>
              {stockStatus}
            </div>
          )}
        </div>
        <div className="card-body">
          <div className="mb-2">
            <p><strong>Marca:</strong> {safeProduct.brand}</p>
            <p><strong>Categoría:</strong> {safeProduct.category}</p>
          </div>
          <p className="h4 text-primary fw-bold mt-auto">
            {displayPrice}
            {isClient() && safeProduct.priceGuild && (
              <small className="text-success d-block">Precio gremio: {safeProduct.priceGuild}</small>
            )}
          </p>
        </div>
        <div className="card-footer bg-white border-0">
          <button 
            className={`btn w-100 py-2 ${
              safeProduct.stock === 0 ? 'btn-secondary disabled' : 'btn-primary'
            }`} 
            onClick={handleAddToCart}
            disabled={safeProduct.stock === 0}
          >
            {safeProduct.stock === 0 ? (
              'AGOTADO'
            ) : (
              <>
                <i className="fas fa-shopping-cart me-2"></i>Agregar al carrito
              </>
            )}
          </button>
        </div>
      </div>
      
      {showNotification && (
        <div className="cart-notification show">
          ¡Producto agregado al carrito!
        </div>
      )}
    </div>
  );
};

export default ProductCard;