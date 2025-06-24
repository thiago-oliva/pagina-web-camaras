import React from 'react';
import { Carousel } from 'react-bootstrap';
import ProductCard from './ProductCard';

const Products = () => {
  const kits = [
    { id: 1, title: "Kit Básico", description: "4 cámaras + DVR", price: "$45,999", image: "url_imagen_kit1" },
    { id: 2, title: "Kit Avanzado", description: "8 cámaras + NVR", price: "$72,999", image: "url_imagen_kit2" }
  ];

  const camarasIndividuales = [
    { id: 1, title: "Cámara Dome", description: "1080p", price: "$12,999", image: "url_imagen_camara1" },
    { id: 2, title: "Cámara PTZ", description: "4K", price: "$24,999", image: "url_imagen_camara2" }
  ];

  return (
    <section id="productos" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Kits pre-armados (listos para instalar)</h2>
        <Carousel interval={null} indicators={false}>
          {kits.map((product, index) => (
            <Carousel.Item key={index}>
              <div className="row justify-content-center">
                <ProductCard product={product} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <h2 className="text-center mb-5 mt-5">Cámaras individuales (listas para instalar)</h2>
        <Carousel interval={null} indicators={false}>
          {camarasIndividuales.map((product, index) => (
            <Carousel.Item key={index}>
              <div className="row justify-content-center">
                <ProductCard product={product} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Products; 