import React, { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ThemeContext } from "../../context/themeContext";
import { FaCalendarAlt, FaTag, FaArrowRight } from "react-icons/fa";

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

// ========== 3D Background (floating particles + rotating cubes) ==========
const ThreeBlogBackground = ({ isDarkMode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initThree = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      scene.background = null;
      scene.fog = new THREE.FogExp2(isDarkMode ? 0x020617 : 0xf0f4fa, 0.004);

      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
      camera.position.set(0, 0.5, 12);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Lighting
      const ambient = new THREE.AmbientLight(0x404060, 0.6);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(2, 3, 4);
      const backLight = new THREE.PointLight(0x3b82f6, 0.5);
      backLight.position.set(-2, 1, -4);
      const fillLight = new THREE.PointLight(0x8b5cf6, 0.4);
      fillLight.position.set(1, 2, 3);
      scene.add(ambient, dirLight, backLight, fillLight);

      const group = new THREE.Group();

      // Floating particles (dust)
      const particleCount = 2000;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const radius = 2.5 + Math.random() * 3.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
        positions[i * 3 + 2] = radius * Math.cos(phi);
        const r = 0.3 + Math.random() * 0.5;
        const g = 0.4 + Math.random() * 0.5;
        const b = 0.8 + Math.random() * 0.2;
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
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      group.add(particles);

      // Small rotating cubes (floating)
      const cubeCount = 120;
      const cubes = [];
      for (let i = 0; i < cubeCount; i++) {
        const size = 0.07 + Math.random() * 0.05;
        const cubeGeo = new THREE.BoxGeometry(size, size, size);
        const cubeMat = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          emissive: 0x1e3a8a,
          emissiveIntensity: 0.3,
        });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        const rad = 3.0 + Math.random() * 2.0;
        const ang1 = Math.random() * Math.PI * 2;
        const ang2 = Math.random() * Math.PI * 2;
        cube.position.x = Math.cos(ang1) * rad;
        cube.position.z = Math.sin(ang1) * rad;
        cube.position.y = Math.sin(ang2) * rad * 0.8;
        cubes.push(cube);
        group.add(cube);
      }

      scene.add(group);

      let time = 0;
      let animId;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        time += 0.005;
        group.rotation.y = time * 0.05;
        group.rotation.x = Math.sin(time * 0.1) * 0.03;
        particles.rotation.y = time * 0.03;
        particles.rotation.x = time * 0.02;
        cubes.forEach((cube, idx) => {
          cube.rotation.x = time * (0.2 + idx * 0.001);
          cube.rotation.y = time * (0.3 + idx * 0.001);
        });
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
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    const cleanupPromise = initThree();
    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

// ========== Main Blog Component ==========
const Blog = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            setVisibleCards((prev) => [...prev, parseInt(index)]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    cardsRef.current.forEach((card, idx) => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blog"
      className={`relative py-24 min-h-screen overflow-hidden transition-colors duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white"
          : "bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900"
      }`}
    >
      {/* 3D Background */}
      <ThreeBlogBackground isDarkMode={isDarkMode} />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-block mb-2">
            <span
              className={`text-sm font-mono tracking-wider px-4 py-1.5 rounded-full backdrop-blur-sm ${
                isDarkMode
                  ? "text-blue-300 bg-blue-500/10 border border-blue-500/30"
                  : "text-indigo-600 bg-indigo-500/10 border border-indigo-300"
              }`}
            >
              ✦ Insights & Premium Notes ✦
            </span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-extrabold mt-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg animate-gradient`}
          >
            From the Blog
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto mt-4 ${
              isDarkMode ? "text-blue-200" : "text-slate-600"
            }`}
          >
            Short, sharp articles on design, development, and growth strategy
            for premium brands.
          </p>
        </div>

        {/* Premium Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div
              key={post.slug}
              ref={(el) => (cardsRef.current[idx] = el)}
              data-index={idx}
              className={`transition-all duration-700 ${
                visibleCards.includes(idx)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div
                className={`group rounded-2xl p-6 backdrop-blur-md border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col ${
                  isDarkMode
                    ? "bg-white/10 border-white/20 hover:border-blue-500/50 hover:shadow-blue-500/20"
                    : "bg-white/70 border-slate-200/50 hover:border-indigo-300/50 hover:shadow-indigo-200/50"
                }`}
              >
                {/* Category + Date */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                      isDarkMode
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-indigo-500/10 text-indigo-700"
                    }`}
                  >
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <FaCalendarAlt />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-xl md:text-2xl font-bold mb-3 transition-colors ${
                    isDarkMode ? "text-white group-hover:text-blue-300" : "text-slate-800 group-hover:text-indigo-600"
                  }`}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                        isDarkMode
                          ? "bg-white/10 text-slate-300"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <FaTag className="text-[10px]" /> {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <div className="mt-auto">
                  <a
                    href={post.link}
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3 ${
                      isDarkMode
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-indigo-600 hover:text-indigo-500"
                    }`}
                  >
                    Read Article
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Blog;