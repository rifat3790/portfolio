import React, { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import profile from "../../../public/rifat.png"; // Ensure this path is correct!

// Color schemes (HSL, 60% lightness)
const COLOR_SCHEMES = [
  { name: "Ocean Blue", hsl: "hsl(210, 80%, 60%)", tw: "from-blue-500 to-blue-300" },
  { name: "Emerald Green", hsl: "hsl(150, 70%, 60%)", tw: "from-green-500 to-green-300" },
  { name: "Royal Purple", hsl: "hsl(270, 70%, 60%)", tw: "from-purple-500 to-purple-300" },
  { name: "Sunset Orange", hsl: "hsl(20, 90%, 60%)", tw: "from-orange-500 to-orange-300" },
  { name: "Rose Pink", hsl: "hsl(340, 70%, 60%)", tw: "from-pink-500 to-pink-300" },
  { name: "Electric Cyan", hsl: "hsl(190, 100%, 60%)", tw: "from-cyan-500 to-cyan-300" },
];

const TITLES = [
  "Full Stack Developer",
  "React & Next.js Specialist",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

const STATS = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Done", value: "6+" },
  { label: "Technologies", value: "31+" },
];

const SOCIALS = [
  { icon: "fab fa-whatsapp", label: "Chat on WhatsApp", href: "#", color: "bg-green-600" },
  { icon: "fas fa-envelope", label: "Send Email", href: "#", color: "bg-blue-700" },
  { icon: "fab fa-linkedin-in", label: "Connect on LinkedIn", href: "#", color: "bg-blue-800" },
];

// Matrix code rain animation (canvas)
function MatrixRain({ primaryColor }) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?";
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#0a192f";
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 0.3;
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = primaryColor;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    let animation;
    function animate() {
      draw();
      animation = setTimeout(animate, 50);
    }
    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(animation);
      window.removeEventListener("resize", handleResize);
    };
  }, [primaryColor]);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

// Theme switcher with close icon
function ThemeSwitcher({ colorIdx, setColorIdx, showTheme, setShowTheme }) {
  return (
    <div className={`fixed top-6 left-6 z-10 flex flex-col gap-2 bg-white/70 dark:bg-black/40 rounded-xl p-3 shadow-lg backdrop-blur-md ${showTheme ? "" : "hidden"}`}>
      <button
        onClick={() => setShowTheme(false)}
        className="absolute top-1 right-1 text-2xl text-gray-700 dark:text-gray-200"
        aria-label="Close Theme Switcher"
      >
        &times;
      </button>
      <div className="font-semibold text-xs text-gray-700 dark:text-gray-200">Theme</div>
      <div className="flex gap-2">
        {COLOR_SCHEMES.map((scheme, idx) => (
          <button
            key={scheme.name}
            aria-label={scheme.name}
            className={`w-7 h-7 rounded-full border-2 ${colorIdx === idx ? "border-gray-900 dark:border-white" : "border-white"} bg-gradient-to-br ${scheme.tw}`}
            onClick={() => setColorIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
}

const Banner = () => {
  // Theme state
  const [colorIdx, setColorIdx] = useState(0);
  const primaryColor = COLOR_SCHEMES[colorIdx].hsl;
  const gradientTW = COLOR_SCHEMES[colorIdx].tw;

  const [showTheme, setShowTheme] = useState(true); // To control theme switcher visibility
  const [borderAngle, setBorderAngle] = useState(0);

  useEffect(() => {
    let raf;
    function animate() {
      setBorderAngle((a) => (a + 1) % 360);
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] to-[#1e293b] dark:from-[#0a192f] dark:to-[#1e293b] overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain primaryColor={primaryColor} />

      {/* Theme Switcher */}
      <ThemeSwitcher colorIdx={colorIdx} setColorIdx={setColorIdx} showTheme={showTheme} setShowTheme={setShowTheme} />

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 py-16 flex flex-col items-center gap-8">
        {/* Profile Image */}
        <div className="relative flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full border-4 border-transparent`}
            style={{
              background: `conic-gradient(${primaryColor} ${borderAngle}deg, #fff 0deg 360deg)`,
              filter: "blur(2px)",
              transition: "background 0.3s",
              pointerEvents: "none",
              zIndex: 0,
              width: "154px",
              height: "154px",
            }}
          />
          <img
            src={profile}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover relative z-10"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-center text-white dark:text-white drop-shadow-lg">
          Hi, I'm <span className={`bg-gradient-to-r ${gradientTW} bg-clip-text text-transparent`}>MD. REFAYET HOSSEN</span>
        </h1>

        {/* Typing Animation */}
        <div className={`text-xl md:text-2xl font-semibold text-center text-blue-300 dark:text-blue-400 min-h-[32px] border-r-2 border-blue-400 pr-2`}>
          <Typewriter
            words={TITLES}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1200}
          />
        </div>

        {/* Description */}
        <p className="text-gray-300 dark:text-gray-200 text-center max-w-xl text-lg drop-shadow">
          Passionate about creating responsive and interactive web applications
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4 w-full sm:w-auto justify-center">
          <a
            href="#contact"
            className={`btn btn-primary bg-gradient-to-r ${gradientTW} shadow-lg w-full sm:w-auto px-8 py-3 text-center`}
          >
            Get In Touch
          </a>
          <a
            href="/resume.pdf"
            download
            className={`btn btn-outline btn-info w-full sm:w-auto px-8 py-3 text-center`}
          >
            Download Resume
          </a>
          <button className="btn btn-secondary w-full sm:w-auto px-8 py-3 text-center">
            Preview
          </button>
          <button className="btn btn-secondary w-full sm:w-auto px-8 py-3 text-center">
            Share
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-2xl">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-xl p-8 bg-white/10 dark:bg-black/30 backdrop-blur-md border-2 border-blue-400 shadow-xl flex flex-col items-center"
            >
              <span className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${gradientTW} bg-clip-text text-transparent drop-shadow`}>
                {stat.value}
              </span>
              <span className="text-base font-semibold text-gray-200 mt-2">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          {SOCIALS.map((social, i) => (
            <a
              key={social.label}
              href={social.href}
              className={`btn ${social.color}`}
            >
              <i className={social.icon}></i> {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
