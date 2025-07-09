import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import './CartAnimation.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAnimating(true);
    setShowNotification(true);
    
    setTimeout(() => setIsAnimating(false), 800);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4">
      <div className={`card h-100 ${isAnimating ? 'card-added' : ''}`}>
        <div className="card-img-container">
          <img 
            src={product.image} 
            className="card-img-top" 
            alt={product.title}
            onError={(e) => {
              e.target.src = process.env.PUBLIC_URL + '/assets/placeholder-image.png';
            }}
          />
          <div className="card-img-overlay">
            <h5 className="text-white">{product.title}</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-2">
            {product.description.split('+').map((item, index) => (
              <p key={index} className="mb-1">+ {item.trim()}</p>
            ))}
          </div>
          <p className="h4 text-primary fw-bold mt-auto">{product.price}</p>
        </div>
        <div className="card-footer bg-white border-0">
          <button 
            className="btn btn-primary w-100 py-2" 
            onClick={handleAddToCart}
          >
            <i className="fas fa-shopping-cart me-2"></i>Agregar al carrito
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