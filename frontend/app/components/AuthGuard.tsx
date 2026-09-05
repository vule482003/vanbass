"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../lib/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "staff" | "customer")[];
  fallbackUrl?: string;
}

export default function AuthGuard({
  children,
  allowedRoles,
  fallbackUrl,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const target = fallbackUrl || `/login?redirect=${encodeURIComponent(pathname || "/")}`;
      router.push(target);
    }
  }, [isAuthenticated, isLoading, pathname, router, fallbackUrl]);

  // Loading Screen
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#090909",
          color: "#fff",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "3px solid rgba(255, 255, 255, 0.15)",
            borderTopColor: "#22c55e",
            borderRadius: "50%",
            animation: "vb-spin 0.8s linear infinite",
            marginBottom: "16px",
          }}
        />
        <style>{`
          @keyframes vb-spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <p style={{ color: "#a1a1aa", fontSize: "14px", fontWeight: 500 }}>
          Đang xác thực quyền truy cập...
        </p>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  // Role Unauthorized
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#090909",
          color: "#fff",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>🔒</div>
        <h1 style={{ fontSize: "26px", fontWeight: 800, margin: "0 0 12px 0", letterSpacing: "-0.02em" }}>
          Truy cập bị từ chối
        </h1>
        <p style={{ color: "#a1a1aa", maxWidth: "440px", fontSize: "14px", lineHeight: "1.6", marginBottom: "28px" }}>
          Tài khoản <strong>{user.email}</strong> (Role: <span style={{ color: "#22c55e" }}>{user.role}</span>) không có quyền truy cập trang này.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/profile"
            style={{
              padding: "12px 24px",
              backgroundColor: "#22c55e",
              color: "#000",
              fontWeight: 800,
              fontSize: "13px",
              textDecoration: "none",
              borderRadius: "6px",
            }}
          >
            👤 Về Hồ Sơ Cá Nhân (/profile)
          </Link>
          <Link
            href="/"
            style={{
              padding: "12px 24px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "13px",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            Trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
