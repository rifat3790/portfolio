import React, { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaGlobe,
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { ThemeContext } from "../../context/themeContext";

const FooterThreeShape = ({ themeColor }) => {
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
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 6);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    const keyLight = new THREE.PointLight(themeColor, 0.7);
    keyLight.position.set(2.4, 2, 5);
    const fillLight = new THREE.PointLight(0x8b5cf6, 0.35);
    fillLight.position.set(-2, 0.8, -3);
    scene.add(ambientLight, keyLight, fillLight);

    const group = new THREE.Group();

    const knotGeometry = new THREE.TorusKnotGeometry(0.65, 0.12, 120, 18, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(themeColor),
      emissive: new THREE.Color(themeColor).multiplyScalar(0.2),
      metalness: 0.7,
      roughness: 0.18,
      clearcoat: 0.6,
      transparent: true,
      opacity: 0.88,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    group.add(knot);

    const ringGeometry = new THREE.TorusGeometry(1.25, 0.02, 32, 120);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const particles = new THREE.BufferGeometry();
    const particleCount = 160;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 1.8 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.45;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });
    const particleSystem = new THREE.Points(particles, particleMaterial);
    group.add(particleSystem);

    scene.add(group);

    let frameId = null;
    const animate = () => {
      group.rotation.y += 0.005;
      group.rotation.x += 0.002;
      ring.rotation.z += 0.004;
      particleSystem.rotation.y -= 0.0012;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

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
      if (frameId) cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [themeColor]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <footer
      className={`relative overflow-hidden py-10 md:py-20 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 to-slate-900 text-white"
          : "bg-gradient-to-br from-white to-slate-100 text-slate-950"
      }`}
    >
      <FooterThreeShape themeColor={isDarkMode ? 0x82dfff : 0x3b82f6} />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-950/20 to-transparent pointer-events-none" />
      <div className="relative container mx-auto px-6 max-w-screen-xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10 section-fade">
          {/* Column 1: Brand & Introduction */}
          <div className="max-w-xs">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 section-fade">
              MD. REFAYET HOSSEN
            </h2>
            <p className="text-sm text-slate-400 mb-4">Full Stack Developer</p>
            <p className="text-xs text-white/70 mb-6">
              Passionate about creating modern web applications that deliver
              exceptional user experiences. Specializing in React, Next.js, and
              Node.js development.
            </p>
            <p className="text-xs text-white/70 mb-2">📍 Dhaka, Bangladesh</p>
            <p className="text-xs text-white/70 mb-2">
              🟢 Available for projects
            </p>
            <p className="text-xs text-white/70">⚡ Responds within 4 hours</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 underline underline-offset-4">
              Quick Links
            </h3>
            <ul>
              {[
                "Home",
                "About Me",
                "Skills",
                "Projects",
                "Experience",
                "Testimonials",
                "Contact",
                "Blog",
              ].map((link) => (
                <li key={link} className="mb-2">
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-white/80 hover:text-primary transition-all flex items-center gap-2"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Services & Tech Stack
            </h3>
            <ul className="space-y-2">
              {[
                "🌐 Web Development",
                "⚛️ React Applications",
                "🚀 Next.js Projects",
                "🔧 API Development",
                "💾 Database Design",
                "🎨 UI/UX Implementation",
                "📱 Responsive Design",
                "⚡ Performance Optimization",
              ].map((service) => (
                <li key={service} className="text-sm text-white/80">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              {/* Email */}
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <a
                  href="mailto:mdrifayethossen@gmail.com"
                  className="text-white/80 hover:text-primary transition-all"
                >
                  mdrifayethossen@gmail.com
                </a>
              </li>
              {/* Phone */}
              <li className="flex items-center gap-2">
                <FaPhone className="text-green-500" />
                <a
                  href="tel:+8801952321390"
                  className="text-white/80 hover:text-primary transition-all"
                >
                  +880 1952-321390
                </a>
              </li>
              {/* Location */}
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span className="text-white/80">Dhaka, Bangladesh</span>
              </li>
              {/* Social Media */}
              <li>
                <div className="flex space-x-4">
                  {[FaLinkedin, FaGithub, FaTwitter, FaInstagram].map(
                    (Icon, index) => (
                      <a
                        key={index}
                        href="#"
                        target="_blank"
                        className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:text-primary hover:bg-white/20 transition-all"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ),
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Secondary Links Bar */}
        <div className="border-t-2 border-white/10 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white/60 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary">
                Sitemap
              </a>
              <a href="#" className="hover:text-primary">
                RSS Feed
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">
                Download Resume
              </a>
              <a href="#" className="hover:text-primary">
                View Portfolio
              </a>
              <a href="#" className="hover:text-primary">
                Schedule Call
              </a>
              <a href="#" className="hover:text-primary">
                Send Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
