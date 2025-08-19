import React from "react";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>404 - Página no encontrada</h1>
      <p>La ruta que intentaste abrir no existe.</p>
      <a href="#/">Volver al inicio</a>
    </div>
  );
}
