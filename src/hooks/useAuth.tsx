import React, { useState, useEffect, createContext, useContext } from "react";
import { login as apiLogin, getMe, register as apiRegister } from "../api/authApi";

type User = {
  id: string;
  email: string;
  name: string;
  // Add additional fields as required
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }
    getMe(token)
      .then(setUser)
      .catch(() => {
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await apiLogin({ email, password });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      const userData = await getMe(data.accessToken);
      setUser(userData);
    } catch (err: any) {
      setError(err.message || "Could not login");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  async function register(email: string, password: string, name: string) {
    setLoading(true);
    setError(null);
    try {
      await apiRegister({ name, email, password });
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Could not register");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const value: AuthContextType = { user, loading, error, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}