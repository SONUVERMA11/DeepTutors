"use client";

import { useEffect, useState, useRef } from "react";
import { getUserProfile, getConversations, getMessages, sendMessage } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";

export default function StudentChatPage() {
  const [profile, setProfile] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConvo, setActiveConvo] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const [p, convos] = await Promise.all([getUserProfile(), getConversations()]);
      setProfile(p);
      setConversations(convos);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openConvo = async (convo: any) => {
    setActiveConvo(convo);
    const msgs = await getMessages(convo.id);
    setMessages(msgs);
  };

  const handleSend = async () => {
    if (!newMsg.trim() || !activeConvo) return;
    const receiverId = activeConvo.student_id === profile?.id ? activeConvo.assigned_tutor_id : activeConvo.student_id;
    await sendMessage(activeConvo.id, receiverId, newMsg.trim());
    setNewMsg("");
    const msgs = await getMessages(activeConvo.id);
    setMessages(msgs);
  };

  if (loading) return <div className={s.dashPage}><div className="skeleton" style={{ height: "400px" }} /></div>;

  if (conversations.length === 0) {
    return (
      <div className={s.dashPage}>
        <div className={s.emptyState} style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className={s.emptyIcon}>💬</div>
          <div className={s.emptyTitle}>No active conversations</div>
          <p>Once an admin matches you with a tutor, your chat will appear here automatically.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "calc(100vh - var(--header-height))", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{
        width: "280px", borderRight: "1px solid var(--card-border)", background: "var(--bg-surface)",
        display: "flex", flexDirection: "column", flexShrink: 0,
      }}>
        <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--card-border)" }}>
          <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700 }}>Messages</h3>
        </div>
        {conversations.map((c) => (
          <button key={c.id} onClick={() => openConvo(c)}
            style={{
              padding: "1rem 1.25rem", textAlign: "left", background: activeConvo?.id === c.id ? "var(--royal-50)" : "transparent",
              borderBottom: "1px solid var(--card-border)", cursor: "pointer", border: "none", width: "100%",
              color: "var(--text-main)", fontFamily: "inherit",
            }}>
            <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>{c.subject}</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              {c.profiles?.full_name}
            </div>
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {activeConvo ? (
          <>
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--card-border)", background: "var(--bg-surface)" }}>
              <h4 style={{ fontWeight: 700 }}>{activeConvo.subject}</h4>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{
                  alignSelf: msg.sender_id === profile?.id ? "flex-end" : "flex-start",
                  maxWidth: "70%",
                }}>
                  <div style={{
                    padding: "0.75rem 1rem", borderRadius: "16px",
                    background: msg.sender_id === profile?.id ? "var(--royal)" : "var(--bg-alt)",
                    color: msg.sender_id === profile?.id ? "white" : "var(--text-main)",
                    fontSize: "var(--text-sm)",
                  }}>
                    {msg.content}
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "0.25rem", textAlign: msg.sender_id === profile?.id ? "right" : "left" }}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--card-border)", display: "flex", gap: "0.75rem", background: "var(--bg-surface)" }}>
              <input
                className="input-field"
                placeholder="Type a message..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary btn-sm" onClick={handleSend} disabled={!newMsg.trim()}>Send</button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
            <p>Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
