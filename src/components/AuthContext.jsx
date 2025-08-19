import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, getRoleAndDiscount } from "../supabaseClient";

const AuthContext = createContext({ user: null, loading: true, role: "client", discountPct: 0 });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("client");
  const [discountPct, setDiscountPct] = useState(0);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      const { role, discount } = getRoleAndDiscount(data.session?.user);
      setRole(role);
      setDiscountPct(discount);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      const { role, discount } = getRoleAndDiscount(session?.user);
      setRole(role);
      setDiscountPct(discount);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role, discountPct }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
