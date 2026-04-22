import React, { useState, useEffect, useRef } from "react";
import {
  FaEnvelope,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaComment,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

// ========== 3D Background for Popup ==========
const ThreePopupBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initThree = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      scene.background = null;
      scene.fog = new THREE.FogExp2(0x050510, 0.008);

      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
      camera.position.set(0, 0, 8);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Lighting
      const ambient = new THREE.AmbientLight(0x404060, 0.5);
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(2, 3, 4);
      const backLight = new THREE.PointLight(0x3b82f6, 0.5);
      backLight.position.set(-2, 1, -4);
      const fillLight = new THREE.PointLight(0x8b5cf6, 0.4);
      fillLight.position.set(1, 2, 3);
      scene.add(ambient, dirLight, backLight, fillLight);

      const group = new THREE.Group();

      // Main Torus Knot
      const knotGeo = new THREE.TorusKnotGeometry(1.0, 0.12, 200, 32, 3, 4);
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
      });
      const knot = new THREE.Mesh(knotGeo, knotMat);
      group.add(knot);

      // Secondary torus knot
      const knotGeo2 = new THREE.TorusKnotGeometry(0.7, 0.08, 160, 24, 2, 3);
      const knotMat2 = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.4,
        metalness: 0.7,
        roughness: 0.3,
      });
      const knot2 = new THREE.Mesh(knotGeo2, knotMat2);
      knot2.position.set(1.2, 0.8, 0.5);
      group.add(knot2);

      // Glowing ring
      const ringGeo = new THREE.TorusGeometry(1.5, 0.04, 64, 300);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0891b2,
        emissiveIntensity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Particle cloud
      const particleCount = 2000;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const radius = 2.2 + Math.random() * 2.0;
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
      particleGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      group.add(particles);

      // Floating small spheres
      const orbCount = 150;
      const orbGroup = new THREE.Group();
      for (let i = 0; i < orbCount; i++) {
        const sphereGeo = new THREE.SphereGeometry(0.05, 6, 6);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          emissive: 0x1e3a8a,
          emissiveIntensity: 0.3,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        const radius = 2.5 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        sphere.position.x = radius * Math.sin(phi) * Math.cos(theta);
        sphere.position.y = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
        sphere.position.z = radius * Math.cos(phi);
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
        targetRotY = mouseX * 0.3;
        targetRotX = mouseY * 0.2;
      };
      window.addEventListener("mousemove", handleMouseMove);

      let time = 0;
      let animId;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        time += 0.008;

        group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

        knot.rotation.x = time * 0.4;
        knot.rotation.y = time * 0.3;
        knot2.rotation.x = time * 0.5;
        knot2.rotation.z = time * 0.4;
        ring.rotation.z = time * 0.2;
        particles.rotation.y = time * 0.06;
        orbGroup.rotation.y = time * 0.1;

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
        if (container && renderer.domElement)
          container.removeChild(renderer.domElement);
      };
    };

    const cleanupPromise = initThree();
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60"
    />
  );
};

// ========== Custom Hook for Form Logic ==========
const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.message.trim() || formData.message.length < 10)
      errors.message = "Message must be at least 10 characters";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setFormStatus("Sending...");
      setFormErrors({});

      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        };
        const response = await emailjs.send(
          "YOUR_SERVICE_ID", // Replace with your service ID
          "YOUR_TEMPLATE_ID", // Replace with your template ID
          templateParams,
        );
        if (response.status === 200) {
          setFormStatus("✓ Message sent successfully! I'll reply soon.");
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setFormStatus(""), 4000);
        }
      } catch (error) {
        console.error(error);
        setFormStatus(
          "⚠ Failed to send. Please email directly: mdrifayethossen@gmail.com",
        );
        setTimeout(() => setFormStatus(""), 5000);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    formStatus,
    handleChange,
    handleSubmit,
  };
};

// ========== Main Newsletter Popup Component ==========
const Newsletter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    formData,
    formErrors,
    isSubmitting,
    formStatus,
    handleChange,
    handleSubmit,
  } = useContactForm();

  // Auto-open popup after 3 seconds (only once per page load)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Left-side Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 left-10 z-40 group flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-110 hover:rotate-12 animate-pulse-glow"
        aria-label="Open Contact Popup"
      >
        <FaEnvelope className="text-white text-2xl transition-transform group-hover:scale-110" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={closePopup} // Close when clicking outside
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* 3D Background inside modal */}
            <ThreePopupBackground />

            {/* Glassmorphism Content */}
            <div className="relative z-10 p-6 md:p-8 backdrop-blur-xl bg-white/10 dark:bg-black/30 rounded-2xl border border-white/20 shadow-xl">
              {/* Close Button - Now Working */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-20 text-white/90 hover:text-white bg-slate-900/70 rounded-full p-3 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Close Popup"
                type="button"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-mono tracking-wider backdrop-blur-sm border border-blue-500/30 mb-3">
                  ✦ Let's Connect ✦
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Get In Touch
                </h3>
                <p className="text-gray-300 text-sm mt-2">
                  I'd love to hear from you! Send me a message and I'll respond
                  within 24h.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    <FaUser className="inline mr-2" /> Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                  {formErrors.name && (
                    <p className="text-red-400 text-xs mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    <FaEnvelope className="inline mr-2" /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="hello@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    <FaComment className="inline mr-2" /> Message *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                    placeholder="Hi Rifat, I have a project idea about..."
                  />
                  {formErrors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg transition-all hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {formStatus && (
                  <p
                    className={`text-center text-sm font-medium mt-3 ${formStatus.includes("successfully") ? "text-green-300" : "text-orange-300"}`}
                  >
                    {formStatus}
                  </p>
                )}
              </form>

              {/* Decorative blurred orbs */}
              <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-blue-500 rounded-full filter blur-2xl opacity-30 animate-pulse" />
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-purple-500 rounded-full filter blur-2xl opacity-30 animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      )}

      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
    </>
  );
};

export default Newsletter;
