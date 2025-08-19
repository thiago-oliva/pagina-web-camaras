import React, { useEffect, useState } from "react";
import { subscribeVentas } from "../supabaseClient";

export default function AdminDashboard() {
  const [ventas, setVentas] = useState([]);
  const [live, setLive] = useState(null);

  useEffect(() => {
    const unsub = subscribeVentas((venta) => {
      setLive(venta);
      setVentas((prev) => [venta, ...prev]);
    });
    return () => unsub?.();
  }, []);

  return (
    <div className="container">
      <h2 className="mb-3">Panel Admin</h2>
      {live && (
        <div className="alert alert-success" role="alert">
          Nueva venta #{live.id} registrada por ${Number(live.total).toFixed(2)}
        </div>
      )}
      <p className="text-muted">Se listarán aquí las ventas recibidas durante tu sesión.</p>
      <ul className="list-group">
        {ventas.map(v => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={v.id}>
            <span>Venta #{v.id}</span>
            <span>${Number(v.total).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
