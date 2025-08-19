import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import WhatsAppButton from "./components/WhatsAppButton";
import FloatingCartButton from "./components/FloatingCartButton";
import { CartProvider } from "./components/CartContext";
import { AuthProvider, useAuth } from "./components/AuthContext";

// Componente para proteger el admin
function ProtectedAdminRoute() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando...</p>
        </div>
      </div>
    );
  }

  if (user && role === "admin") {
    return (
      <section id="admin" className="py-5 bg-light">
        <div className="container">
          <AdminDashboard />
        </div>
      </section>
    );
  }

  return null;
}

export default function App() {
  return (
    <div className="min-vh-100">
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main style={{ paddingTop: '76px' }}>
            <section id="inicio">
              <Hero />
            </section>
            <Products />
            <section id="aboutus" className="py-5 bg-white">
              <div className="container">
                <AboutUs />
              </div>
            </section>
            <section id="contacto" className="py-5 bg-light">
              <div className="container">
                <Contact />
              </div>
            </section>
            <ProtectedAdminRoute />
          </main>
          <Footer />
          
          {/* Botones flotantes */}
          <FloatingCartButton />
          <WhatsAppButton />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}