import React from 'react';
import { Carousel } from 'react-bootstrap';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
  // Productos para Kits pre-armados
  const kits = [
    {
      id: 1,
      title: "Kit Básico 4 Cámaras",
      description: "4 cámaras Full HD + DVR 1TB",
      price: "$45,999",
      image: "https://images.unsplash.com/photo-1581092921461-39b2f2aa99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Kit Avanzado 8 Cámaras",
      description: "8 cámaras 2K + NVR 2TB",
      price: "$72,999",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Kit Inalámbrico WiFi",
      description: "4 cámaras WiFi 1080p",
      price: "$58,999",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "Kit Premium 4K",
      description: "4 cámaras 4K + NVR 3TB",
      price: "$89,999",
      image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      title: "Kit Empresarial",
      description: "16 cámaras + NVR 4TB",
      price: "$120,999",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  // Productos para Cámaras individuales
  const camarasIndividuales = [
    {
      id: 6,
      title: "Cámara Dome 1080p",
      description: "Resistente a la intemperie",
      price: "$12,999",
      image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 7,
      title: "Cámara PTZ 4K",
      description: "Movimiento 360° + zoom",
      price: "$24,999",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 8,
      title: "Cámara Bullet 5MP",
      description: "Visión nocturna 30m",
      price: "$18,999",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 9,
      title: "Cámara WiFi Interior",
      description: "Detección de movimiento",
      price: "$15,999",
      image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 10,
      title: "Cámara Mini Ocultable",
      description: "Diseño discreto 1080p",
      price: "$14,499",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  // Función para crear el efecto de carrusel infinito
  const renderCarousel = (products, title) => {
    // Duplicamos los productos para el efecto infinito
    const duplicatedProducts = [...products, ...products];
    
    return (
      <>
        <h2 className="text-center mb-5">{title}</h2>
        <Carousel 
          interval={5000} 
          indicators={false} 
          wrap={true} 
          pause={false}
        >
          {Array.from({ length: products.length }).map((_, index) => (
            <Carousel.Item key={`${title}-${index}`}>
              <div className="row g-3">
                {duplicatedProducts
                  .slice(index, index + 4)
                  .map((product, idx) => (
                    <div className="col-xl-3 col-lg-4 col-md-6" key={`${product.id}-${idx}`}>
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </>
    );
  };

  return (
    <section id="productos" className="py-5 bg-light">
      <div className="container">
        {renderCarousel(kits, "Kits pre-armados (listos para instalar)")}
        {renderCarousel(camarasIndividuales, "Cámaras individuales (listas para instalar)")}
      </div>
    </section>
  );
};

export default Products;