import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { user, role, discountPct, applyDiscount, isClient } = useAuth();

  let priceValue = parseFloat(product.precio_venta) || 0;
  let discountedPrice = priceValue;

  if (user && isClient) {
    discountedPrice = applyDiscount(priceValue);
  }

  const handleAddToCart = () => {
    addToCart({ 
      ...product, 
      precio_unitario: discountedPrice, // Asegurar que pasa el precio con descuento
      precio_venta: priceValue // Mantener el precio original también
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.imagen_url}
        alt={product.descripcion}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.descripcion}</h5>
        <p className="card-text text-muted">Marca: {product.marca}</p>
        
        {discountedPrice < priceValue ? (
          <>
            <p className="text-muted text-decoration-line-through mb-1">${priceValue.toFixed(2)}</p>
            <p className="text-success fw-bold fs-4 mb-1">${discountedPrice.toFixed(2)}</p>
            <small className="text-success">
              {Math.round(discountPct * 100)}% de descuento ({role})
            </small>
          </>
        ) : (
          <p className="text-dark fw-bold fs-4">${priceValue.toFixed(2)}</p>
        )}

        {isClient && product.precio_gremio && (
          <small className="text-info mt-2">
            Precio gremio: ${parseFloat(product.precio_gremio).toFixed(2)}
          </small>
        )}

        <button
          onClick={handleAddToCart}
          className="btn btn-primary mt-3"
        >
          <i className="fas fa-cart-plus me-2"></i>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}