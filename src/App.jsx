import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import { CartProvider } from "./components/CartContext";
import { AuthProvider, useAuth } from "./components/AuthContext";

// Componente para proteger el admin
function ProtectedAdminRoute() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Cargando...</div>;
  }

  // Solo mostrar admin si el usuario está autenticado y es admin
  if (user && role === "admin") {
    return (
      <section id="admin" className="py-5 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdminDashboard />
        </div>
      </section>
    );
  }

  return null; // No mostrar nada si no es admin
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="pt-16"> {/* Padding para el navbar fixed */}
            <section id="inicio" className="bg-gray-900 py-5">
              <Hero />
            </section>
            <Products />
            <section id="aboutus" className="py-5 bg-white">
              <AboutUs />
            </section>
            <section id="contacto" className="py-5 bg-gray-50">
              <Contact />
            </section>
            <ProtectedAdminRoute />
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}