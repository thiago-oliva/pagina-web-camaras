import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const PRIVILEGED_USERS = {
  admins: [
    'tseoliva@gmail.com',
    'aguslococo@gmail.com',
    'admin3@ejemplo.com'
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
          try {
            // Limpiar la URL después de la autenticación
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Mostrar mensaje de bienvenida
            const role = getRole(session.user.email);
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
            } else {
              setWelcomeData({
                title: `¡Bienvenido!`,
                message: 'Tu cuenta ha sido confirmada exitosamente',
                variant: 'success'
              });
            }
          } catch (error) {
            console.error('Error al manejar la confirmación:', error);
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getRole = (email) => {
    if (PRIVILEGED_USERS.admins.includes(email)) return 'admin';
    if (PRIVILEGED_USERS.staff.includes(email)) return 'staff';
    return 'client';
  };

  const login = async (email, password) => {
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
  };

  const register = async (email, password, userData) => {
    if (!email || !password || !userData.nombre || !userData.dni) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validar formato de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Por favor ingresa un email válido');
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.nombre,
          dni: userData.dni
        },
        emailRedirectTo: window.location.origin + '/login'
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
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setWelcomeData(null);
    navigate('/');
  };

  const value = {
    user,
    loading,
    isAdmin: () => user && PRIVILEGED_USERS.admins.includes(user.email),
    isStaff: () => user && PRIVILEGED_USERS.staff.includes(user.email),
    isClient: () => user && !PRIVILEGED_USERS.admins.includes(user.email) && !PRIVILEGED_USERS.staff.includes(user.email),
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