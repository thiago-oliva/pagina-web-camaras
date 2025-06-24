import React from 'react';
import { Carousel } from 'react-bootstrap';
import ProductCard from './ProductCard';

const Products = () => {
  // Agrupamos los productos en arrays de 3 (para desktop)
  const chunkArray = (arr, size) => 
    arr.length > size 
      ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)] 
      : [arr];

  const kits = [
    { id: 1, title: "Kit Básico", description: "4 cámaras + DVR", price: "$45,999", image: "url_imagen_kit1" },
    { id: 2, title: "Kit Avanzado", description: "8 cámaras + NVR", price: "$72,999", image: "url_imagen_kit2" },
    { id: 3, title: "Kit Premium", description: "8 cámaras 4K", price: "$89,999", image: "url_imagen_kit3" },
    { id: 4, title: "Kit Inalámbrico", description: "4 cámaras WiFi", price: "$65,999", image: "url_imagen_kit4" }
  ];

  const camarasIndividuales = [
    { id: 1, title: "Cámara Dome", description: "1080p", price: "$12,999", image: "url_imagen_camara1" },
    { id: 2, title: "Cámara PTZ", description: "4K", price: "$24,999", image: "url_imagen_camara2" },
    { id: 3, title: "Cámara Bullet", description: "5MP", price: "$18,999", image: "url_imagen_camara3" },
    { id: 4, title: "Cámara WiFi", description: "2K", price: "$15,999", image: "url_imagen_camara4" }
  ];

  return (
    <section id="productos" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Kits pre-armados (listos para instalar)</h2>
        <Carousel interval={5000} indicators={false}>
          {chunkArray(kits, 4).map((group, index) => (
            <Carousel.Item key={`kits-${index}`}>
              <div className="row">
                {group.map(product => (
                  <div className="col-md-4" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <h2 className="text-center mb-5 mt-5">Cámaras individuales (listas para instalar)</h2>
        <Carousel interval={5000} indicators={false}>
          {chunkArray(camarasIndividuales, 4).map((group, index) => (
            <Carousel.Item key={`camaras-${index}`}>
              <div className="row">
                {group.map(product => (
                  <div className="col-md-4" key={product.id}>
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