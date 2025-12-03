import React, { useEffect, useMemo, useState, useRef } from "react";
import { FaCommentDots, FaPaperPlane } from "react-icons/fa";

const COMMON_QUESTIONS = [
  "What are your core skills?",
  "Show projects",
  "Show education",
  "Show experience"
];

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetch("/profile.json")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  const idx = useMemo(() => {
    if (!profile) return null;

   
    const key = {
      email: profile.email,
      phone: profile.phone,
      number: profile.phone,
      mobile: profile.phone,
      github: profile.links?.github,
      linkedin: profile.links?.linkedin,
      location: profile.location,
      address: profile.location,
      name: profile.name
    };

    return { key, profile };
  }, [profile]);

  const toggleChatWindow = () => setShowChat((s) => !s);

  const push = (text, sender) =>
    setMessages((prev) => [...prev, { text, sender, ts: Date.now() }]);

  const normalize = (s) =>
    s.toLowerCase()
      .replace(/[.?!,]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const detectIntent = (text) => {
    const t = normalize(text);

    // Bangla hints
    const bn = {
      email: /(email|মেইল|ইমেইল)/,
      phone: /(phone|ফোন|নম্বর|নাম্বার|number|mobile|মোবাইল)/,
      github: /(github|গিটহাব)/,
      linkedin: /(linkedin|লিংকডইন)/,
      skills: /(skill|skills|দক্ষতা|স্কিল)/,
      projects: /(project|projects|প্রজেক্ট)/,
      education: /(education|শিক্ষা|ডিগ্রি|cgpa)/,
      experience: /(experience|অভিজ্ঞতা|চাকরি|job|কাজ)/,
      location: /(location|address|লোকেশন|ঠিকানা|কোথায়|where)/,
      name: /(name|নাম)/,
      ihss: /(ihss|healthcare support|ইএইচএসএস|ইএইচএসএস প্রকল্প)/
    };

    if (bn.email.test(t)) return "email";
    if (bn.phone.test(t)) return "phone";
    if (bn.github.test(t)) return "github";
    if (bn.linkedin.test(t)) return "linkedin";
    if (bn.skills.test(t)) return "skills";
    if (bn.projects.test(t)) return "projects";
    if (bn.education.test(t)) return "education";
    if (bn.experience.test(t)) return "experience";
    if (bn.location.test(t)) return "location";
    if (bn.name.test(t)) return "name";
    if (bn.ihss.test(t)) return "ihss";

    // English fallbacks
    if (t.includes("project")) return "projects";
    if (t.includes("experience")) return "experience";
    if (t.includes("education") || t.includes("cgpa")) return "education";
    if (t.includes("skill")) return "skills";
    if (t.includes("where") && t.includes("based")) return "location";

    return "fallback";
  };

  const answer = (intent) => {
    if (!idx) return "Data not loaded yet.";
    const { key, profile } = idx;

    switch (intent) {
      case "email":
        return `Email: ${key.email}`;
      case "phone":
        return `Phone: ${key.phone}`;
      case "github":
        return `GitHub: ${key.github}`;
      case "linkedin":
        return `LinkedIn: ${key.linkedin}`;
      case "location":
        return `Location: ${key.location}`;
      case "name":
        return `Name: ${profile.name}`;
      case "skills": {
        const s = profile.skills;
        return [
          "Skills:",
          `Frontend: ${s.frontend.join(", ")}`,
          `Backend: ${s.backend.join(", ")}`,
          `Programming: ${s.programming.join(", ")}`,
          `Tools: ${s.tools.join(", ")}`,
          `Soft: ${s.soft.join(", ")}`
        ].join("\n");
      }
      case "projects": {
        return (
          "Projects:\n" +
          profile.projects
            .map(
              (p, i) =>
                `${i + 1}. ${p.name} — Stack: ${p.stack.join(", ")}. Key: ${p.features.slice(0, 3).join(", ")}`
            )
            .join("\n")
        );
      }
      case "education": {
        const e = profile.education[0];
        return `Education: ${e.degree}, ${e.institute} (CGPA ${e.cgpa}). Years: ${e.years}.`;
      }
      case "experience": {
        const x = profile.experience[0];
        return `Experience: ${x.role} at ${x.org} (${x.years}). Focus: ${x.highlights.slice(0, 3).join("; ")}.`;
      }
      case "ihss": {
        const ihss = profile.projects.find((p) =>
          p.name.toLowerCase().includes("integrated healthcare support system")
        );
        if (!ihss) return "IHSS info unavailable.";
        return `IHSS: ${ihss.stack.join(" + ")}. Features: ${ihss.features.join(", ")}. Repo: ${profile.links.project_repo}`;
      }
      default:
        // Try FAQ exact match
        const f = profile.faqs?.find(
          (fq) => normalize(fq.q) === normalize(input)
        );
        if (f) return f.a;

        // Try contains
        const g = profile.faqs?.find((fq) =>
          normalize(input).includes(normalize(fq.q))
        );
        if (g) return g.a;

        return "I can share email, phone, skills, projects, education, experience, GitHub, LinkedIn, or location. Ask in Bangla or English.";
    }
  };

  const handleSendMessage = (text) => {
    const msg = text.trim();
    if (!msg) return;
    push(msg, "user");

    const intent = detectIntent(msg);
    const reply = answer(intent);
    push(reply, "bot");

    // Scroll to the latest message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleQuickAsk = (q) => {
    push(q, "user");
    setInput("");
    const intent = detectIntent(q);
    const reply = answer(intent);
    push(reply, "bot");

    // Scroll to the latest message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div>
      {/* Icon bottom-left */}
      <div
        className="fixed bottom-6 left-6 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 text-white p-3 rounded-full shadow-lg cursor-pointer z-50 hover:scale-105 transition"
        onClick={toggleChatWindow}
        aria-label="Open chatbot"
      >
        <FaCommentDots size={36} />
      </div>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-24 left-6 w-80 max-w-[90vw] bg-[#1e293b] shadow-2xl rounded-xl z-50 border border-blue-700">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white px-3 py-2 rounded-t-xl">
            <h3 className="text-sm font-semibold">Ask about Rifat</h3>
            <button
              onClick={toggleChatWindow}
              className="text-lg font-bold hover:opacity-80"
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>

          {/* Quick FAQs */}
          <div className="px-3 py-2 bg-[#0a192f] border-b border-blue-700">
            <div className="text-xs text-blue-200 mb-2">Common questions</div>
            <div className="flex flex-wrap gap-2">
              {COMMON_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuickAsk(q)}
                  className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none px-2 py-1 rounded-lg hover:from-blue-700 hover:to-purple-700"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="p-3 h-64 overflow-y-auto space-y-2 bg-[#1e293b]"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] whitespace-pre-wrap px-3 py-2 rounded-2xl text-sm ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
                      : "bg-[#0a192f] text-blue-200 border border-blue-700 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="relative p-3 bg-[#0a192f] rounded-b-xl border-t border-blue-700">
            <input
              type="text"
              placeholder="Ask in Bangla or English…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(input);
                  setInput("");
                }
              }}
              className="w-full p-2 rounded-lg border border-blue-700 bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {/* Send Button */}
            <button
              onClick={() => handleSendMessage(input)}
              className="absolute right-3 bottom-3 text-white"
            >
              <FaPaperPlane size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
