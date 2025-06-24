import React from 'react';
import { CartContext } from '../CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
      <div className="card h-100">
        <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
          <img 
            src={product.image} 
            className="card-img-top w-100 h-100" 
            alt={product.title}
            style={{ objectFit: 'cover' }}
          />
          <div className="position-absolute bottom-0 start-0 end-0 p-2" 
               style={{ 
                 background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
               }}>
            <h5 className="text-white mb-0">{product.title}</h5>
          </div>
        </div>
        <div className="card-body d-flex flex-column">
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
            onClick={() => addToCart(product)}
          >
            <i className="fas fa-shopping-cart me-2"></i>Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;