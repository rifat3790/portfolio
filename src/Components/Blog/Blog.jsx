import React, { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { ThemeContext } from "../../context/themeContext";

const posts = [
  {
    slug: "premium-ui-patterns",
    category: "Design",
    title: "Premium UI Patterns for Modern Web Apps",
    date: "Apr 2026",
    excerpt:
      "Explore polished UI patterns, subtle motion, and refined layout choices that make product experiences feel premium and memorable.",
    tags: ["UI Design", "Motion", "Branding"],
    link: "#",
  },
  {
    slug: "building-trust-online",
    category: "Strategy",
    title: "Building Trust with High-End Web Experiences",
    date: "Apr 2026",
    excerpt:
      "Learn how to craft messaging, pacing, and visual hierarchy that converts visitors into clients with confidence.",
    tags: ["Conversion", "UX", "Content"],
    link: "#",
  },
  {
    slug: "next-level-performance",
    category: "Development",
    title: "Next-Level Performance for Client-Grade Portfolios",
    date: "Apr 2026",
    excerpt:
      "A modern approach to faster interactions, lightweight assets, and polished page transitions for premium portfolio sites.",
    tags: ["Performance", "React", "Optimization"],
    link: "#",
  },
  {
    slug: "brand-velocity",
    category: "Branding",
    title: "Brand Velocity: Designing for Momentum",
    date: "Apr 2026",
    excerpt:
      "How to create dynamic brand systems that feel fast, polished, and premium across every interaction.",
    tags: ["Branding", "Motion", "Narrative"],
    link: "#",
  },
  {
    slug: "clean-codecraft",
    category: "Engineering",
    title: "Clean Codecraft for High-End Frontends",
    date: "Apr 2026",
    excerpt:
      "A premium approach to component architecture, animation performance, and frontend craftsmanship.",
    tags: ["React", "Architecture", "Performance"],
    link: "#",
  },
  {
    slug: "white-mode-design",
    category: "UX",
    title: "White-Mode Design with Strong Contrast",
    date: "Apr 2026",
    excerpt:
      "Designing elegant white-mode interfaces that retain depth, clarity, and brand vibrancy.",
    tags: ["UI", "Contrast", "Accessibility"],
    link: "#",
  },
];

// ========== 3D Background (unchanged, but we add overlay for readability) ==========
const ThreeBlogBackground = ({ isDarkMode }) => {
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
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x020617 : 0xf0f4fa, 0.006);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 9);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
    mainLight.position.set(2, 3, 4);
    const backLight = new THREE.PointLight(0x3b82f6, 0.6);
    backLight.position.set(-2, 1, -5);
    const fillLight = new THREE.PointLight(0x8b5cf6, 0.4);
    fillLight.position.set(1.5, 2, 3);
    scene.add(ambient, mainLight, backLight, fillLight);

    const group = new THREE.Group();

    // Main Torus Knot (G‑like shape)
    const knotGeo = new THREE.TorusKnotGeometry(1.3, 0.2, 220, 36, 3, 4);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.4,
      metalness: 0.75,
      roughness: 0.22,
      clearcoat: 0.6,
      transparent: true,
      opacity: 0.92,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    // Secondary smaller knot (purple)
    const knotGeo2 = new THREE.TorusKnotGeometry(0.85, 0.13, 180, 28, 2, 3);
    const knotMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.35,
      metalness: 0.7,
      roughness: 0.28,
    });
    const knot2 = new THREE.Mesh(knotGeo2, knotMat2);
    knot2.position.set(1.4, 0.8, 0.7);
    group.add(knot2);

    // Floating ring
    const ringGeo = new THREE.TorusGeometry(1.7, 0.04, 80, 360);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.55,
      transparent: true,
      opacity: 0.75,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Particle cloud
    const particleCount = 2500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.1 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.65;
      positions[i * 3 + 2] = radius * Math.cos(phi);
      const r = 0.2 + Math.random() * 0.4;
      const g = 0.3 + Math.random() * 0.4;
      const b = 0.6 + Math.random() * 0.4;
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
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Orbiting tiny spheres
    const orbCount = 160;
    const orbGroup = new THREE.Group();
    for (let i = 0; i < orbCount; i++) {
      const sphereGeo = new THREE.SphereGeometry(0.05, 6, 6);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.25,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      const radius = 2.2 + Math.random() * 1.4;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2.4;
      sphere.position.x = Math.cos(angle) * radius;
      sphere.position.z = Math.sin(angle) * radius;
      sphere.position.y = height;
      orbGroup.add(sphere);
    }
    group.add(orbGroup);

    scene.add(group);

    let mouseX = 0,
      mouseY = 0;
    let targetRotY = 0,
      targetRotX = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = mouseX * 0.25;
      targetRotX = mouseY * 0.15;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.007;

      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

      knot.rotation.x = Math.sin(time * 0.25) * 0.1;
      knot.rotation.y += 0.003;
      knot2.rotation.x += 0.004;
      knot2.rotation.z += 0.003;
      ring.rotation.z += 0.002;
      particles.rotation.y += 0.001;
      orbGroup.rotation.y += 0.002;
      orbGroup.rotation.x = Math.sin(time * 0.2) * 0.05;

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
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDarkMode]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

