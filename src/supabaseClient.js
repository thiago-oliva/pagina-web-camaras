import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta?.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta?.env?.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase env vars missing. Set REACT_APP_SUPABASE_URL / REACT_APP_SUPABASE_ANON_KEY (or VITE_ equivalents).");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Fetch products from 'productos' table (NOT 'products') */
export async function getProducts() {
  const { data, error } = await supabase
    .from("productos")
    .select("id,codigo,descripcion,marca,precio_venta,precio_gremio,stock,activo,imagen_url,destacado")
    .eq("activo", true)
    .order("id", { ascending: true });
  if (error) throw error;
  return data || [];
}

/** Insert sale (venta) and sale details */
export async function createVenta({ cliente_id = null, vendedor_id = null, punto_venta_id = null, forma_pago = "efectivo", observaciones = "", items }) {
  // Calculate total from items
  const total = items.reduce((acc, it) => acc + (it.precio_unitario * it.cantidad - (it.descuento || 0)), 0);

  // Begin a RPC or do it manually with two inserts (simple approach here)
  const { data: venta, error: ventaErr } = await supabase
    .from("ventas")
    .insert([{
      numero_factura: null, // could be set by a DB trigger/sequence
      punto_venta_id,
      cliente_id,
      total,
      vendedor_id,
      forma_pago,
      observaciones
    }])
    .select("*")
    .single();
  if (ventaErr) throw ventaErr;

  const detalles = items.map(it => ({
    venta_id: venta.id,
    producto_id: it.producto_id,
    cantidad: it.cantidad,
    precio_unitario: it.precio_unitario,
    descuento: it.descuento || 0
  }));

  const { error: detalleErr } = await supabase.from("ventas_detalle").insert(detalles);
  if (detalleErr) throw detalleErr;

  return venta;
}

/** Subscribe to real-time ventas inserts for notifications */
export function subscribeVentas(callback) {
  const channel = supabase
    .channel("realtime:ventas")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "ventas" }, (payload) => {
      callback?.(payload?.new);
    })
    .subscribe();
  return () => supabase.removeChannel(channel);
}

/** Get role and discount from user metadata (fallback to 'client') */
export function getRoleAndDiscount(user) {
  const role = user?.user_metadata?.role || "client";
  // Define discounts per role (frontend). Consider adding a 'descuento' NUMERIC to roles table.
  const roleDiscounts = { admin: 0, staff: 0.15, client: 0.0 };
  const discount = roleDiscounts[role] ?? 0;
  return { role, discount };
}
