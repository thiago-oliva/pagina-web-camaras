import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  // Función para verificar configuración de autenticación
  const checkAuthConfig = async () => {
    try {
      // Intenta obtener la sesión actual como prueba
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

  // Función para obtener el rol del usuario
  const fetchUserRole = async (email) => {
    try {
      // Primero verifica si es personal
      const { data: staffData, error: staffError } = await supabase
        .from('personal')
        .select('rol_id')
        .eq('email', email)
        .single();

      if (!staffError && staffData) {
        setUserRole(staffData.rol_id);
        return;
      }

      // Si no es personal, verifica si es cliente
      const { data: clientData, error: clientError } = await supabase
        .from('clientes')
        .select('tipo_cliente')
        .eq('email', email)
        .single();

      if (!clientError && clientData) {
        // Asignamos rol_id 3 para clientes
        setUserRole(3);
        return;
      }

      // Si no se encuentra en ninguna tabla
      setUserRole(null);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Verificar configuración de autenticación
        const configValid = await checkAuthConfig();
        setAuthReady(configValid);

        if (!configValid) {
          console.error('Authentication not properly configured');
          setLoading(false);
          return;
        }

        // Obtener sesión actual
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserRole(session.user.email);
        }
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserRole(session.user.email);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!authReady) throw new Error('Authentication not properly configured');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        await fetchUserRole(data.user.email);
      }
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const register = async (email, password, userData) => {
    if (!authReady) throw new Error('Authentication not properly configured');

    try {
      // 1. Registrar en Auth
      const { data: { user }, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${userData.nombre} ${userData.apellido}`,
            dni: userData.dni
          },
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (authError) throw authError;

      // 2. Registrar en la tabla correspondiente
      if (userData.role === 'client') {
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
      } else {
        const { error: staffError } = await supabase
          .from('personal')
          .insert([{
            nombre: userData.nombre,
            apellido: userData.apellido,
            email,
            dni: userData.dni,
            rol_id: userData.role === 'admin' ? 1 : 2
          }]);

        if (staffError) throw staffError;
      }

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const isAdmin = () => userRole === 1; // Asumiendo que 1 es el ID del rol admin
  const isClient = () => userRole === 3; // Asumiendo que 3 es el ID para clientes

  const value = {
    user,
    userRole,
    isAdmin,
    isClient,
    loading,
    authReady,
    login,
    logout,
    register,
    fetchUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}