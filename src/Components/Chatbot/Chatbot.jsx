import React, { useEffect, useRef, useState } from "react";
import { FaCommentDots, FaPaperPlane } from "react-icons/fa";

const COMMON_QUESTIONS = [
  "What are your core skills?",
  "Show projects",
  "Show experience",
  "Where are you currently working?",
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

  /* ---------------- ANSWER ENGINE ---------------- */
  const getAnswerFromProfile = (question) => {
    if (!profile) return "Profile data is loading…";

    const q = normalize(question);

    /* BASIC INFO */
    if (q.includes("name")) return `My name is ${profile.name}.`;
    if (q.includes("father")) return `My father's name is ${profile.father_name}.`;
    if (q.includes("mother")) return `My mother's name is ${profile.mother_name}.`;

    /* CONTACT */
    if (q.includes("email")) return `Email: ${profile.email}`;
    if (q.includes("phone") || q.includes("number"))
      return `Phone: ${profile.phone}`;

    /* LOCATION */
    if (q.includes("permanent"))
      return `Permanent address: ${profile.permanent_address}.`;
    if (q.includes("location") || q.includes("address"))
      return `Current location: ${profile.current_location}.`;

    /* CURRENT JOB */
    if (q.includes("current") || q.includes("working")) {
      const c = profile.current_position;
      return `I am currently working at ${c.company} as a ${c.role} (since ${c.start_date}).`;
    }

    /* SKILLS */
    if (q.includes("skill")) {
      const s = profile.skills;
      return [
        "My core skills:",
        `Frontend: ${s.frontend.join(", ")}`,
        `Backend: ${s.backend.join(", ")}`,
        `Tools: ${s.tools.join(", ")}`,
      ].join("\n");
    }

    /* SHOPIFY */
    if (q.includes("shopify") || q.includes("liquid") || q.includes("theme")) {
      return "I work with Shopify theme development, Liquid templating, custom sections, snippets, and performance optimization.";
    }

    /* PROJECTS */
    if (q.includes("project")) {
      return (
        "Projects:\n" +
        profile.projects
          .map((p, i) => `${i + 1}. ${p.name}`)
          .join("\n")
      );
    }

    const projectMatch = profile.projects.find((p) =>
      normalize(p.name).includes(q)
    );
    if (projectMatch) {
      return `${projectMatch.name}\nStack: ${projectMatch.stack.join(", ")}`;
    }

    /* EXPERIENCE */
    if (q.includes("experience")) {
      return (
        "Experience:\n" +
        profile.experience
          .map((e) => `${e.role} at ${e.org} (${e.years})`)
          .join("\n")
      );
    }

    /* EDUCATION */
    if (q.includes("education") || q.includes("cgpa")) {
      const e = profile.education[0];
      return `Education: ${e.degree} at ${e.institute} (CGPA ${e.cgpa}).`;
    }

    /* LINKS */
    if (q.includes("github")) return `GitHub: ${profile.links.github}`;
    if (q.includes("linkedin")) return `LinkedIn: ${profile.links.linkedin}`;

    /* FALLBACK */
    return (
      "I can help you with information about my skills, projects, experience, and work details.\n\n" +
      `For more details, contact me at ${profile.phone} or ${profile.email}.`
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
      {/* Floating Icon */}
      <div
        onClick={() => setShowChat((s) => !s)}
        className="fixed bottom-6 left-6 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 text-white p-3 rounded-full shadow-lg cursor-pointer z-50 hover:scale-105 transition"
      >
        <FaCommentDots size={30} />
      </div>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-20 left-6 w-80 max-w-[90vw] bg-[#1e293b] rounded-xl shadow-2xl z-50 border border-blue-700">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white rounded-t-xl">
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
                  className="text-xs px-2 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-500"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="p-3 h-48 overflow-y-auto space-y-2"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
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
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask in Bangla or English…"
                className="w-full p-2 text-sm rounded-lg bg-[#1e293b] text-white border border-blue-700 focus:outline-none"
              />
              <button
                onClick={() => sendMessage(input)}
                className="absolute right-3 top-2.5 text-white"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
