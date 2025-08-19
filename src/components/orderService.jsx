import { createVenta } from "../supabaseClient";

/**
 * items: Array<{ producto_id, cantidad, precio_unitario, descuento? }>
 */
export async function createOrder({ cliente_id = null, vendedor_id = null, punto_venta_id = null, forma_pago = "efectivo", observaciones = "", items = [] }) {
  if (!items.length) throw new Error("El carrito está vacío.");
  return await createVenta({ cliente_id, vendedor_id, punto_venta_id, forma_pago, observaciones, items });
}
