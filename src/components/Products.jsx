import React from 'react';
import { Carousel } from 'react-bootstrap';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
  // Marcas con las que trabajamos
  const brands = [
    {
      id: 1,
      name: "Dahua",
      logo: process.env.PUBLIC_URL +  "/assets/Dahua_Technology_logo.svg.png"
    },
    {
      id: 2,
      name: "Hikvision",
      logo: process.env.PUBLIC_URL +  "/assets/hikvision-logo.svg"
    },
    {
      id: 3,
      name: "Tiandy",
      logo: process.env.PUBLIC_URL +  "/assets/tiandy.png"
    },
    {
      id: 4,
      name: "Cygnus",
      logo: process.env.PUBLIC_URL +  "/assets/logo_cygnus.png"
    },
    {
      id: 5,
      name: "Imou",
      logo: process.env.PUBLIC_URL +  "/assets/imou-seeklogo.png"
    },
    {
      id: 6,
      name: "DSC",
      logo: process.env.PUBLIC_URL +  "/assets/dsc.png"
    },
    {
      id: 7,
      name: "Intelbras",
      logo: process.env.PUBLIC_URL +  "/assets/intelbras-seeklogo.png"
    },
    {
      id: 8,
      name: "Samsung",
      logo: process.env.PUBLIC_URL +  "/assets/Samsung_Logo.svg.png"
    }
  ];
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

  // Función para renderizar el carrusel de marcas
  // Nuevo: Carrusel de marcas tipo marquesina
  const renderBrandsMarquee = () => (
    <div className="mb-5">
      <h2 className="text-center mb-4">Marcas con las que trabajamos</h2>
      <div className="brands-marquee-wrapper">
        <div className="brands-marquee">
          {[...brands, ...brands].map((brand, idx) => (
            // En la función renderBrandsMarquee, cambia el contenedor a:
            <div key={`${brand.id}-${idx}`} className="brand-logo-container">
              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-logo"
                onError={(e) => {
                  e.target.src = process.env.PUBLIC_URL + '/assets/placeholder-logo.png';
                  e.target.style.width = '120px';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Función para crear el efecto de carrusel infinito de productos
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
          {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
            // En la función renderCarousel de Products.jsx
            <Carousel.Item key={`${title}-${index}`}>
              <div className="row g-3 justify-content-center">
                {duplicatedProducts
                  .slice(index, index + (
                    window.innerWidth > 1200 ? 4 : 
                    window.innerWidth > 768 ? 3 : 
                    window.innerWidth > 576 ? 2 : 1
                  ))
                  .map((product, idx) => (
                    <ProductCard key={`${product.id}-${idx}`} product={product} />
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
      <div className="container-fluid px-4">
        {renderBrandsMarquee()}
        {renderCarousel(kits, "Kits pre-armados (listos para instalar)")}
        {renderCarousel(camarasIndividuales, "Cámaras individuales (listas para instalar)")}
        {/* Aviso de IVA */}
        <div className="text-center mt-5 mb-4 p-3 bg-white rounded shadow-sm">
          <p className="text-muted mb-3">
            <i className="fas fa-exclamation-triangle text-warning me-2"></i>
            Los precios mostrados no incluyen IVA. Registrate para acceder a precios especiales y beneficios exclusivos.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-primary">
              <i className="fas fa-sign-in-alt me-2"></i>Ingresar a mi cuenta
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-user-plus me-2"></i>Crear cuenta nueva
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;