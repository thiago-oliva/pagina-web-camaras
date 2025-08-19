import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, getRoleAndDiscount } from "../supabaseClient";

const AuthContext = createContext({ 
  user: null, 
  loading: true, 
  role: "guest", 
  discountPct: 0,
  isClient: false,
  isAdmin: false,
  isStaff: false,
  applyDiscount: (price) => price
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("guest");
  const [discountPct, setDiscountPct] = useState(0);

  const isClient = role === "client" || role === "vip" || role === "mayorista" || role === "distribuidor";
  const isAdmin = role === "admin";
  const isStaff = role === "staff";
  
  const applyDiscount = (price) => {
    if (discountPct > 0) {
      return price * (1 - discountPct);
    }
    return price;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        const { role: userRole, discount } = await getRoleAndDiscount(currentUser);
        setRole(userRole);
        setDiscountPct(discount);
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      const { role: userRole, discount } = await getRoleAndDiscount(currentUser);
      setRole(userRole);
      setDiscountPct(discount);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    role,
    discountPct,
    isClient,
    isAdmin,
    isStaff,
    applyDiscount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}