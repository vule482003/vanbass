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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    try {
      localStorage.removeItem("vanbass_token");
      localStorage.removeItem("vanbass_refresh_token");
      localStorage.removeItem("vanbass_user");
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const savedRefreshToken = typeof window !== "undefined" ? localStorage.getItem("vanbass_refresh_token") : null;
      if (!savedRefreshToken) return false;

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
        logout();
        return false;
      }
    } catch {
      return false;
    }
  }, [apiUrl, logout]);

  // Strict Token Validation on App Load
  useEffect(() => {
    const validateExistingSession = async () => {
      try {
        const savedToken = localStorage.getItem("vanbass_token");
        const savedRefreshToken = localStorage.getItem("vanbass_refresh_token");

        if (!savedToken) {
          setIsLoading(false);
          return;
        }

        // Validate token against Backend GET /api/auth/me
        const res = await fetch(`${apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });

        if (res.ok) {
          const userData = await res.json();
          let validUser: AuthUser = {
            id: userData.id,
            email: userData.email,
            role: userData.role || "customer",
            full_name: userData.email.split("@")[0],
          };

          // Try fetching customer profile from DB
          try {
            const profileRes = await fetch(`${apiUrl}/customers/me/profile`, {
              headers: { Authorization: `Bearer ${savedToken}` },
            });
            if (profileRes.ok) {
              const profileData = await profileRes.json();
              if (profileData.profile) {
                validUser = {
                  ...validUser,
                  full_name: profileData.profile.full_name || validUser.full_name,
                  phone: profileData.profile.phone,
                  address: profileData.profile.address,
                  city: profileData.profile.city,
                };
              }
            }
          } catch {
            // Ignore profile fetch failure
          }

          setToken(savedToken);
          setRefreshToken(savedRefreshToken);
          setUser(validUser);
          localStorage.setItem("vanbass_user", JSON.stringify(validUser));
        } else {
          // Access token invalid or expired -> attempt refresh with refresh_token
          if (savedRefreshToken) {
            const refreshRes = await fetch(`${apiUrl}/auth/refresh`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh_token: savedRefreshToken }),
            });

            if (refreshRes.ok) {
              const data = await refreshRes.json();
              let validUser: AuthUser = {
                id: data.user.id,
                email: data.user.email,
                role: data.user.role || "customer",
                full_name: data.user.email.split("@")[0],
              };

              try {
                const profileRes = await fetch(`${apiUrl}/customers/me/profile`, {
                  headers: { Authorization: `Bearer ${data.access_token}` },
                });
                if (profileRes.ok) {
                  const profileData = await profileRes.json();
                  if (profileData.profile) {
                    validUser = {
                      ...validUser,
                      full_name: profileData.profile.full_name || validUser.full_name,
                      phone: profileData.profile.phone,
                      address: profileData.profile.address,
                      city: profileData.profile.city,
                    };
                  }
                }
              } catch {
                // Ignore
              }

              setToken(data.access_token);
              setRefreshToken(data.refresh_token);
              setUser(validUser);
              localStorage.setItem("vanbass_token", data.access_token);
              if (data.refresh_token) {
                localStorage.setItem("vanbass_refresh_token", data.refresh_token);
              }
              localStorage.setItem("vanbass_user", JSON.stringify(validUser));
              setIsLoading(false);
              return;
            }
          }

          // If both fail: purge invalid/old mock session
          logout();
        }
      } catch (e) {
        console.error("Auth validation error:", e);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    validateExistingSession();
  }, [apiUrl, logout]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (response.ok) {
        const data = await response.json();
        let loggedUser: AuthUser = {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role || "customer",
          full_name: data.user.email.split("@")[0],
        };

        // Try fetching customer profile
        try {
          const profileRes = await fetch(`${apiUrl}/customers/me/profile`, {
            headers: { Authorization: `Bearer ${data.access_token}` },
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            if (profileData.profile) {
              loggedUser = {
                ...loggedUser,
                full_name: profileData.profile.full_name || loggedUser.full_name,
                phone: profileData.profile.phone,
                address: profileData.profile.address,
                city: profileData.profile.city,
              };
            }
          }
        } catch {
          // Ignore
        }

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

        if (fullName) {
          // Attempt upsert initial profile
          try {
            await fetch(`${apiUrl}/customers/me/profile`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.access_token}`,
              },
              body: JSON.stringify({
                full_name: fullName,
                phone: "0900000000",
                city: "Đà Nẵng",
                country: "Việt Nam",
                address: "Đà Nẵng",
              }),
            });
          } catch {
            // Ignore
          }
        }

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

  const updateProfile = async (data: Partial<AuthUser>) => {
    if (!user) return false;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("vanbass_user", JSON.stringify(updated));

    if (token) {
      try {
        await fetch(`${apiUrl}/customers/me/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            full_name: data.full_name || user.full_name || user.email.split("@")[0],
            phone: data.phone || user.phone || "0900000000",
            city: data.city || user.city || "Đà Nẵng",
            country: "Việt Nam",
            address: data.address || user.address || "Đà Nẵng",
          }),
        });
      } catch (err) {
        console.error("Failed to persist profile to API:", err);
      }
    }

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