// ========== Main Blog Component – Fixed Readability ==========
const Blog = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section
      id="blog"
      className={`relative py-24 min-h-screen transition-colors duration-700 overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white"
          : "bg-gradient-to-br from-slate-50 via-white to-indigo-50/70 text-slate-800"
      }`}
    >
      {/* 3D Background */}
      <ThreeBlogBackground isDarkMode={isDarkMode} />

      {/* Stronger overlay for readability – this makes text pop */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/50 z-[1] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block mb-3">
            <span
              className={`text-sm font-mono tracking-wider px-4 py-1.5 rounded-full backdrop-blur-md ${
                isDarkMode
                  ? "text-blue-300 bg-black/40 border border-blue-500/40"
                  : "text-indigo-700 bg-white/60 border border-indigo-300"
              }`}
            >
              ✦ Insights & Premium Notes ✦
            </span>
          </div>
          <h2
            className={`text-4xl md:text-6xl font-extrabold mt-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg animate-gradient-x`}
          >
            From the Blog
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto mt-4 backdrop-blur-md px-6 py-2 rounded-full inline-block font-medium ${
              isDarkMode
                ? "text-gray-100 bg-black/30"
                : "text-slate-800 bg-white/60"
            }`}
          >
            Short, sharp articles on design, development, and growth strategy
            for premium brands.
          </p>
        </div>

        {/* Featured Post – now with solid background for readability */}
        {posts[0] && (
          <div className="mb-20 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div
              className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-900/60 to-purple-900/60 backdrop-blur-md border border-white/20"
                  : "bg-gradient-to-r from-indigo-100/80 to-purple-100/80 backdrop-blur-sm border border-slate-200"
              }`}
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-300">
                    Featured
                  </span>
                  <span className="text-xs text-slate-300">{posts[0].date}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  {posts[0].title}
                </h3>
                <p className="text-base md:text-lg text-gray-200 mb-6 max-w-2xl">
                  {posts[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {posts[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-3 py-1 rounded-full ${
                        isDarkMode
                          ? "bg-white/20 text-gray-100"
                          : "bg-slate-200/80 text-slate-800"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={posts[0].link}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold transition-all hover:scale-105 hover:shadow-lg"
                >
                  Read Article →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Grid Cards – higher opacity backgrounds for readability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, idx) => (
            <article
              key={post.slug}
              className={`rounded-2xl backdrop-blur-md border transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                isDarkMode
                  ? "bg-black/40 border-white/20 hover:border-blue-500/50"
                  : "bg-white/80 border-slate-200/70 hover:border-indigo-300"
              } p-6 flex flex-col animate-fade-up`}
              style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs uppercase tracking-[0.25em] font-semibold ${
                    isDarkMode ? "text-cyan-300" : "text-indigo-700"
                  }`}
                >
                  {post.category}
                </span>
                <span className={`text-xs ${isDarkMode ? "text-gray-300" : "text-slate-500"}`}>
                  {post.date}
                </span>
              </div>
              <h3 className={`text-xl md:text-2xl font-bold mb-3 line-clamp-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {post.title}
              </h3>
              <p className={`text-sm md:text-base mb-4 line-clamp-3 ${isDarkMode ? "text-gray-200" : "text-slate-700"}`}>
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      isDarkMode
                        ? "bg-white/20 text-gray-100"
                        : "bg-slate-200/80 text-slate-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={post.link}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
              >
                Read Article →
              </a>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fade-up {
          animation: fadeUp 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
          opacity: 0;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Blog;