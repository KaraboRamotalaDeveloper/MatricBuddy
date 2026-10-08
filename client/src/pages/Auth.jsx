import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
export function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      nav(loc.state?.from || "/papers");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Continue your matric study journey."
    >
      <form onSubmit={submit} className="auth-form">
        {error && <div className="alert">{error}</div>}
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <button className="btn btn-primary full">Login</button>
        <p>
          New to MatricBuddy? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </AuthCard>
  );
}
export function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      nav("/papers");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <AuthCard
      title="Start studying smarter"
      subtitle="Create your free MatricBuddy account."
    >
      <form onSubmit={submit} className="auth-form">
        {error && <div className="alert">{error}</div>}
        <label>
          Full name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            minLength="6"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <button className="btn btn-primary full">Create account</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthCard>
  );
}
function AuthCard({ title, subtitle, children }) {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="brand auth-brand">
          <span className="brand-mark">M</span>
          <span>
            Matric<span>Buddy</span>
          </span>
        </div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </div>
    </main>
  );
}
