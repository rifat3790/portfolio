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
  FaChevronDown,
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

// ========== Three.js Background (same as before but lower opacity) ==========
const AdvancedThreeBackground = ({ themeColor, isDarkMode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x020617 : 0xf0f4fa, 0.012);

    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.2, 7.5);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(2, 3, 4);
    const backLight = new THREE.PointLight(0x3b82f6, 0.7);
    backLight.position.set(-2, 1.5, -4);
    const fillLight = new THREE.PointLight(0x8b5cf6, 0.5);
    fillLight.position.set(1.5, 2, 3);
    const rimLight = new THREE.PointLight(0x06b6d4, 0.5);
    rimLight.position.set(1, 2, -3);
    scene.add(ambient, mainLight, backLight, fillLight, rimLight);

    const group = new THREE.Group();

    const knotGeo = new THREE.TorusKnotGeometry(1.25, 0.18, 240, 36, 3, 4);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(themeColor),
      emissive: new THREE.Color(themeColor).multiplyScalar(0.35),
      emissiveIntensity: 0.6,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.7,
      transparent: true,
      opacity: 0.92,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    const knotGeo2 = new THREE.TorusKnotGeometry(0.9, 0.12, 180, 28, 2, 3);
    const knotMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.45,
      metalness: 0.75,
      roughness: 0.28,
    });
    const knot2 = new THREE.Mesh(knotGeo2, knotMat2);
    knot2.position.set(1.4, 0.9, 0.8);
    group.add(knot2);

    const ringGeo = new THREE.TorusGeometry(1.8, 0.045, 80, 360);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.85,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const innerRingGeo = new THREE.TorusGeometry(1.3, 0.025, 64, 200);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: themeColor,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.6,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.rotation.z = 0.5;
    group.add(innerRing);

    const particleCount = 2800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = radius * Math.cos(phi);
      const mix = Math.random();
      const r = 0.2 + mix * 0.5;
      const g = 0.4 + mix * 0.5;
      const b = 0.8 + mix * 0.2;
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    const orbCount = 180;
    const orbGroup = new THREE.Group();
    for (let i = 0; i < orbCount; i++) {
      const sphereGeo = new THREE.SphereGeometry(0.055, 8, 8);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.3,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      const radius = 2.3 + Math.random() * 1.4;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2.5;
      sphere.position.x = Math.cos(angle) * radius;
      sphere.position.z = Math.sin(angle) * radius;
      sphere.position.y = height;
      orbGroup.add(sphere);
    }
    group.add(orbGroup);

    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    scene.add(group);

    let mouseX = 0, mouseY = 0;
    let targetRotY = 0, targetRotX = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = mouseX * 0.4;
      targetRotX = mouseY * 0.25;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.008;

      group.rotation.y += (targetRotY - group.rotation.y) * 0.06;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.06;

      knot.rotation.x = Math.sin(time * 0.35) * 0.12;
      knot.rotation.y += 0.004;
      knot2.rotation.x += 0.005;
      knot2.rotation.z += 0.004;
      ring.rotation.z += 0.0025;
      innerRing.rotation.z -= 0.003;
      particles.rotation.y += 0.0015;
      particles.rotation.x = Math.sin(time * 0.2) * 0.05;
      orbGroup.rotation.y += 0.002;
      orbGroup.rotation.x = Math.sin(time * 0.25) * 0.08;
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0003;

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
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [themeColor, isDarkMode]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60" />;
};

