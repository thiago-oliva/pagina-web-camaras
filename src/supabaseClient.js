import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Función para verificar configuración de autenticación (versión alternativa)
export const checkAuthConfig = async () => {
  try {
    // Verificamos si podemos hacer una operación básica de auth
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error checking auth config:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
};

// Resto de tus funciones existentes (getProducts, getCategories, getBrands, etc.)
// ... mantén todas las otras funciones que ya tenías ...
// Función para obtener productos
export const getProducts = async (categoryId = null) => {
  let query = supabase
    .from('productos')
    .select(`
      id,
      codigo,
      descripcion,
      marca,
      precio_venta,
      precio_gremio,
      stock,
      imagen_url,
      categorias_productos: categoria_id (nombre)
    `)
    .order('fecha_creacion', { ascending: false });

  if (categoryId) {
    query = query.eq('categoria_id', categoryId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  
  return data.map(product => ({
    id: product.id,
    title: product.descripcion,
    code: product.codigo,
    brand: product.marca,
    price: `$${product.precio_venta.toLocaleString('es-AR')}`,
    priceGuild: `$${product.precio_gremio.toLocaleString('es-AR')}`,
    stock: product.stock,
    image: product.imagen_url || 'https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/assets/default-product.png',
    category: product.categorias_productos?.nombre || 'General'
  }));
};

// Función para obtener categorías
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categorias_productos')
    .select('id, nombre')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  return data;
};

// Función para obtener marcas (versión completa)
export const getBrands = async () => {
  try {
    // 1. Intenta obtener marcas desde la base de datos
    const { data, error } = await supabase
      .from('marcas')
      .select(`
        id,
        nombre,
        logo_url
      `)
      .order('nombre', { ascending: true });

    if (error) throw error;

    // 2. Si hay datos, procesarlos con manejo de errores para imágenes
    if (data && data.length > 0) {
      return data.map(brand => ({
        ...brand,
        logo_url: brand.logo_url || getDefaultBrandLogo(brand.nombre)
      }));
    }

    // 3. Si no hay datos, usar marcas por defecto
    return getDefaultBrands();
    
  } catch (error) {
    console.error('Error fetching brands:', error);
    // 4. En caso de error, usar marcas por defecto
    return getDefaultBrands();
  }
};

// Función de apoyo para marcas por defecto
function getDefaultBrands() {
  return [
    {
      id: 1,
      nombre: "Dahua",
      logo_url: "https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/brands/Dahua_Technology_logo.svg.png"
    },
    {
      id: 2,
      nombre: "Hikvision",
      logo_url: "https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/brands/hikvision-logo.svg"
    },
    {
      id: 3,
      nombre: "Intelbras", 
      logo_url: "https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/brands/intelbras-seeklogo.png"
    },
    {
      id: 4,
      nombre: "Imou",
      logo_url: "https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/brands/imou-seeklogo.png"
    },
    {
      id: 5,
      nombre: "Tiandy",
      logo_url: "https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/brands/tiandy.png"
    },
    {
      id: 6,
      nombre: "Samsung",
      logo_url: "https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/brands/Samsung_Logo.svg.png"
    },
    {
      id: 7,
      nombre: "Cygnus",
      logo_url: "https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/brands/logo_cygnus.png"
    },
    {
      id: 8,
      nombre: "DSC",
      logo_url: "https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/brands/dsc.png"
    }
  ];
}

// Función de apoyo para logo por defecto
function getDefaultBrandLogo(brandName = '') {
  // Puedes personalizar según el nombre de la marca si quieres
  return "https://ryfkxueihiutakmdlhtz.supabase.co/storage/v1/object/public/brands/default-brand.png";
}

// Función para registrar usuario
export const registerUser = async (email, password, userData) => {
  try {
    // 1. Registrar en Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${userData.nombre} ${userData.apellido}`,
          dni: userData.dni
        },
        emailRedirectTo: `${window.location.origin}/login?registered=true`
      }
    });

    if (authError) throw authError;

    // 2. Registrar en clientes
    const { error: clientError } = await supabase
      .from('clientes')
      .insert([{
        nombre: `${userData.nombre} ${userData.apellido}`,
        email,
        dni: userData.dni,
        tipo_cliente: 'minorista',
        fecha_creacion: new Date().toISOString()
      }]);

    if (clientError) throw clientError;

    return authData.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Función para obtener información del usuario
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }

  return data;
};

// Función para actualizar información del usuario
export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('clientes')
    .update(updates)
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }

  return data;
};