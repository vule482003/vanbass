"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface AuthUser {
  id: string;
  email: string;
  role: "customer" | "admin";
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => Promise<boolean>;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("vanbass_token");
      const savedRefreshToken = localStorage.getItem("vanbass_refresh_token");
      const savedUser = localStorage.getItem("vanbass_user");
      if (savedToken && savedUser) {
        setToken(savedToken);
        setRefreshToken(savedRefreshToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load auth state from localStorage:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const savedRefreshToken = localStorage.getItem("vanbass_refresh_token") || refreshToken;
      if (!savedRefreshToken) return false;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      const res = await fetch(`${apiUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: savedRefreshToken }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
        localStorage.setItem("vanbass_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("vanbass_refresh_token", data.refresh_token);
        }
        return true;
      } else {
        // Refresh token expired - force logout
        logout();
        return false;
      }
    } catch {
      return false;
    }
  }, [refreshToken]);

  const login = async (email: string, password: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (response.ok) {
        const data = await response.json();
        const loggedUser: AuthUser = {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role || "customer",
          full_name: data.user.email.split("@")[0],
        };
        setToken(data.access_token);
        setRefreshToken(data.refresh_token || null);
        setUser(loggedUser);

        localStorage.setItem("vanbass_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("vanbass_refresh_token", data.refresh_token);
        }
        localStorage.setItem("vanbass_user", JSON.stringify(loggedUser));
        return { success: true };
      } else {
        const err = await response.json().catch(() => ({ detail: "Email hoặc mật khẩu không chính xác" }));
        return {
          success: false,
          error: err.detail || "Email hoặc mật khẩu không chính xác.",
        };
      }
    } catch (err) {
      console.error("Login network error:", err);
      return {
        success: false,
        error: "Không thể kết nối đến máy chủ Backend (FastAPI). Vui lòng kiểm tra lại server.",
      };
    }
  };

  const register = async (email: string, password: string, fullName?: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (response.ok) {
        const data = await response.json();
        const newUser: AuthUser = {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role || "customer",
          full_name: fullName || data.user.email.split("@")[0],
        };
        setToken(data.access_token);
        setRefreshToken(data.refresh_token || null);
        setUser(newUser);

        localStorage.setItem("vanbass_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("vanbass_refresh_token", data.refresh_token);
        }
        localStorage.setItem("vanbass_user", JSON.stringify(newUser));
        return { success: true };
      } else {
        const err = await response.json().catch(() => ({ detail: "Đăng ký không thành công" }));
        return {
          success: false,
          error: err.detail || "Đăng ký thất bại. Email có thể đã được sử dụng.",
        };
      }
    } catch (err) {
      console.error("Register network error:", err);
      return {
        success: false,
        error: "Không thể kết nối đến máy chủ Backend (FastAPI).",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("vanbass_token");
    localStorage.removeItem("vanbass_refresh_token");
    localStorage.removeItem("vanbass_user");
  };

  const updateProfile = async (data: Partial<AuthUser>) => {
    if (!user) return false;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("vanbass_user", JSON.stringify(updated));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
