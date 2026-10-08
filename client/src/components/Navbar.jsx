import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const leave = async () => {
    await logout();
    nav("/");
    setOpen(false);
  };
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">M</span>
          <span>
            Matric<span>Buddy</span>
          </span>
        </Link>
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          <NavLink to="/papers" onClick={() => setOpen(false)}>
            Past Papers
          </NavLink>
          <NavLink to="/tutor" onClick={() => setOpen(false)}>
            AI Tutor
          </NavLink>
          {user && (
            <NavLink to="/saved" onClick={() => setOpen(false)}>
              Saved
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" onClick={() => setOpen(false)}>
              Admin
            </NavLink>
          )}
          {user ? (
            <button className="link-button" onClick={leave}>
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>
              <Link
                className="btn btn-primary nav-cta"
                to="/register"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
