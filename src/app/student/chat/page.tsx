"use client";

import ChatInterface from "@/components/chat/ChatInterface";

const studentContacts = [
  {
    id: "1",
    name: "Dr. Priya Nair",
    emoji: "👩🏻‍🏫",
    avatarBg: "rgba(108, 92, 231, 0.1)",
    lastMessage: "I'll prepare some practice problems for tomorrow. 📚",
    time: "10:37 AM",
    unread: 0,
    online: true,
  },
  {
    id: "2",
    name: "Raj Mehta",
    emoji: "👨🏽‍🔬",
    avatarBg: "rgba(0, 206, 201, 0.1)",
    lastMessage: "Try to solve problems 3.1 to 3.5 before the session.",
    time: "2:22 PM",
    unread: 1,
    online: true,
  },
  {
    id: "3",
    name: "Ananya Gupta",
    emoji: "👩🏾‍🔬",
    avatarBg: "var(--royal-50)",
    lastMessage: "Keep practicing those reactions. 🧪",
    time: "6:05 PM",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Mohammed Al-Farsi",
    emoji: "👨🏻‍💻",
    avatarBg: "rgba(255, 159, 10, 0.1)",
    lastMessage: "Great progress on the coding assignment!",
    time: "Yesterday",
    unread: 2,
    online: false,
  },
];

export default function StudentChatPage() {
  return <ChatInterface contacts={studentContacts} role="student" />;
}
