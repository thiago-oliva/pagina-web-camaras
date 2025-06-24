import React from 'react';
import { Carousel } from 'react-bootstrap';
import ProductCard from './ProductCard';
import './Products.css'; // Archivo CSS adicional

const Products = () => {
  // Función para dividir en grupos de 4
  const chunkArray = (arr, size) => 
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const products = [
    // Tus 8+ productos aquí...
  ];

  return (
    <section id="productos" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Nuestros Productos</h2>
        
        <Carousel interval={6000} indicators={false} wrap={true}>
          {chunkArray(products, 4).map((group, index) => (
            <Carousel.Item key={`group-${index}`}>
              <div className="row g-3"> {/* gutter entre cards */}
                {group.map(product => (
                  <div className="col-xl-3 col-lg-4 col-md-6" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Products;