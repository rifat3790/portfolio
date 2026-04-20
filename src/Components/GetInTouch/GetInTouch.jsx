import React, { useContext, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { ThemeContext } from "../../context/themeContext";

// ========== 3D Background with Extra Floating Elements ==========
const ThreeContactBackground = ({ isDarkMode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initThree = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      scene.background = null;
      scene.fog = new THREE.FogExp2(isDarkMode ? 0x020617 : 0xf0f4fa, 0.003);

      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
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
      const backLight = new THREE.PointLight(0x3b82f6, 0.6);
      backLight.position.set(-2, 1, -4);
      const fillLight = new THREE.PointLight(0x8b5cf6, 0.4);
      fillLight.position.set(1, 2, 3);
      scene.add(ambient, dirLight, backLight, fillLight);

      // Main group
      const group = new THREE.Group();

      // 1. Floating Torus Knot (main)
      const knotGeo1 = new THREE.TorusKnotGeometry(1.0, 0.12, 180, 24, 3, 4);
      const knotMat1 = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.4,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
      });
      const knot1 = new THREE.Mesh(knotGeo1, knotMat1);
      group.add(knot1);

      // 2. Smaller Torus Knot (rotating opposite)
      const knotGeo2 = new THREE.TorusKnotGeometry(0.7, 0.08, 140, 20, 2, 3);
      const knotMat2 = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.3,
        metalness: 0.7,
        roughness: 0.3,
      });
      const knot2 = new THREE.Mesh(knotGeo2, knotMat2);
      knot2.position.set(1.2, 0.8, 0.5);
      group.add(knot2);

      // 3. Glowing ring
      const ringGeo = new THREE.TorusGeometry(1.5, 0.04, 64, 300);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0891b2,
        emissiveIntensity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // 4. Large particle cloud (center)
      const particleCount = 3000;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const radius = 2.0 + Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
        positions[i * 3 + 2] = radius * Math.cos(phi);
        const r = 0.2 + Math.random() * 0.4;
        const g = 0.3 + Math.random() * 0.4;
        const b = 0.7 + Math.random() * 0.3;
        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      group.add(particles);

      // 5. Extra floating spheres around the edges (new!)
      const edgeSphereCount = 200;
      const edgeSpheres = new THREE.Group();
      for (let i = 0; i < edgeSphereCount; i++) {
        const sphereGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          emissive: 0x1e3a8a,
          emissiveIntensity: 0.3,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        // Distribute in a larger radius (3.0 to 5.0)
        const radius = 3.2 + Math.random() * 2.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        sphere.position.x = radius * Math.sin(phi) * Math.cos(theta);
        sphere.position.y = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
        sphere.position.z = radius * Math.cos(phi);
        edgeSpheres.add(sphere);
      }
      group.add(edgeSpheres);

      // 6. Floating rings around the edges (decorative)
      const edgeRingCount = 8;
      for (let i = 0; i < edgeRingCount; i++) {
        const ringGeoEdge = new THREE.TorusGeometry(0.25, 0.02, 16, 60);
        const ringMatEdge = new THREE.MeshStandardMaterial({
          color: 0x8b5cf6,
          emissive: 0x6d28d9,
          emissiveIntensity: 0.4,
        });
        const ringEdge = new THREE.Mesh(ringGeoEdge, ringMatEdge);
        const angle = (i / edgeRingCount) * Math.PI * 2;
        const rad = 3.5;
        ringEdge.position.x = Math.cos(angle) * rad;
        ringEdge.position.z = Math.sin(angle) * rad;
        ringEdge.position.y = Math.sin(angle * 2) * 1.2;
        edgeSpheres.add(ringEdge);
      }

      scene.add(group);

      // Mouse interaction
      let mouseX = 0,
        mouseY = 0;
      let targetRotX = 0,
        targetRotY = 0;
      const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        targetRotY = mouseX * 0.2;
        targetRotX = mouseY * 0.15;
      };
      window.addEventListener("mousemove", handleMouseMove);

      let time = 0;
      let animId;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        time += 0.006;

        group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

        knot1.rotation.x = time * 0.4;
        knot1.rotation.y = time * 0.3;
        knot2.rotation.x = time * 0.5;
        knot2.rotation.z = time * 0.4;
        ring.rotation.z = time * 0.2;
        particles.rotation.y = time * 0.05;
        particles.rotation.x = time * 0.03;
        edgeSpheres.rotation.y = time * 0.08;
        edgeSpheres.rotation.x = Math.sin(time * 0.2) * 0.1;

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
      style={{ opacity: 0.5 }}
    />
  );
};

