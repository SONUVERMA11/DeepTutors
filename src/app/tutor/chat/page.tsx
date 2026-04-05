"use client";

import ChatInterface from "@/components/chat/ChatInterface";

const tutorContacts = [
  {
    id: "1",
    name: "Arjun Sharma",
    emoji: "👨🏽‍🎓",
    avatarBg: "var(--royal-50)",
    lastMessage: "Can we practice more examples in our next session?",
    time: "10:36 AM",
    unread: 1,
    online: true,
  },
  {
    id: "2",
    name: "Fatima Al-Rashid",
    emoji: "👩🏽‍🎓",
    avatarBg: "rgba(108, 92, 231, 0.1)",
    lastMessage: "Confirmed! Should I bring my physics textbook?",
    time: "2:20 PM",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Wei Chen",
    emoji: "👨🏻‍🎓",
    avatarBg: "rgba(0, 206, 201, 0.1)",
    lastMessage: "I finally understand organic chemistry mechanisms.",
    time: "6:00 PM",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Priya Reddy",
    emoji: "👩🏾‍🎓",
    avatarBg: "rgba(255, 159, 10, 0.1)",
    lastMessage: "Thank you so much for your help!",
    time: "Yesterday",
    unread: 3,
    online: false,
  },
  {
    id: "5",
    name: "Omar Ahmed",
    emoji: "👨🏽‍🎓",
    avatarBg: "rgba(52, 199, 89, 0.1)",
    lastMessage: "See you at the session on Friday!",
    time: "Mon",
    unread: 0,
    online: false,
  },
];

export default function TutorChatPage() {
  return <ChatInterface contacts={tutorContacts} role="tutor" />;
}
