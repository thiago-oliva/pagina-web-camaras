import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={product.image} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <p className="h4 text-primary">{product.price}</p>
        </div>
        <div className="card-footer bg-white">
          <button className="btn btn-primary w-100">Consultar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;