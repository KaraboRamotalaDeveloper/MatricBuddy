import React from "react";
import { Link } from "react-router-dom";
export default function PaperCard({ paper }) {
  return (
    <article className="paper-card">
      <div className="paper-icon">PDF</div>
      <div className="paper-main">
        <div className="tag-row">
          <span className="tag">{paper.subject}</span>
          <span className="muted">{paper.year}</span>
        </div>
        <h3>{paper.title}</h3>
        <p>
          {paper.session} · Paper {paper.paper} · {paper.language}
        </p>
        <div className="card-actions">
          <Link className="btn btn-secondary" to={`/papers/${paper._id}`}>
            View
          </Link>
          <a
            className="btn btn-primary"
            href={paper.pdfUrl || paper.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Source
          </a>
        </div>
      </div>
    </article>
  );
}
