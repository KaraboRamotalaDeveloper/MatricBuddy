import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Papers from "./pages/Papers.jsx";
import PaperDetails from "./pages/PaperDetails.jsx";
import Tutor from "./pages/Tutor.jsx";
import Saved from "./pages/Saved.jsx";
import Admin from "./pages/Admin.jsx";
import { Login, Register } from "./pages/Auth.jsx";
import "./styles/global.css";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/papers/:id" element={<PaperDetails />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <Saved />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
        <footer className="footer">
          <div className="container">
            <b>MatricBuddy</b>
            <span>Find. Understand. Practise.</span>
            <span>© {new Date().getFullYear()} MatricBuddy</span>
          </div>
        </footer>
      </AuthProvider>
    </BrowserRouter>
  );
}
