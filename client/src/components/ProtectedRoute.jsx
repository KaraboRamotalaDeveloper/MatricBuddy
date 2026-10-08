import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <div className="page-center">Loading…</div>;
  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: loc.pathname }} />
  );
}
