import React from 'react';
import ProductCard from './ProductCard';

const Products = () => {
  const products = [
    {
      id: 1,
      title: "Cámara Modelo X",
      description: "Cámara de seguridad Full HD con visión nocturna y ángulo de 120°.",
      price: "$12,999",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Cámara Modelo Y",
      description: "Cámara IP inalámbrica con detección de movimiento y audio bidireccional.",
      price: "$15,499",
      image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Kit de Seguridad",
      description: "Kit completo con 4 cámaras, DVR y 1TB de almacenamiento.",
      price: "$32,999",
      image: "https://images.unsplash.com/photo-1581092921461-39b2f2aa99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <section id="productos" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Nuestros Productos</h2>
        <div className="row">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;