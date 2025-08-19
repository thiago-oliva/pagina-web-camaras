import React, { useMemo } from "react";
import { useAuth } from "./AuthContext";

export default function Cart({ items = [], onCheckout }) {
  const { role, discountPct } = useAuth?.() || {};

  const { subtotal, discountAmount, total } = useMemo(() => {
    const sub = items.reduce((acc, it) => acc + it.precio_unitario * it.cantidad, 0);
    const pct = Number(discountPct || 0);
    const disc = sub * pct;
    return { subtotal: sub, discountAmount: disc, total: sub - disc };
  }, [items, discountPct]);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Carrito</h5>
        {items.map((it) => (
          <div className="d-flex justify-content-between small" key={it.producto_id}>
            <span>{it.descripcion} x{it.cantidad}</span>
            <span>${(it.precio_unitario * it.cantidad).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between">
          <span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong>
        </div>
        <div className="d-flex justify-content-between">
          <span>Descuento {((discountPct||0)*100).toFixed(0)}% ({role||"sin rol"})</span>
          <strong>- ${discountAmount.toFixed(2)}</strong>
        </div>
        <div className="d-flex justify-content-between fs-5 mt-2">
          <span>Total</span><strong>${total.toFixed(2)}</strong>
        </div>
        <button className="btn btn-primary mt-3 w-100" onClick={() => onCheckout?.(items, total)}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
