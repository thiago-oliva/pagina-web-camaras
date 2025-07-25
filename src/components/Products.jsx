import React, { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { getProducts, getBrands, getCategories } from '../supabaseClient';
import './Products.css';

const Products = () => {
  const [brands, setBrands] = useState([]);
  const [kits, setKits] = useState([]);
  const [camarasIndividuales, setCamarasIndividuales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        const kitCategory = categoriesData.find(c => c.nombre.toLowerCase().includes('kit'));
        const cameraCategory = categoriesData.find(c => c.nombre.toLowerCase().includes('cámara') || 
                                                      c.nombre.toLowerCase().includes('camara'));
        
        const kitsData = kitCategory ? await getProducts(kitCategory.id) : [];
        const camerasData = cameraCategory ? await getProducts(cameraCategory.id) : [];
        
        setKits(kitsData);
        setCamarasIndividuales(camerasData);
        
        const brandsData = await getBrands();
        setBrands(brandsData);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderBrandsMarquee = () => {
    if (brands.length === 0) return null;

    return (
      <div className="brands-marquee">
        <h3 className="text-center mb-4">Marcas que trabajamos</h3>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...brands, ...brands].map((brand, index) => (
              brand && (
                <div key={`${brand.id}-${index}`} className="brand-item">
                  <img 
                    src={brand.logo_url} 
                    alt={brand.nombre}
                    className="brand-logo"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x80?text=Logo';
                    }}
                  />
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProducts = (products, title) => {
    if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
    if (error) return <div className="text-center my-5"><Alert variant="danger">Error: {error}</Alert></div>;
    
    if (!products || products.length === 0) {
      return <div className="text-center my-5"><p>No hay productos disponibles en esta categoría</p></div>;
    }

    return (
      <div className="products-section">
        <h2 className="section-title">{title}</h2>
        <div className="products-grid">
          {products.map(product => (
            product ? <ProductCard key={product.id} product={product} /> : null
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="productos" className="py-5">
      <div className="container">
        {renderBrandsMarquee()}
        {renderProducts(kits, "Kits pre-armados")}
        {renderProducts(camarasIndividuales, "Cámaras individuales")}
      </div>
    </section>
  );
};

export default Products;