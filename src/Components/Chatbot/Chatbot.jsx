import React, { useEffect, useRef, useState } from "react";
import { FaCommentDots, FaPaperPlane } from "react-icons/fa";

const COMMON_QUESTIONS = [
  "What are your core skills?",
  "Show projects",
  "Show education",
  "Show experience",
  "What is your email?",
];

const normalize = (s = "") =>
  s
    .toLowerCase()
    .replace(/[.?!,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  /* ---------------- LOAD profile.json ---------------- */
  useEffect(() => {
    fetch("/profile.json")
      .then((res) => res.json())
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  /* ---------------- PUSH MESSAGE ---------------- */
  const push = (text, sender) =>
    setMessages((prev) => [...prev, { text, sender, ts: Date.now() }]);

  /* ---------------- ANSWER FROM PROFILE ---------------- */
  const getAnswerFromProfile = (question) => {
    if (!profile) return "Profile data is loading…";

    const q = normalize(question);

    /* ---- BASIC INFO ---- */
    if (q.includes("name") || q.includes("নাম"))
      return `My name is ${profile.name}.`;

    if (q.includes("email") || q.includes("ইমেইল"))
      return `Email: ${profile.email}`;

    if (
      q.includes("phone") ||
      q.includes("mobile") ||
      q.includes("number") ||
      q.includes("নম্বর")
    )
      return `Phone: ${profile.phone}`;

    if (
      q.includes("location") ||
      q.includes("address") ||
      q.includes("কোথায়")
    )
      return `Location: ${profile.location}`;

    /* ---- SKILLS ---- */
    if (q.includes("skill") || q.includes("skills") || q.includes("দক্ষতা")) {
      const s = profile.skills;
      return [
        "Here are my core skills:",
        `Frontend: ${s.frontend.join(", ")}`,
        `Backend: ${s.backend.join(", ")}`,
        `Programming: ${s.programming.join(", ")}`,
        `Tools: ${s.tools.join(", ")}`,
        `Soft Skills: ${s.soft.join(", ")}`,
      ].join("\n");
    }

    /* ---- PROJECTS ---- */
    if (q.includes("project") || q.includes("projects") || q.includes("প্রজেক্ট")) {
      return (
        "Here are some of my projects:\n" +
        profile.projects
          .map(
            (p, i) =>
              `${i + 1}. ${p.name} — ${p.stack.join(", ")}`
          )
          .join("\n")
      );
    }

    // Match specific project by name
    const projectMatch = profile.projects.find((p) =>
      normalize(p.name).includes(q)
    );
    if (projectMatch) {
      return `Project: ${projectMatch.name}
Stack: ${projectMatch.stack.join(", ")}
Key Features: ${projectMatch.features.slice(0, 3).join(", ")}`;
    }

    /* ---- EXPERIENCE ---- */
    if (q.includes("experience") || q.includes("অভিজ্ঞতা")) {
      const e = profile.experience[0];
      return `I have professional experience as a ${e.role} at ${e.org} (${e.years}).`;
    }

    /* ---- EDUCATION ---- */
    if (
      q.includes("education") ||
      q.includes("cgpa") ||
      q.includes("study") ||
      q.includes("শিক্ষা")
    ) {
      const e = profile.education[0];
      return `Education: ${e.degree}, ${e.institute} (CGPA: ${e.cgpa}).`;
    }

    /* ---- LINKS ---- */
    if (q.includes("github"))
      return `GitHub: ${profile.links?.github}`;

    if (q.includes("linkedin"))
      return `LinkedIn: ${profile.links?.linkedin}`;

    /* ---- FINAL FALLBACK (WITH CONTACT INFO) ---- */
    return (
      "I can help you with information about my skills, projects, education, experience, or contact details.\n\n" +
      "If you would like to know more or have any further questions, feel free to contact me at 01568777237 or email me at mdrifayethossen@gmail.com."
    );
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = (text) => {
    const msg = text.trim();
    if (!msg) return;

    push(msg, "user");
    setInput("");

    const reply = getAnswerFromProfile(msg);
    push(reply, "bot");

    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 50);
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <div
        onClick={() => setShowChat((s) => !s)}
        className="fixed bottom-6 left-6 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 text-white p-3 rounded-full shadow-lg cursor-pointer z-50 hover:scale-105 transition"
      >
        <FaCommentDots size={32} />
      </div>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-24 left-6 w-80 max-w-[90vw] bg-[#1e293b] rounded-xl shadow-2xl z-50 border border-blue-700">
          {/* Header */}
          <div className="flex justify-between items-center px-3 py-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white rounded-t-xl">
            <h3 className="text-sm font-semibold">Portfolio Assistant</h3>
            <button onClick={() => setShowChat(false)}>×</button>
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 bg-[#0a192f] border-b border-blue-700">
            <div className="flex flex-wrap gap-2">
              {COMMON_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="p-3 h-64 overflow-y-auto space-y-2"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-[#0a192f] text-blue-200 border border-blue-700"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-blue-700">
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage(input)
                }
                placeholder="Ask in Bangla or English…"
                className="w-full p-2 rounded-lg bg-[#1e293b] text-white border border-blue-700 focus:outline-none"
              />
              <button
                onClick={() => sendMessage(input)}
                className="absolute right-3 top-2 text-white"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
