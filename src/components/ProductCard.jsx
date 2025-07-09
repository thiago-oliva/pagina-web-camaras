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
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4">
      <div className={`card h-100 ${isAnimating ? 'cart-add-animation' : ''}`}>
        {/* ... resto del código ... */}
        <button 
          className="btn btn-primary w-100 py-2" 
          onClick={handleAddToCart}
        >
          <i className="fas fa-shopping-cart me-2"></i>Agregar al carrito
        </button>
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