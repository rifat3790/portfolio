import React, { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Typewriter } from "react-simple-typewriter";
import profile from "../../../public/rifat.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "./Banner.css"; // Import the CSS file for styling
import "../../../public/resume.pdf";
import { ThemeContext, COLOR_SCHEMES } from "../../context/themeContext";

const TITLES = [
  "Full Stack Developer",
  "React & Next.js Specialist",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

const STATS = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Done", value: "100+" },
  { label: "Technologies", value: "31+" },
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

function ThreeGShape({ color }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 4.5);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    const directional = new THREE.DirectionalLight(0xffffff, 1.4);
    directional.position.set(4, 5, 6);
    scene.add(ambient, directional);

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color).multiplyScalar(0.25),
      metalness: 0.8,
      roughness: 0.15,
      transparent: true,
      opacity: 0.92,
    });

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.3, 0.16, 32, 140, Math.PI * 1.5),
      material,
    );
    torus.rotation.x = Math.PI / 2.4;
    torus.rotation.z = Math.PI / 5;

    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.14, 0.14),
      material,
    );
    bar.position.set(0.46, 0.35, 0);
    bar.rotation.z = -Math.PI / 5;

    const group = new THREE.Group();
    group.add(torus, bar);
    scene.add(group);

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width && height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    let renderId;
    const animate = () => {
      group.rotation.y += 0.005;
      group.rotation.x += 0.0018;
      group.rotation.z = Math.sin(Date.now() * 0.0008) * 0.07;
      renderer.render(scene, camera);
      renderId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(renderId);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none"
      aria-hidden="true"
    />
  );
}

const Banner = () => {
  const { colorIdx, isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const primaryColor = COLOR_SCHEMES[colorIdx].hsl;
  const gradientTW = COLOR_SCHEMES[colorIdx].tw;
  const [borderAngle, setBorderAngle] = useState(0);
  const [resumeModal, setResumeModal] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [showShare, setShowShare] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // Share button handler for copy
  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setShareMsg("Link copied!");
    setTimeout(() => setShareMsg(""), 1500);
  };

  // Social share handlers
  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl,
      )}`,
      icon: <FaFacebookF className="text-blue-600" />,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        currentUrl,
      )}`,
      icon: <FaLinkedinIn className="text-blue-600" />,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl,
      )}`,
      icon: <FaTwitter className="text-blue-600" />,
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
      icon: <span className="text-green-500 font-bold">WA</span>,
    },
    {
      name: "Copy Link",
      url: "#",
      icon: <FaGithub className="text-gray-700" />,
      onClick: handleCopy,
    },
  ];

  // Handle scroll event
  const bannerRef = useRef();

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
    <section
      id="home"
      ref={bannerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-[#020617] to-[#0f172a] text-white"
          : "bg-gradient-to-br from-white to-slate-100 text-slate-950"
      }`}
    >
      {/* Matrix Rain Background */}
      <MatrixRain primaryColor={primaryColor} />
      <ThreeGShape color={COLOR_SCHEMES[colorIdx].start} />

      {/* Theme Icon Button */}
      <button
        className={`fixed bottom-6 right-6 z-20 rounded-full p-3 shadow-lg backdrop-blur-md border transition-colors duration-300 hover:scale-110 ${
          isDarkMode
            ? "border-white/20 bg-black/70 text-white"
            : "border-slate-300 bg-white/90 text-slate-900"
        }`}
        aria-label="Toggle theme"
        onClick={() => setIsDarkMode((prev) => !prev)}
        style={{ transform: "translateY(50%)" }}
      >
        {isDarkMode ? (
          <FaSun className="text-xl theme-accent-text" />
        ) : (
          <FaMoon className="text-xl theme-accent-text" />
        )}
      </button>

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
          Hi, I'm{" "}
          <span
            className={`bg-gradient-to-r ${gradientTW} bg-clip-text text-transparent`}
          >
            MD. REFAYET HOSSEN
          </span>
        </h1>

        {/* Typing Animation */}
        <div
          className={`text-xl md:text-2xl font-semibold text-center text-blue-300 dark:text-blue-400 min-h-[32px] border-r-2 border-blue-400 pr-2`}
        >
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
          <button
            className="btn btn-secondary w-full sm:w-auto px-8 py-3 text-center"
            onClick={() => setResumeModal(true)}
          >
            Preview Resume
          </button>
          <button
            className="btn btn-secondary w-full sm:w-auto px-8 py-3 text-center"
            onClick={() => setShowShare((v) => !v)}
          >
            Share
          </button>
        </div>
        {shareMsg && (
          <div className="fixed bottom-20 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50 transition">
            {shareMsg}
          </div>
        )}

        {/* Share Modal/Popup */}
        {showShare && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-xs w-full mx-4 flex flex-col items-center relative animate-fadeInUp">
              <button
                className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-all"
                onClick={() => setShowShare(false)}
              >
                Close
              </button>
              <h3 className="text-lg font-bold text-blue-600 mb-4">
                Share this page
              </h3>
              <div className="flex flex-col gap-4 w-full">
                {shareLinks.map((item) =>
                  item.name === "Copy Link" ? (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-blue-100 text-gray-700 font-semibold justify-center"
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-blue-100 text-gray-700 font-semibold justify-center"
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-2xl">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-8 bg-white/10 dark:bg-black/30 backdrop-blur-md border-2 border-blue-400 shadow-xl flex flex-col items-center"
            >
              <span
                className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${gradientTW} bg-clip-text text-transparent drop-shadow`}
              >
                {stat.value}
              </span>
              <span className="text-base font-semibold text-gray-200 mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Social Links on the left (middle left side) */}
        <div
          className={`fixed top-1/2 left-6 z-20 flex flex-col gap-6 items-center -translate-y-1/2`}
        >
          <a
            href="https://www.facebook.com/Rifayet221/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-3xl text-blue-600 hover:text-blue-800 transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/md-refayet-hossen-62b796236/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="text-3xl text-blue-600 hover:text-blue-800 transition-colors" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-3xl text-blue-600 hover:text-blue-800 transition-colors" />
          </a>
          <a
            href="https://github.com/rifat3790"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-3xl hover:text-blue-800 transition-colors" />
          </a>
        </div>
      </div>

      {/* Resume Preview Modal */}
      {resumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-4 max-w-2xl w-full mx-4 flex flex-col items-center relative animate-fadeInUp">
            <button
              className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-all"
              onClick={() => setResumeModal(false)}
            >
              Close
            </button>
            <h3 className="text-xl font-bold text-blue-600 mb-4">
              Resume Preview
            </h3>
            <div className="w-full h-[70vh] flex items-center justify-center">
              <iframe
                src="/resume.pdf"
                title="Resume"
                className="w-full h-full rounded-lg border"
                style={{ minHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner;
