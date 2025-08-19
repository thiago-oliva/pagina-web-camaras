import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { isClient, applyDiscount, user } = useAuth();

  // Asegurar que los precios sean numéricos
  let priceValue = parseFloat(product.precio_venta) || 0;

  // Si hay usuario y es cliente, aplicar descuento
  if (user && isClient) {
    priceValue = applyDiscount(priceValue);
  }

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <img
        src={product.imagen_url}
        alt={product.descripcion}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-bold">{product.descripcion}</h3>
      <p className="text-gray-600">Marca: {product.marca}</p>
      <p className="text-gray-800 font-semibold">${priceValue.toFixed(2)}</p>

      {isClient && product.precio_gremio && (
        <small className="text-green-600 block">
          Precio gremio: ${parseFloat(product.precio_gremio).toFixed(2)}
        </small>
      )}

      <button
        onClick={() => addToCart(product)}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Agregar al carrito
      </button>
    </div>
  );
}