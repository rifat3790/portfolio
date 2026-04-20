import React, { useContext, useRef, useEffect } from "react";
import * as THREE from "three";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaCalendarAlt,
  FaReact,
  FaServer,
  FaDatabase,
  FaPalette,
  FaCode,
  FaRocket,
  FaUserTie,
  FaHeart,
} from "react-icons/fa";
import { ThemeContext } from "../../context/themeContext";

const About = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const shapeRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x0a0a1a : 0xf8fafc, 0.008);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    // Create a custom "G" shape using a torus knot and an extruded ring
    const group = new THREE.Group();

    // Main glowing torus knot (abstract G-like)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.28, 200, 32, 3, 4);
    const material = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x3b82f6 : 0x2563eb,
      emissive: isDarkMode ? 0x1e3a8a : 0x60a5fa,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.8,
      flatShading: false,
    });
    const knot = new THREE.Mesh(geometry, material);
    group.add(knot);

    // Add a wireframe sphere around it
    const wireframeGeo = new THREE.SphereGeometry(1.8, 24, 18);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x8b5cf6 : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sphereWire = new THREE.Mesh(wireframeGeo, wireframeMat);
    group.add(sphereWire);

    // Particle system around the shape
    const particleCount = 800;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a torus shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: isDarkMode ? 0x60a5fa : 0x3b82f6,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    group.add(particles);
    particlesRef.current = particles;

    // Additional floating tiny spheres
    const smallSpheresGroup = new THREE.Group();
    const sphereCount = 60;
    for (let i = 0; i < sphereCount; i++) {
      const sphereGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: isDarkMode ? 0xa78bfa : 0x8b5cf6,
        emissive: isDarkMode ? 0x4c1d95 : 0xc084fc,
        emissiveIntensity: 0.4,
      });
      const smallSphere = new THREE.Mesh(sphereGeo, sphereMat);
      const radius = 2.0 + Math.random() * 0.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2.5;
      smallSphere.position.x = Math.cos(angle) * radius;
      smallSphere.position.z = Math.sin(angle) * radius;
      smallSphere.position.y = height;
      smallSpheresGroup.add(smallSphere);
    }
    group.add(smallSpheresGroup);

    // Add a subtle ring around
    const ringGeo = new THREE.TorusGeometry(1.6, 0.05, 64, 200);
    const ringMat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x38bdf8 : 0x0ea5e9,
      emissive: isDarkMode ? 0x0284c7 : 0x38bdf8,
      emissiveIntensity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    scene.add(group);
    shapeRef.current = group;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(2, 3, 4);
    scene.add(mainLight);
    const backLight = new THREE.PointLight(0x3b82f6, 0.5);
    backLight.position.set(-2, 1, -3);
    scene.add(backLight);
    const fillLight = new THREE.PointLight(0xa78bfa, 0.4);
    fillLight.position.set(1, 2, 2);
    scene.add(fillLight);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.008;
      if (shapeRef.current) {
        shapeRef.current.rotation.y = time * 0.6;
        shapeRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
        shapeRef.current.rotation.z = Math.cos(time * 0.3) * 0.05;
      }
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.1;
        particlesRef.current.rotation.x = time * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isDarkMode]);

  return (
    <section
      id="about"
      className={`relative py-20 flex items-center justify-center overflow-hidden transition-colors duration-700 ${
        isDarkMode
          ? "bg-[#0a0a1a] text-white"
          : "bg-gradient-to-br from-slate-50 to-gray-100 text-slate-800"
      }`}
    >
      {/* Three.js Canvas Background */}
      <div
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Animated gradient orbs for extra depth */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-6 max-w-screen-xl relative z-10">
        {/* Section header with premium fade-up animation */}
        <div className="text-center mb-14 animate-fade-up">
          <span
            className={`text-sm font-semibold tracking-wider uppercase ${
              isDarkMode ? "text-blue-400" : "text-indigo-600"
            }`}
          >
            Get to know me
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold mt-2 ${
              isDarkMode ? "text-white" : "text-slate-800"
            }`}
          >
            About <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT CARD */}
          <div className="flex-1 animate-fade-left">
            <div
              className={`rounded-2xl p-8 h-full backdrop-blur-sm transition-all duration-500 hover:shadow-2xl ${
                isDarkMode
                  ? "bg-white/5 border border-white/10 shadow-xl"
                  : "bg-white/70 border border-white/50 shadow-lg"
              }`}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg animate-pulse-glow">
                  <FaUserTie className="text-3xl text-white" />
                </div>
              </div>

              <p
                className={`text-center text-lg font-medium ${
                  isDarkMode ? "text-blue-200" : "text-indigo-700"
                } mb-6`}
              >
                I'm a passionate developer with{" "}
                <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  2+ years
                </span>{" "}
                of experience creating digital solutions that make a difference.
              </p>

              <div className="space-y-5 text-base leading-relaxed">
                <div className="flex gap-3 group">
                  <FaCode
                    className={`mt-1 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isDarkMode ? "text-blue-400" : "text-indigo-600"
                    }`}
                  />
                  <p>
                    Passionate and detail-focused Full Stack Developer with experience in developing responsive
                    and interactive web applications using{" "}
                    <span className="font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      HTML, CSS, JavaScript, React, Next.js, Node.js
                    </span>
                    .
                  </p>
                </div>
                <div className="flex gap-3 group">
                  <FaRocket
                    className={`mt-1 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isDarkMode ? "text-purple-400" : "text-purple-600"
                    }`}
                  />
                  <p>
                    Skilled in designing modern UI with{" "}
                    <span className="font-semibold bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
                      Tailwind CSS
                    </span>{" "}
                    and DaisyUI, managing databases using{" "}
                    <span className="font-semibold text-cyan-500">MySQL</span>, and implementing secure authentication
                    systems with <span className="font-semibold text-blue-500">bcrypt</span>.
                  </p>
                </div>
                <div className="flex gap-3 group">
                  <FaHeart
                    className={`mt-1 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isDarkMode ? "text-rose-400" : "text-rose-600"
                    }`}
                  />
                  <p>
                    Quick to learn new technologies and committed to continuous skill development. Currently pursuing{" "}
                    <span className="font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                      B.Sc. in Computer Science
                    </span>{" "}
                    at Green University of Bangladesh with a CGPA of{" "}
                    <span className="font-semibold text-amber-500">3.75</span>.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mt-8 pt-6 border-t border-dashed border-gray-300 dark:border-gray-700">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 backdrop-blur-sm">
                  <FaMapMarkerAlt />
                  <span className="text-sm font-medium">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 backdrop-blur-sm">
                  <FaCalendarAlt />
                  <span className="text-sm font-medium">Available for new opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT STACKED CARDS */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="animate-fade-right">
              <div
                className={`rounded-2xl p-8 transition-all duration-500 hover:scale-[1.01] ${
                  isDarkMode
                    ? "bg-white/5 border border-white/10 shadow-xl"
                    : "bg-white/70 border border-white/50 shadow-lg"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { icon: <FaBriefcase />, label: "Experience", value: "2+ Years", color: "blue" },
                    { icon: <FaGraduationCap />, label: "Education", value: "CS Graduate", color: "purple" },
                    { icon: <FaGlobe />, label: "Languages", value: "Bengali, English", color: "cyan" },
                    { icon: <FaCalendarAlt />, label: "Availability", value: "Open to work", color: "emerald" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-500 group-hover:scale-110 transition-transform`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {item.label}
                        </p>
                        <p className="font-semibold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-fade-right animation-delay-200">
              <div
                className={`rounded-2xl p-8 transition-all duration-500 hover:scale-[1.01] ${
                  isDarkMode
                    ? "bg-white/5 border border-white/10 shadow-xl"
                    : "bg-white/70 border border-white/50 shadow-lg"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                  Core Competencies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <FaReact />, label: "Frontend Development", gradient: "from-blue-500 to-indigo-500" },
                    { icon: <FaServer />, label: "Backend Development", gradient: "from-purple-500 to-pink-500" },
                    { icon: <FaDatabase />, label: "Database Design", gradient: "from-cyan-500 to-blue-500" },
                    { icon: <FaPalette />, label: "UI/UX Design", gradient: "from-rose-500 to-orange-500" },
                  ].map((skill, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${skill.gradient} text-white font-semibold shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group cursor-default`}
                    >
                      <span className="text-xl group-hover:rotate-6 transition-transform duration-300">
                        {skill.icon}
                      </span>
                      <span className="text-sm md:text-base tracking-wide">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 12s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
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
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-left {
          animation: fadeLeft 0.8s ease-out forwards;
        }
        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-right {
          animation: fadeRight 0.8s ease-out forwards;
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59,130,246,0.4);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(59,130,246,0);
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default About;