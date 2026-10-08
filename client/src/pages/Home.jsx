import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const search = (e) => {
    e.preventDefault();
    nav(`/papers?q=${encodeURIComponent(q)}`);
  };
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">GRADE 12 • STUDY SMARTER</span>
            <h1>
              Your matric journey, <span>made smarter.</span>
            </h1>
            <p className="hero-copy">
              Find past papers, understand difficult questions with AI, and
              practise until you feel ready.
            </p>
            <form className="hero-search" onSubmit={search}>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search Mathematics, Physics, 2024…"
              />
              <button className="btn btn-primary">Search papers</button>
            </form>
            <div className="hero-actions">
              <Link className="btn btn-dark" to="/papers">
                Explore past papers
              </Link>
              <Link className="text-link" to="/tutor">
                Try AI Tutor →
              </Link>
            </div>
          </div>
          <div className="hero-card">
            <div className="orb">M</div>
            <div className="mini-card">
              <b>AI Tutor</b>
              <span>Explain this question step by step</span>
            </div>
            <div className="mini-card">
              <b>Past Papers</b>
              <span>Find papers by subject and year</span>
            </div>
            <div className="mini-card">
              <b>Practice</b>
              <span>Turn weak topics into practice</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHY MATRICBUDDY</span>
              <h2>Everything you need in one study space.</h2>
            </div>
          </div>
          <div className="feature-grid">
            <div className="feature">
              <b>01</b>
              <h3>Find</h3>
              <p>
                Search past papers by subject, year, paper, session and
                language.
              </p>
            </div>
            <div className="feature">
              <b>02</b>
              <h3>Understand</h3>
              <p>
                Ask the AI tutor to break down difficult questions without
                overwhelming you.
              </p>
            </div>
            <div className="feature">
              <b>03</b>
              <h3>Practise</h3>
              <p>
                Use what you learned to practise concepts and build exam
                confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
