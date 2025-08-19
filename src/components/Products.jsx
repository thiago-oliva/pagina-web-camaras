import React, { useEffect, useState } from "react";
import { getProducts } from "../supabaseClient";
import ProductCard from "./ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await getProducts();
        if (mounted) setProducts(rows);
      } catch (err) {
        console.error("Error fetching productos:", err);
        setError(err.message || "Error al cargar productos");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="container py-5 text-center">Cargando productos…</div>;
  if (error) return <div className="container py-5 text-danger text-center">{error}</div>;

  return (
    <section id="productos" className="container py-5">
      <h2 className="mb-4">Productos</h2>
      <div className="row g-4">
        {products.map(p => (
          <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
        {products.length === 0 && <p>No hay productos disponibles.</p>}
      </div>
    </section>
  );
}
