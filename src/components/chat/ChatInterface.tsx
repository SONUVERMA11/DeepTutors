"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatInterface.module.css";

interface Contact {
  id: string;
  name: string;
  emoji: string;
  avatarBg: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  text: string;
  sent: boolean;
  time: string;
}

interface ChatInterfaceProps {
  contacts: Contact[];
  role: "student" | "tutor";
}

const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", text: "Hi! I had a question about the quadratic formula we covered yesterday.", sent: true, time: "10:30 AM" },
    { id: "m2", text: "Of course! Which part was unclear?", sent: false, time: "10:31 AM" },
    { id: "m3", text: "I'm confused about the discriminant. When is it negative?", sent: true, time: "10:33 AM" },
    { id: "m4", text: "Great question! When the discriminant (b² - 4ac) is negative, it means the equation has no real roots — only complex ones. Think of it as the parabola not touching the x-axis.", sent: false, time: "10:35 AM" },
    { id: "m5", text: "Oh that makes so much sense! Can we practice more examples in our next session?", sent: true, time: "10:36 AM" },
    { id: "m6", text: "Absolutely! I'll prepare some practice problems for tomorrow. See you at 4 PM! 📚", sent: false, time: "10:37 AM" },
  ],
  "2": [
    { id: "m1", text: "Hello! Just confirming our session for tomorrow at 5 PM.", sent: false, time: "2:15 PM" },
    { id: "m2", text: "Confirmed! Should I bring my physics textbook?", sent: true, time: "2:20 PM" },
    { id: "m3", text: "Yes, and also try to solve problems 3.1 to 3.5 before the session.", sent: false, time: "2:22 PM" },
  ],
  "3": [
    { id: "m1", text: "Thank you for the amazing session today! I finally understand organic chemistry mechanisms.", sent: true, time: "6:00 PM" },
    { id: "m2", text: "You're welcome! You did really well today. Keep practicing those reactions. 🧪", sent: false, time: "6:05 PM" },
  ],
};

export default function ChatInterface({ contacts, role }: ChatInterfaceProps) {
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContactData = contacts.find((c) => c.id === activeContact);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: `m${Date.now()}`,
      text: newMessage.trim(),
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");

    // Mock typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: `m${Date.now() + 1}`,
        text: "Thanks for your message! I'll get back to you shortly. 😊",
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectContact = (id: string) => {
    setActiveContact(id);
    setMessages(mockMessages[id] ?? []);
    setShowChat(true);
  };

  return (
    <div className={styles.chatLayout}>
      {/* ── Contacts Panel ── */}
      <div
        className={`${styles.contactsPanel} ${
          showChat ? styles.contactsPanelHidden : ""
        }`}
      >
        <div className={styles.contactsHeader}>
          <h2 className={styles.contactsTitle}>
            {role === "student" ? "My Tutors" : "My Students"}
          </h2>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="chat-search-input"
            />
          </div>
        </div>

        <div className={styles.contactsList}>
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              className={`${styles.contactItem} ${
                activeContact === contact.id ? styles.contactItemActive : ""
              }`}
              onClick={() => selectContact(contact.id)}
            >
              <div
                className={styles.contactAvatar}
                style={{ background: contact.avatarBg }}
              >
                {contact.emoji}
              </div>
              <div className={styles.contactInfo}>
                <div className={styles.contactName}>{contact.name}</div>
                <div className={styles.contactPreview}>
                  {contact.lastMessage}
                </div>
              </div>
              <div className={styles.contactMeta}>
                <span className={styles.contactTime}>{contact.time}</span>
                {contact.unread > 0 && (
                  <span className={styles.contactUnread}>
                    {contact.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat Area ── */}
      <div
        className={`${styles.chatArea} ${
          !showChat ? styles.chatAreaHidden : ""
        }`}
      >
        {activeContactData ? (
          <>
            {/* Chat Header */}
            <div className={styles.chatHeader}>
              <button
                className={styles.mobileBack}
                onClick={() => setShowChat(false)}
                aria-label="Back to contacts"
              >
                ←
              </button>
              <div
                className={styles.chatHeaderAvatar}
                style={{ background: activeContactData.avatarBg }}
              >
                {activeContactData.emoji}
              </div>
              <div>
                <div className={styles.chatHeaderName}>
                  {activeContactData.name}
                </div>
                {activeContactData.online && (
                  <div className={styles.chatHeaderStatus}>
                    <span className={styles.statusDot} />
                    Online
                  </div>
                )}
              </div>
              <div className={styles.chatHeaderActions}>
                <button className={styles.chatHeaderBtn} title="Video call">
                  📹
                </button>
                <button className={styles.chatHeaderBtn} title="More options">
                  ⋯
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messagesArea}>
              <div className={styles.dateSeparator}>Today</div>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageRow} ${
                    msg.sent
                      ? styles.messageRowSent
                      : styles.messageRowReceived
                  }`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      msg.sent
                        ? styles.messageSent
                        : styles.messageReceived
                    }`}
                  >
                    {msg.text}
                    <span className={styles.messageTime}>{msg.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className={styles.typingIndicator}>
                  <div className={styles.typingDots}>
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                  </div>
                  <span>{activeContactData.name} is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Compose */}
            <div className={styles.composeBar}>
              <button className={styles.attachBtn} title="Attach file">
                📎
              </button>
              <input
                className={styles.composeInput}
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                id="chat-compose-input"
              />
              <button
                className={`${styles.composeBtn} ${
                  !newMessage.trim() ? styles.composeBtnDisabled : ""
                }`}
                onClick={handleSend}
                disabled={!newMessage.trim()}
                id="chat-send-btn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyChatState}>
            <span className={styles.emptyChatEmoji}>💬</span>
            <h3 className={styles.emptyChatTitle}>
              Select a conversation
            </h3>
            <p className={styles.emptyChatText}>
              Choose a {role === "student" ? "tutor" : "student"} from the
              list to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
