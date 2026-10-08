import React from "react";
import { useEffect, useState } from "react";
import { api } from "../services/api.js";
export default function Admin() {
  const [papers, setPapers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subject: "Mathematics",
    year: 2025,
    paper: 1,
    session: "November",
    language: "English",
    sourceName: "Source",
    sourceUrl: "",
    pdfUrl: "",
    topics: "",
  });
  const load = () => api.get("/papers").then((r) => setPapers(r.data.papers));
  useEffect(load, []);
  const add = async (e) => {
    e.preventDefault();
    await api.post("/papers", {
      ...form,
      year: Number(form.year),
      paper: Number(form.paper),
      topics: form.topics
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    });
    setForm({ ...form, title: "", sourceUrl: "", pdfUrl: "", topics: "" });
    load();
  };
  const del = async (id) => {
    await api.delete(`/papers/${id}`);
    load();
  };
  return (
    <main className="section">
      <div className="container admin">
        <span className="eyebrow">ADMIN</span>
        <h1>Paper management</h1>
        <form className="admin-form" onSubmit={add}>
          {["title", "sourceName", "sourceUrl", "pdfUrl", "topics"].map((k) => (
            <input
              key={k}
              placeholder={k}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          ))}
          <input
            type="number"
            placeholder="year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />
          <input
            type="number"
            min="1"
            placeholder="paper"
            value={form.paper}
            onChange={(e) => setForm({ ...form, paper: e.target.value })}
          />
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          >
            <option>Mathematics</option>
            <option>Physical Sciences</option>
            <option>English</option>
            <option>Life Sciences</option>
            <option>Accounting</option>
          </select>
          <button className="btn btn-primary">Add paper</button>
        </form>
        <div className="admin-list">
          {papers.map((p) => (
            <div className="admin-row" key={p._id}>
              <div>
                <b>{p.title}</b>
                <span>
                  {p.subject} · {p.year}
                </span>
              </div>
              <button className="btn btn-danger" onClick={() => del(p._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
