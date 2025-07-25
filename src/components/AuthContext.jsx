import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const PRIVILEGED_USERS = {
  admins: [
    'tseoliva@gmail.com',
    'aguslococo@gmail.com',
    'admin3@ejemplo.com',
    'nuevo_admin@ejemplo.com'  // Nuevo admin agregado
  ],
  staff: [
    'staff1@ejemplo.com',
    'staff2@ejemplo.com'
  ]
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [welcomeData, setWelcomeData] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Manejar la confirmación de email
      if (event === 'SIGNED_IN') {
        if (window.location.hash.includes('access_token')) {
          window.history.replaceState({}, document.title, window.location.pathname);
          navigate('/email-confirmed');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getRole = (email) => {
    if (PRIVILEGED_USERS.admins.includes(email)) return 'admin';
    if (PRIVILEGED_USERS.staff.includes(email)) return 'staff';
    return 'client';
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      const role = getRole(email);
      if (role === 'admin') {
        setWelcomeData({
          title: `¡Bienvenido Administrador!`,
          message: 'Tienes acceso completo al sistema',
          variant: 'primary'
        });
      } else if (role === 'staff') {
        setWelcomeData({
          title: `¡Bienvenido Staff!`,
          message: 'Panel de gestión de ventas',
          variant: 'info'
        });
      }
      
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, userData) => {
    setLoading(true);
    try {
      if (!email || !password || !userData.nombre || !userData.dni) {
        throw new Error('Todos los campos son obligatorios');
      }

      const { data: { user }, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.nombre,
            dni: userData.dni
          },
          emailRedirectTo: window.location.origin + '/email-confirmed'
        }
      });

      if (authError) throw authError;

      const { error: dbError } = await supabase.from('clientes').insert({
        email,
        nombre: userData.nombre,
        dni: userData.dni,
        tipo_cliente: 'minorista',
        fecha_creacion: new Date().toISOString()
      });

      if (dbError) throw dbError;

      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLogoutLoading(true);
    try {
      // Esperar para mostrar la animación
      await new Promise(resolve => setTimeout(resolve, 1500));
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setWelcomeData(null);
      navigate('/', { state: { message: 'Has cerrado sesión correctamente' } });
    } finally {
      setLogoutLoading(false);
    }
  };

  const isAdmin = () => user && PRIVILEGED_USERS.admins.includes(user.email);
  const isStaff = () => user && PRIVILEGED_USERS.staff.includes(user.email);
  const isClient = () => user && !isAdmin() && !isStaff();

  const value = {
    user,
    loading,
    logoutLoading,
    isAdmin,
    isStaff,
    isClient,
    welcomeData,
    clearWelcome: () => setWelcomeData(null),
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);