// ========== Animated Counter ==========
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value) || 0;

  useEffect(() => {
    const duration = 2000;
    const stepTime = 16;
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

  return <span>{count}{suffix}</span>;
};

// ========== Main Banner Component – Fixed Readability ==========
const Banner = () => {
  const { colorIdx, isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const primaryColor = COLOR_SCHEMES[colorIdx].hsl;
  const gradientTW = COLOR_SCHEMES[colorIdx].tw;
  const [resumeModal, setResumeModal] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [showShare, setShowShare] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

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
          : "bg-gradient-to-br from-slate-50 via-white to-indigo-50/70 text-slate-800"
      }`}
    >
      {/* 3D Background */}
      <AdvancedThreeBackground themeColor={COLOR_SCHEMES[colorIdx].start} isDarkMode={isDarkMode} />

      {/* Strong readability overlay – solid enough to make text pop */}
      <div className={`absolute inset-0 z-[1] pointer-events-none ${isDarkMode ? "bg-black/60" : "bg-white/30"}`} />

      {/* Floating animated blobs (keep for atmosphere) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000" />

      {/* Theme Toggle */}
      <button
        className={`fixed bottom-6 right-6 z-30 rounded-full p-3 shadow-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-110 hover:rotate-12 ${
          isDarkMode
            ? "border-white/20 bg-black/60 text-white hover:border-white/40"
            : "border-slate-300 bg-white/80 text-slate-800 hover:border-indigo-400"
        }`}
        onClick={() => setIsDarkMode(prev => !prev)}
      >
        {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <FaChevronDown className={`text-2xl ${isDarkMode ? "text-white/70" : "text-slate-600"}`} />
      </div>

      {/* Main Content – now with solid or semi‑solid backgrounds for readability */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 py-20 flex flex-col items-center gap-8 text-center">
        {/* Profile Image */}
        <div className="relative group">
          <div
            className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-60 group-hover:opacity-100 transition duration-700 animate-spin-slow"
            style={{ width: "200px", height: "200px", left: "-12px", top: "-12px" }}
          />
          <div
            className="absolute rounded-full animate-spin-slow"
            style={{
              width: "180px",
              height: "180px",
              border: `2px solid ${primaryColor}`,
              top: "-8px",
              left: "-8px",
              boxShadow: `0 0 20px ${primaryColor}`,
            }}
          />
          <div
            className="absolute rounded-full animate-pulse-glow"
            style={{
              width: "164px",
              height: "164px",
              background: `radial-gradient(circle, ${primaryColor}20, transparent)`,
              top: "0px",
              left: "0px",
            }}
          />
          <img
            src={profile}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover relative z-10 border-4 border-white/30 shadow-2xl transition-all duration-500 group-hover:scale-105"
          />
        </div>

        {/* Greeting – solid background */}
        <div className="space-y-3 animate-fade-up">
          <span className={`text-sm font-mono tracking-wider px-4 py-1 rounded-full backdrop-blur-sm ${
            isDarkMode
              ? "bg-black/70 text-blue-300 border border-blue-500/40"
              : "bg-white/80 text-indigo-600 border border-indigo-300"
          }`}>
            &lt; Hello World /&gt;
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
            I'm{" "}
            <span className={`bg-gradient-to-r ${gradientTW} bg-clip-text text-transparent animate-gradient-x`}>
              MD. REFAYET HOSSEN
            </span>
          </h1>
        </div>

        {/* Typewriter */}
        <div className="text-xl md:text-3xl font-semibold min-h-[4rem]">
          <span className={`${isDarkMode ? "text-cyan-300" : "text-indigo-600"} drop-shadow-md`}>
            <Typewriter words={TITLES} loop={0} cursor cursorStyle="▌" typeSpeed={70} deleteSpeed={50} delaySpeed={1400} />
          </span>
        </div>

        <p className={`max-w-xl text-base md:text-lg px-6 py-3 rounded-2xl shadow-lg ${
          isDarkMode
            ? "bg-black/70 text-gray-100 border border-white/20"
            : "bg-white/80 text-gray-800 border border-white/80"
        }`}>
          Passionate Full Stack Developer crafting responsive, high-performance web applications with modern technologies.
        </p>

        {/* CTA Buttons – solid backgrounds */}
        <div className="flex flex-wrap justify-center gap-5 mt-6">
          <a
            href="#contact"
            className={`group px-8 py-3 rounded-full bg-gradient-to-r ${gradientTW} text-white font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 relative overflow-hidden`}
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <FaEnvelope className="relative z-10" /> <span className="relative z-10">Get In Touch</span>
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 rounded-full border-2 border-blue-500 bg-white/80 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg"
          >
            <FaDownload /> Resume
          </a>
          <button
            onClick={() => setResumeModal(true)}
            className={`px-8 py-3 rounded-full backdrop-blur-md border font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              isDarkMode
                ? "bg-black/70 border-white/20 text-white hover:bg-white/20"
                : "bg-white/80 border-slate-300 text-slate-800 hover:bg-white/90"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setShowShare(true)}
            className={`px-8 py-3 rounded-full backdrop-blur-md border font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 ${
              isDarkMode
                ? "bg-black/70 border-white/20 text-white hover:bg-white/20"
                : "bg-white/80 border-slate-300 text-slate-800 hover:bg-white/90"
            }`}
          >
            <FaShareAlt /> Share
          </button>
        </div>

        {/* Stats Cards – solid backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-3xl">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`group rounded-2xl p-6 backdrop-blur-md border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-up ${
                isDarkMode
                  ? "bg-black/70 border-white/15 hover:border-blue-500/50"
                  : "bg-white/80 border-slate-200/70 hover:border-indigo-300"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className={`text-3xl md:text-5xl font-bold bg-gradient-to-r ${gradientTW} bg-clip-text text-transparent`}>
                <AnimatedCounter value={stat.value} suffix={stat.value.includes("+") ? "+" : ""} />
              </div>
              <div className="text-sm font-medium text-gray-300 dark:text-gray-400 mt-3 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Sidebar – solid backgrounds */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {[
          { href: "https://www.facebook.com/Rifayet221/", icon: <FaFacebookF />, color: "text-blue-600", bg: "bg-blue-500/30" },
          { href: "https://www.linkedin.com/in/md-refayet-hossen-62b796236/", icon: <FaLinkedinIn />, color: "text-blue-500", bg: "bg-blue-500/30" },
          { href: "https://twitter.com", icon: <FaTwitter />, color: "text-sky-500", bg: "bg-sky-500/30" },
          { href: "https://github.com/rifat3790", icon: <FaGithub />, color: "text-gray-800 dark:text-gray-300", bg: "bg-gray-500/30" },
        ].map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-125 hover:shadow-xl ${social.bg} ${
              isDarkMode ? "border-white/20 bg-black/60" : "border-slate-300 bg-white/80"
            }`}
          >
            <div className={`text-xl ${social.color}`}>{social.icon}</div>
          </a>
        ))}
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 relative transform animate-scale-up">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors text-xl" onClick={() => setShowShare(false)}>✕</button>
            <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Share this page</h3>
            <div className="flex flex-col gap-3">
              {shareLinks.map((item) =>
                item.onClick ? (
                  <button key={item.name} onClick={item.onClick} className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 font-medium">
                    {item.icon} {item.name}
                  </button>
                ) : (
                  <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 font-medium">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-4 max-w-3xl w-full mx-4 relative transform animate-scale-up">
            <button className="absolute top-3 right-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform" onClick={() => setResumeModal(false)}>✕</button>
            <h3 className="text-xl font-bold text-center mb-3">Resume Preview</h3>
            <iframe src="/resume.pdf" title="Resume" className="w-full h-[70vh] rounded-lg border" />
          </div>
        </div>
      )}

      {/* Toast Message */}
      {shareMsg && (
        <div className="fixed bottom-24 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-slide-up">
          {shareMsg}
        </div>
      )}

      {/* Animations (unchanged) */}
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
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards; opacity: 0; }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-up { animation: scaleUp 0.3s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        @keyframes gradient-x { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        @keyframes pulse-glow { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Banner;