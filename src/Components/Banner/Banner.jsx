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
  FaDownload,
  FaShareAlt,
  FaEnvelope,
} from "react-icons/fa";
import { ThemeContext, COLOR_SCHEMES } from "../../context/themeContext";
import "../../../public/resume.pdf";

const TITLES = [
  "Full Stack Developer",
  "React & Next.js Specialist",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

const STATS = [
  { label: "Years Experience", value: "2+", icon: "⚡" },
  { label: "Projects Done", value: "100+", icon: "🚀" },
  { label: "Technologies", value: "31+", icon: "💡" },
];

// ========== Enhanced Matrix Rain (with color and smoother effect) ==========
const MatrixRain = ({ primaryColor }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-<>?";
    const drops = Array(columns).fill(1);

    let animationId;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Fira Code", monospace`;
      ctx.fillStyle = primaryColor;
      ctx.shadowBlur = 0;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [primaryColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-30"
      aria-hidden="true"
    />
  );
};

// ========== Premium 3D G-Shape with Particles ==========
const ThreeGShape = ({ color, isDarkMode }) => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060, 0.8);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(3, 4, 5);
    const backLight = new THREE.PointLight(color, 0.6);
    backLight.position.set(-2, 1, -3);
    const fillLight = new THREE.PointLight(0x8866ff, 0.4);
    fillLight.position.set(1, 2, 2);
    scene.add(ambientLight, mainLight, backLight, fillLight);

    // Helper to create a "G" shape using extruded geometry or group
    const group = new THREE.Group();

    // Main torus knot (abstract G)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.22, 200, 32, 3, 4);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color).multiplyScalar(0.3),
      metalness: 0.85,
      roughness: 0.2,
      transparent: true,
      opacity: 0.95,
    });
    const knot = new THREE.Mesh(geometry, material);
    group.add(knot);

    // Wireframe sphere for depth
    const sphereWireGeo = new THREE.SphereGeometry(1.8, 24, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireSphere = new THREE.Mesh(sphereWireGeo, wireMat);
    group.add(wireSphere);

    // Floating particles around
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const radius = 2.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Small orbiting spheres
    const orbCount = 80;
    const orbGroup = new THREE.Group();
    for (let i = 0; i < orbCount; i++) {
      const orbGeo = new THREE.SphereGeometry(0.045, 6, 6);
      const orbMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color).multiplyScalar(0.5),
      });
      const sphere = new THREE.Mesh(orbGeo, orbMat);
      const rad = 2.0 + Math.random() * 0.6;
      const ang = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2.4;
      sphere.position.x = Math.cos(ang) * rad;
      sphere.position.z = Math.sin(ang) * rad;
      sphere.position.y = height;
      orbGroup.add(sphere);
    }
    group.add(orbGroup);

    // Glowing ring
    const ringGeo = new THREE.TorusGeometry(1.55, 0.045, 64, 300);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color).multiplyScalar(0.7),
      emissiveIntensity: 0.5,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    scene.add(group);

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.3;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.008;

      // Smooth follow mouse
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;
      group.rotation.z = Math.sin(time * 0.5) * 0.05;

      particles.rotation.y = time * 0.1;
      particles.rotation.x = time * 0.07;
      orbGroup.rotation.y = time * 0.08;
      orbGroup.rotation.x = time * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [color, isDarkMode]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};

