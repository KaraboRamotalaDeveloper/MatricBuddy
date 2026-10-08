import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api.js";
import PaperCard from "../components/PaperCard.jsx";
import Loading from "../components/Loading.jsx";
export default function Papers() {
  const [params, setParams] = useSearchParams();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const q = params.get("q") || "";
  const [form, setForm] = useState({
    q,
    subject: params.get("subject") || "",
    year: params.get("year") || "",
    session: params.get("session") || "",
    paper: params.get("paper") || "",
  });
  const load = () => {
    setLoading(true);
    const clean = Object.fromEntries(Object.entries(form).filter(([, v]) => v));
    setParams(clean);
    api
      .get("/papers", { params: clean })
      .then((r) => setPapers(r.data.papers))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);
  return (
    <main className="section">
      <div className="container">
        <div className="page-heading">
          <div>
            <span className="eyebrow">PAST PAPERS</span>
            <h1>Find your paper.</h1>
            <p>Search by subject, year, session or paper number.</p>
          </div>
        </div>
        <div className="filters">
          <input
            placeholder="Search…"
            value={form.q}
            onChange={(e) => setForm({ ...form, q: e.target.value })}
          />
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          >
            <option value="">All subjects</option>
            <option>Mathematics</option>
            <option>Physical Sciences</option>
            <option>English</option>
            <option>Life Sciences</option>
            <option>Accounting</option>
          </select>
          <input
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />
          <select
            value={form.session}
            onChange={(e) => setForm({ ...form, session: e.target.value })}
          >
            <option value="">All sessions</option>
            <option>March</option>
            <option>June</option>
            <option>November</option>
          </select>
          <select
            value={form.paper}
            onChange={(e) => setForm({ ...form, paper: e.target.value })}
          >
            <option value="">All papers</option>
            <option value="1">Paper 1</option>
            <option value="2">Paper 2</option>
            <option value="3">Paper 3</option>
          </select>
          <button className="btn btn-primary" onClick={load}>
            Search
          </button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {papers.length ? (
              <div className="paper-grid">
                {papers.map((p) => (
                  <PaperCard key={p._id} paper={p} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h3>No papers found</h3>
                <p>Try another subject, year or search term.</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
