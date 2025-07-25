import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

// Emails hardcodeados para administradores
const ADMIN_EMAILS = [
  'tseoliva@gmail.com',
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const register = async (email, password, userData) => {
    // Verificar si el email ya existe
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

    if (authError) {
      if (authError.message.includes('already registered')) {
        throw new Error('Ya existe una cuenta con este email');
      }
      throw authError;
    }

    // Registrar en la tabla correspondiente
    const isAdmin = ADMIN_EMAILS.includes(email);
    const table = isAdmin ? 'personal' : 'clientes';
    const { error: dbError } = await supabase.from(table).insert({
      email,
      nombre: userData.nombre,
      apellido: userData.apellido,
      dni: userData.dni,
      ...(isAdmin && { rol_id: 1 }) // 1 = admin
    });

    if (dbError) throw dbError;
    return user;
  };

  const isAdmin = () => user && ADMIN_EMAILS.includes(user.email);
  const isClient = () => user && !isAdmin();

  const value = {
    user,
    loading,
    isAdmin,
    isClient,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};