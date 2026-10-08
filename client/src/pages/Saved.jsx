import React from "react";
import { useEffect, useState } from "react";
import { api } from "../services/api.js";
import PaperCard from "../components/PaperCard.jsx";
export default function Saved() {
  const [papers, setPapers] = useState([]);
  useEffect(() => {
    api.get("/papers/saved").then((r) => setPapers(r.data.papers));
  }, []);
  return (
    <main className="section">
      <div className="container">
        <span className="eyebrow">YOUR LIBRARY</span>
        <h1>Saved papers</h1>
        <p>Keep the papers you want to revisit close by.</p>
        <div className="paper-grid">
          {papers.map((p) => (
            <PaperCard key={p._id} paper={p} />
          ))}
        </div>
        {!papers.length && (
          <div className="empty">
            <h3>Your library is empty.</h3>
            <p>Save a paper from its details page.</p>
          </div>
        )}
      </div>
    </main>
  );
}
