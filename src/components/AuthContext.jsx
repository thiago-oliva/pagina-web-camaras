import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

// Configuración de usuarios privilegiados
const PRIVILEGED_USERS = {
  admins: [
    'tseoliva@gmail.com',
    'admin2@ejemplo.com',
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

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
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
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${userData.nombre} ${userData.apellido}`,
          dni: userData.dni
        }
      }
    });

    if (authError) throw authError;

    const { error: dbError } = await supabase.from('clientes').insert({
      email,
      nombre: userData.nombre,
      apellido: userData.apellido,
      dni: userData.dni,
      tipo_cliente: 'minorista'
    });

    if (dbError) throw dbError;
    return user;
  };

  const isAdmin = () => user && PRIVILEGED_USERS.admins.includes(user.email);
  const isStaff = () => user && PRIVILEGED_USERS.staff.includes(user.email);
  const clearWelcome = () => setWelcomeData(null);

  const value = {
    user,
    loading,
    isAdmin,
    isStaff,
    welcomeData,
    clearWelcome,
    login,
    logout: () => supabase.auth.signOut(),
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);