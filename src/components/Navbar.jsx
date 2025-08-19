import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-90 text-white z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="#inicio" className="hover:text-gray-300 transition">
            Mi Tienda
          </a>
        </div>

        {/* Desktop Links */}
        <div className="space-x-6 hidden md:flex">
          <a href="#inicio" className="hover:text-gray-300 transition">
            Inicio
          </a>
          <a href="#productos" className="hover:text-gray-300 transition">
            Productos
          </a>
          <a href="#carrito" className="hover:text-gray-300 transition">
            Carrito
          </a>
          <a href="#nosotros" className="hover:text-gray-300 transition">
            Sobre Nosotros
          </a>
          <a href="#contacto" className="hover:text-gray-300 transition">
            Contacto
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-95">
          <div className="px-4 py-2 space-y-2">
            <a href="#inicio" className="block py-2 hover:text-gray-300 transition">
              Inicio
            </a>
            <a href="#productos" className="block py-2 hover:text-gray-300 transition">
              Productos
            </a>
            <a href="#carrito" className="block py-2 hover:text-gray-300 transition">
              Carrito
            </a>
            <a href="#nosotros" className="block py-2 hover:text-gray-300 transition">
              Sobre Nosotros
            </a>
            <a href="#contacto" className="block py-2 hover:text-gray-300 transition">
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}