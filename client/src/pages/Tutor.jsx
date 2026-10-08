import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
export default function Tutor() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const paperId = params.get("paper");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const send = async (e) => {
    e.preventDefault();
    if (!input.trim() || busy) return;
    const question = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: question }]);
    setBusy(true);
    try {
      const r = await api.post("/ai/tutor", { question, paperId });
      setMessages((m) => [...m, { role: "assistant", content: r.data.answer }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: err.response?.data?.message || "Something went wrong.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };
  if (!user)
    return (
      <div className="page-center">
        <div>
          <h2>Login to use the AI Tutor</h2>
          <p>Your conversations are saved to your account.</p>
        </div>
      </div>
    );
  return (
    <main className="section tutor-page">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">AI STUDY ASSISTANT</span>
          <h1>Ask MatricBuddy.</h1>
          <p>Get explanations, hints and step-by-step guidance.</p>
        </div>
        <div className="chat">
          <div className="chat-header">
            <div className="ai-avatar">M</div>
            <div>
              <b>MatricBuddy Tutor</b>
              <span>Study with guidance, not shortcuts.</span>
            </div>
          </div>
          <div className="messages">
            {messages.length === 0 && (
              <div className="welcome">
                <h3>What are you stuck on?</h3>
                <p>
                  Try “Explain differentiation to me like I’m a beginner” or
                  paste a question.
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                className={m.role === "user" ? "message user" : "message"}
                key={i}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="message">
                <span className="typing">Thinking…</span>
              </div>
            )}
          </div>
          <form className="chat-input" onSubmit={send}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              rows="2"
            />
            <button className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </main>
  );
}