// ========== Animated Counter for Stats ==========
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const target = parseInt(value) || 0;

  useEffect(() => {
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// ========== Main Banner Component ==========
const Banner = () => {
  const { colorIdx, isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const primaryColor = COLOR_SCHEMES[colorIdx].hsl;
  const gradientTW = COLOR_SCHEMES[colorIdx].tw;
  const [resumeModal, setResumeModal] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setShareMsg("Link copied!");
    setTimeout(() => setShareMsg(""), 1500);
  };

  const shareLinks = [
    { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, icon: <FaFacebookF /> },
    { name: "LinkedIn", url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`, icon: <FaLinkedinIn /> },
    { name: "Twitter", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`, icon: <FaTwitter /> },
    { name: "Copy Link", url: "#", icon: <FaShareAlt />, onClick: handleCopy },
  ];

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white"
          : "bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 text-slate-800"
      }`}
    >
      {/* Background Effects */}
      <MatrixRain primaryColor={primaryColor} />
      <ThreeGShape color={COLOR_SCHEMES[colorIdx].start} isDarkMode={isDarkMode} />

      {/* Floating animated blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      {/* Theme Toggle Button */}
      <button
        className={`fixed bottom-6 right-6 z-30 rounded-full p-3 shadow-2xl backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
          isDarkMode
            ? "border-white/20 bg-black/50 text-white"
            : "border-slate-300 bg-white/70 text-slate-800"
        }`}
        onClick={() => setIsDarkMode((prev) => !prev)}
      >
        {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 py-20 flex flex-col items-center gap-8 text-center">
        {/* Profile Image with premium rings */}
        <div className="relative group">
          <div
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-spin-slow"
            style={{ width: "180px", height: "180px", left: "-10px", top: "-10px" }}
          />
          <div
            className="absolute rounded-full animate-spin-slow"
            style={{
              width: "170px",
              height: "170px",
              border: `2px solid ${primaryColor}`,
              top: "-5px",
              left: "-5px",
            }}
          />
          <img
            src={profile}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover relative z-10 border-4 border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Greeting */}
        <div className="space-y-2">
          <span className={`text-sm font-mono tracking-wider ${isDarkMode ? "text-blue-300" : "text-indigo-600"}`}>
            &lt; Hello World /&gt;
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            I'm{" "}
            <span className={`bg-gradient-to-r ${gradientTW} bg-clip-text text-transparent`}>
              MD. REFAYET HOSSEN
            </span>
          </h1>
        </div>

        {/* Typewriter */}
        <div className="text-xl md:text-2xl font-semibold text-blue-400 dark:text-blue-300 min-h-[3rem]">
          <Typewriter words={TITLES} loop={0} cursor cursorStyle="|" typeSpeed={70} deleteSpeed={50} delaySpeed={1400} />
        </div>

        <p className="text-gray-600 dark:text-gray-300 max-w-xl text-lg">
          Passionate Full Stack Developer crafting responsive, high-performance web applications with modern technologies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <a
            href="#contact"
            className={`px-6 py-3 rounded-full bg-gradient-to-r ${gradientTW} text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}
          >
            <FaEnvelope /> Get In Touch
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 rounded-full border-2 border-blue-500 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <FaDownload /> Resume
          </a>
          <button
            onClick={() => setResumeModal(true)}
            className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/30 transition-all"
          >
            Preview
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
          >
            <FaShareAlt /> Share
          </button>
        </div>

        {/* Stats Cards with Icons and Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={`group rounded-2xl p-6 backdrop-blur-md border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDarkMode
                  ? "bg-white/5 border-white/10 hover:border-blue-500/50"
                  : "bg-white/50 border-slate-200 hover:border-indigo-300"
              }`}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradientTW} bg-clip-text text-transparent`}>
                <AnimatedCounter value={stat.value} suffix={stat.value.includes("+") ? "+" : ""} />
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links Sidebar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-5">
        {[
          { href: "https://www.facebook.com/Rifayet221/", icon: <FaFacebookF />, color: "text-blue-600" },
          { href: "https://www.linkedin.com/in/md-refayet-hossen-62b796236/", icon: <FaLinkedinIn />, color: "text-blue-500" },
          { href: "https://twitter.com", icon: <FaTwitter />, color: "text-sky-500" },
          { href: "https://github.com/rifat3790", icon: <FaGithub />, color: "text-gray-800 dark:text-gray-300" },
        ].map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-2xl ${social.color} hover:scale-125 transition-transform duration-300 opacity-70 hover:opacity-100`}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setShowShare(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-center mb-4">Share this page</h3>
            <div className="flex flex-col gap-3">
              {shareLinks.map((item) =>
                item.onClick ? (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                  >
                    {item.icon} {item.name}
                  </button>
                ) : (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                  >
                    {item.icon} {item.name}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {resumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-4 max-w-3xl w-full mx-4 relative">
            <button
              className="absolute top-3 right-3 z-10 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
              onClick={() => setResumeModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-center mb-3">Resume Preview</h3>
            <iframe src="/resume.pdf" title="Resume" className="w-full h-[70vh] rounded-lg border" />
          </div>
        </div>
      )}

      {/* Toast message */}
      {shareMsg && (
        <div className="fixed bottom-24 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          {shareMsg}
        </div>
      )}

      {/* Additional Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 14s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </section>
  );
};

export default Banner;