// ========== Main Component ==========
const GetInTouch = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectDetails: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    emailjs.init("yTsHqIyHJjmEwxbSO");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is not valid";
    if (!formData.projectDetails || formData.projectDetails.length < 20)
      errors.projectDetails =
        "Project details should be at least 20 characters";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setFormStatus("Submitting...");
      setFormErrors({});

      try {
        const templateParams = {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone_number: formData.phone || "Not provided",
          message: formData.projectDetails,
        };

        const response = await emailjs.send(
          "service_qd7wyne",
          "template_x9vn5jf",
          templateParams
        );

        if (response.status === 200) {
          setFormStatus(
            "✓ Message sent successfully! I'll get back to you soon."
          );
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            projectDetails: "",
          });
          setFormErrors({});

          setTimeout(() => setFormStatus(""), 5000);
        }
      } catch (error) {
        console.error("EmailJS error:", error);
        setFormStatus(
          "⚠ Failed to send. Please email directly: mdrifayethossen@gmail.com"
        );
        setTimeout(() => setFormStatus(""), 5000);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <section
      id="contact"
      className={`relative py-20 min-h-screen overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white"
          : "bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900"
      }`}
    >
      <ThreeContactBackground isDarkMode={isDarkMode} />
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-block mb-2">
            <span
              className={`text-sm font-mono tracking-wider px-4 py-1.5 rounded-full backdrop-blur-sm ${
                isDarkMode
                  ? "text-blue-300 bg-blue-500/10 border border-blue-500/30"
                  : "text-indigo-600 bg-indigo-500/10 border border-indigo-300"
              }`}
            >
              ✦ Contact Me ✦
            </span>
          </div>
          <h2
            className={`text-3xl md:text-5xl font-extrabold mt-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg animate-gradient`}
          >
            Get In Touch
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto mt-3 ${
              isDarkMode ? "text-blue-200" : "text-slate-600"
            }`}
          >
            I'm always interested in new opportunities and exciting projects.
            Let's connect!
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <div
            className={`rounded-2xl p-8 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
              isDarkMode
                ? "bg-white/10 border border-white/20 shadow-2xl"
                : "bg-white/70 border border-slate-200/50 shadow-xl"
            } animate-fadeInLeft`}
          >
            <div className="flex flex-col h-full">
              <h3
                className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Let's work together
              </h3>
              <p
                className={`text-base mb-6 ${
                  isDarkMode ? "text-blue-200" : "text-slate-600"
                }`}
              >
                Whether you have a project in mind, want to collaborate, or just
                want to say hello, I'd love to hear from you.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-blue-400">Email</p>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      mdrifayethossen@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-blue-400">Phone</p>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      01952321390
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-blue-400">Location</p>
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      Dhaka, Mohakhali, Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <p className={`text-sm mb-3 ${isDarkMode ? "text-blue-200" : "text-slate-600"}`}>
                  Connect with me on social
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/rifat3790"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                      isDarkMode
                        ? "bg-white/10 text-blue-300 hover:bg-blue-600 hover:text-white"
                        : "bg-slate-200 text-slate-700 hover:bg-indigo-600 hover:text-white"
                    }`}
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/md-refayet-hossen-62b796236"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                      isDarkMode
                        ? "bg-white/10 text-blue-300 hover:bg-blue-600 hover:text-white"
                        : "bg-slate-200 text-slate-700 hover:bg-indigo-600 hover:text-white"
                    }`}
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a
                    href="mailto:mdrifayethossen@gmail.com"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                      isDarkMode
                        ? "bg-white/10 text-blue-300 hover:bg-blue-600 hover:text-white"
                        : "bg-slate-200 text-slate-700 hover:bg-indigo-600 hover:text-white"
                    }`}
                  >
                    <FaEnvelope /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            className={`rounded-2xl p-8 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
              isDarkMode
                ? "bg-white/10 border border-white/20 shadow-2xl"
                : "bg-white/70 border border-slate-200/50 shadow-xl"
            } animate-fadeInRight`}
          >
            <h3
              className={`text-2xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Send me a message
            </h3>
            <p
              className={`text-sm mb-6 ${
                isDarkMode ? "text-blue-200" : "text-slate-600"
              }`}
            >
              I'll get back to you within 24-48 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-700"}`}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full mt-1 p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode
                        ? "bg-white/10 text-white placeholder-blue-300 border border-white/20"
                        : "bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-300"
                    }`}
                    placeholder="Rifat"
                  />
                  {formErrors.firstName && (
                    <p className="text-red-400 text-xs mt-1">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-700"}`}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full mt-1 p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode
                        ? "bg-white/10 text-white placeholder-blue-300 border border-white/20"
                        : "bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-300"
                    }`}
                    placeholder="Hossen"
                  />
                  {formErrors.lastName && (
                    <p className="text-red-400 text-xs mt-1">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-700"}`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full mt-1 p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-white/10 text-white placeholder-blue-300 border border-white/20"
                      : "bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-300"
                  }`}
                  placeholder="rifat@example.com"
                />
                {formErrors.email && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-700"}`}>
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full mt-1 p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-white/10 text-white placeholder-blue-300 border border-white/20"
                      : "bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-300"
                  }`}
                  placeholder="+880 1952 321390"
                />
              </div>

              <div>
                <label className={`text-sm ${isDarkMode ? "text-blue-200" : "text-slate-700"}`}>
                  Message *
                </label>
                <textarea
                  name="projectDetails"
                  rows="5"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full mt-1 p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    isDarkMode
                      ? "bg-white/10 text-white placeholder-blue-300 border border-white/20"
                      : "bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-300"
                  }`}
                  placeholder="Hi Rifat, I have a project idea about..."
                />
                {formErrors.projectDetails && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.projectDetails}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg transition-all hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FaPaperPlane />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {formStatus && (
                <p
                  className={`text-center text-sm font-medium mt-4 ${
                    formStatus.includes("successfully")
                      ? "text-green-400"
                      : "text-orange-400"
                  }`}
                >
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.2,0.9,0.4,1.1) forwards; }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s cubic-bezier(0.2,0.9,0.4,1.1) forwards; }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInRight { animation: fadeInRight 0.8s cubic-bezier(0.2,0.9,0.4,1.1) forwards; }
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

export default GetInTouch;