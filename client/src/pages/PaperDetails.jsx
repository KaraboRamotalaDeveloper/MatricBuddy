import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
export default function PaperDetails() {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    api.get(`/papers/${id}`).then((r) => setPaper(r.data.paper));
  }, [id]);
  if (!paper) return <div className="page-center">Loading…</div>;
  const save = async () => {
    if (!user) return;
    const r = await api.post(`/papers/${id}/save`);
    setSaved(r.data.saved);
  };
  return (
    <main className="section">
      <div className="container detail">
        <Link className="back" to="/papers">
          ← Back to papers
        </Link>
        <div className="detail-card">
          <div className="detail-top">
            <div>
              <span className="tag">{paper.subject}</span>
              <h1>{paper.title}</h1>
              <p>
                {paper.session} {paper.year} · Paper {paper.paper} ·{" "}
                {paper.language}
              </p>
            </div>
            <div className="detail-actions">
              <a
                className="btn btn-primary"
                href={paper.pdfUrl || paper.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open paper
              </a>
              {user && (
                <button className="btn btn-secondary" onClick={save}>
                  {saved ? "Saved" : "Save paper"}
                </button>
              )}
            </div>
          </div>
          <div className="detail-body">
            <h2>Topics</h2>
            <div className="tag-row">
              {paper.topics?.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <h2>Source</h2>
            <p>
              This paper is linked to its original source. MatricBuddy is
              designed to help you discover and study from papers without
              unnecessarily re-hosting copyrighted material.
            </p>
            <Link className="btn btn-dark" to={`/tutor?paper=${paper._id}`}>
              Ask AI about this paper
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
