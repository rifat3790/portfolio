import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Skill from "../Skill/Skill";

// ========== 3D Background (same as before, but with adjusted fog) ==========
const SkillsThreeBackground = () => {
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
    // Slightly different fog color to match new background
    scene.fog = new THREE.FogExp2(0x0f172a, 0.008);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 8);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
    mainLight.position.set(2, 3, 4);
    const backLight = new THREE.PointLight(0x3b82f6, 0.6);
    backLight.position.set(-2, 1, -5);
    const fillLight = new THREE.PointLight(0x8b5cf6, 0.4);
    fillLight.position.set(1.5, 2, 3);
    scene.add(ambient, mainLight, backLight, fillLight);

    const group = new THREE.Group();

    const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.2, 200, 32, 3, 4);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.35,
      metalness: 0.7,
      roughness: 0.25,
      clearcoat: 0.6,
      transparent: true,
      opacity: 0.92,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    const knotGeo2 = new THREE.TorusKnotGeometry(0.8, 0.12, 160, 24, 2, 3);
    const knotMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.3,
      metalness: 0.65,
      roughness: 0.3,
    });
    const knot2 = new THREE.Mesh(knotGeo2, knotMat2);
    knot2.position.set(1.3, 0.7, 0.6);
    group.add(knot2);

    const ringGeo = new THREE.TorusGeometry(1.6, 0.035, 64, 300);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const particleCount = 1800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = radius * Math.cos(phi);
      const r = 0.2 + Math.random() * 0.3;
      const g = 0.3 + Math.random() * 0.4;
      const b = 0.7 + Math.random() * 0.3;
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    const orbCount = 120;
    const orbGroup = new THREE.Group();
    for (let i = 0; i < orbCount; i++) {
      const sphereGeo = new THREE.SphereGeometry(0.045, 6, 6);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.2,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      const radius = 2.1 + Math.random() * 1.2;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2.2;
      sphere.position.x = Math.cos(angle) * radius;
      sphere.position.z = Math.sin(angle) * radius;
      sphere.position.y = height;
      orbGroup.add(sphere);
    }
    group.add(orbGroup);

    scene.add(group);

    let mouseX = 0, mouseY = 0;
    let targetRotY = 0, targetRotX = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = mouseX * 0.3;
      targetRotX = mouseY * 0.2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.007;

      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

      knot.rotation.x = Math.sin(time * 0.3) * 0.1;
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
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

// ========== Main Skills Component – Distinct Background Color ==========
const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/skills.json")
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) {
    return (
      <div className="py-20 px-4 text-center text-white bg-gradient-to-br from-[#0f172a] to-[#1e1b4b]">
        Loading skills...
      </div>
    );
  }

  return (
    <section
      id="skills"
      // New distinct gradient – deeper indigo/purple tones, different from other sections
      className="relative bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#111827] overflow-hidden py-16 md:py-20 px-4 md:px-8 lg:px-16"
    >
      {/* Premium 3D Background */}
      <SkillsThreeBackground />

      {/* Readability overlay (slightly lighter than before to match new bg) */}
      <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center animate-fade-up">
          <p className="uppercase text-sm tracking-[0.4em] text-cyan-300 mb-3 animate-pulse-glow">
            Core Expertise
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg animate-gradient-x">
            Skills & Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-100 backdrop-blur-md bg-black/40 px-6 py-2 rounded-full inline-block">
            Explore my core skills in frontend, backend, programming languages,
            tools, and soft skills. All technologies are selected for modern,
            scalable web development.
          </p>
        </div>

        {/* Skills Grid – Cards with better contrast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl">
                <Skill skill={skill} />
              </div>
            </div>
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
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.7; text-shadow: 0 0 2px cyan; }
          50% { opacity: 1; text-shadow: 0 0 8px cyan; }
        }
        .animate-fade-up {
          animation: fadeUp 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
          opacity: 0;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 4s ease infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;