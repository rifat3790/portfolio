import React, { useContext, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { FaSearch, FaCheck, FaMoon, FaSun } from "react-icons/fa";
import projectsData from "../../data/projectsData.json";
import { ThemeContext } from "../../context/themeContext";

const priorityTitles = [
  "AMONE Fragrance",
  "LYQORA Fragrance",
  "Masonic Jewellery",
  "Vue 362",
  "Koffee Lane",
  "Shop Giselle",
  "ITS Phase",
  "Burlap & Oak",
  "Kitfix",
  "Sperax",
];

const topShopifyProjects = priorityTitles
  .map((title) =>
    projectsData.shopifyProjects.find((project) => project.title === title)
  )
  .filter(Boolean);

const projectData = [
  ...topShopifyProjects,
  ...projectsData.shopifyProjects.filter(
    (project) => !priorityTitles.includes(project.title)
  ),
  ...projectsData.otherProjects,
];

// ========== 3D Background Component ==========
const ThreeBackground = ({ isDarkMode, primaryColor }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x0a0a2a : 0xf0f4fa, 0.006);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 1, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x404060, 0.6);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 3, 4);
    const backLight = new THREE.PointLight(primaryColor, 0.5);
    backLight.position.set(-2, 1, -4);
    const fillLight = new THREE.PointLight(0x8866ff, 0.4);
    fillLight.position.set(1, 2, 3);
    scene.add(ambient, dirLight, backLight, fillLight);

    const group = new THREE.Group();

    const dodeGeo = new THREE.DodecahedronGeometry(1.1);
    const dodeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(primaryColor),
      emissive: new THREE.Color(primaryColor).multiplyScalar(0.25),
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.92,
    });
    const dode = new THREE.Mesh(dodeGeo, dodeMat);
    group.add(dode);

    const sphereWireGeo = new THREE.SphereGeometry(1.7, 24, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(primaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireSphere = new THREE.Mesh(sphereWireGeo, wireMat);
    group.add(wireSphere);

    const particleCount = 1500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(primaryColor),
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    const ringGeo = new THREE.TorusGeometry(1.45, 0.045, 64, 300);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(primaryColor),
      emissive: new THREE.Color(primaryColor).multiplyScalar(0.6),
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    scene.add(group);

    let mouseX = 0,
      mouseY = 0;
    let targetRotX = 0,
      targetRotY = 0;
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
      time += 0.005;

      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

      dode.rotation.y = time * 0.3;
      dode.rotation.x = Math.sin(time * 0.5) * 0.2;
      ring.rotation.z = time * 0.2;
      particles.rotation.y = time * 0.08;
      particles.rotation.x = time * 0.05;

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
  }, [isDarkMode, primaryColor]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

// ========== Main Projects Component ==========
const Projects = () => {
  const { isDarkMode, setIsDarkMode, colorIdx, COLOR_SCHEMES } = useContext(ThemeContext);
  const primaryColor = COLOR_SCHEMES?.[colorIdx]?.hsl || "#3b82f6";
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTechnologies, setActiveTechnologies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const filteredProjects = projectData.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      project.category === activeCategory ||
      (activeCategory === "Web App" && project.techStack.includes("Shopify")) ||
      (activeCategory === "E-commerce" && project.techStack.includes("Shopify")) ||
      (activeCategory === "Shopify" && project.techStack.includes("Shopify"));
    const matchesTechnology =
      activeTechnologies.length === 0 ||
      project.techStack.some((tech) => activeTechnologies.includes(tech));
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTechnology && matchesSearch;
  });

  const handleButtonClick = (type, project, e) => {
    e.stopPropagation();
    if (type === "live") {
      if (!project.liveLink) {
        setModalProject({ ...project, comingSoon: true });
        setModalOpen(true);
        return;
      }
      window.open(project.liveLink, "_blank");
    } else {
      if (!project.githubLink) {
        setModalProject({ ...project, comingSoon: true });
        setModalOpen(true);
        return;
      }
      window.open(project.githubLink, "_blank");
    }
  };

  const handleCopyPassword = (password, projectId, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(password);
    setCopiedId(projectId);
    setShowToast(true);
    setTimeout(() => {
      setCopiedId(null);
      setShowToast(false);
    }, 2000);
  };

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  const themeClasses = {
    section: isDarkMode
      ? "bg-gradient-to-br from-[#0a0a2a]/90 to-[#1e1b4b]/90 text-white"
      : "bg-gradient-to-br from-[#f8fafc]/90 to-[#e2e8f0]/90 text-slate-900",
    input: isDarkMode
      ? "bg-white/10 text-white placeholder-blue-200 backdrop-blur-sm"
      : "bg-slate-200/80 text-slate-900 placeholder-slate-500",
    sectionText: isDarkMode ? "text-blue-200" : "text-slate-600",
    buttonActive: isDarkMode
      ? "bg-blue-600 text-white shadow-lg"
      : "bg-slate-900 text-white shadow-lg",
    buttonInactive: isDarkMode
      ? "bg-white/10 text-blue-300 hover:bg-blue-600 hover:text-white backdrop-blur-sm"
      : "bg-slate-200/80 text-slate-700 hover:bg-slate-900 hover:text-white",
    card: isDarkMode
      ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
      : "bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-xl",
    cardText: isDarkMode ? "text-white" : "text-slate-900",
    cardSubText: isDarkMode ? "text-blue-200" : "text-slate-600",
    passwordCard: isDarkMode ? "bg-white/20" : "bg-slate-100/80",
  };

  return (
    <section
      id="projects"
      className={`relative py-20 min-h-screen overflow-hidden transition-colors duration-300 ${themeClasses.section}`}
    >
      <ThreeBackground isDarkMode={isDarkMode} primaryColor={primaryColor} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {showToast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-toast">
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl backdrop-blur-md">
              <FaCheck className="text-sm" />
              <span className="text-sm font-semibold">Password copied</span>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center mb-8 gap-4">
          <div className="text-center">
            <h2
              className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text drop-shadow-lg mb-2 animate-gradient"
              style={{
                backgroundImage: `linear-gradient(90deg, ${primaryColor}, #a855f7, ${primaryColor})`,
                backgroundSize: "200% auto",
              }}
            >
              Featured Projects
            </h2>
            <p className={`text-lg ${themeClasses.sectionText} text-center max-w-2xl mx-auto`}>
              A showcase of modern web applications, e‑commerce stores, and interactive dashboards.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg transition-all shadow-lg backdrop-blur-sm ${
              isDarkMode ? "bg-white/10 text-yellow-300" : "bg-slate-200/80 text-slate-900"
            }`}
          >
            {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className={`px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${themeClasses.input}`}
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className={`absolute top-3 right-4 ${isDarkMode ? "text-blue-300" : "text-slate-500"}`} />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {["All", "Web App", "E-commerce", "Healthcare", "Portfolio", "Dashboard"].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeCategory === cat ? themeClasses.buttonActive : themeClasses.buttonInactive
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            "React", "Next.js", "Node.js", "Shopify", "MySQL", "Tailwind CSS",
            "TypeScript", "Firebase", "PHP", "Express", "MongoDB", "Chart.js",
            "OpenWeather API", "Prisma", "PostgreSQL", "TinyMCE", "Framer Motion",
          ].map((tech) => (
            <button
              key={tech}
              className={`px-3 py-1 rounded-full font-medium text-xs transition-all ${
                activeTechnologies.includes(tech) ? themeClasses.buttonActive : themeClasses.buttonInactive
              }`}
              onClick={() =>
                setActiveTechnologies((prev) =>
                  prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
                )
              }
            >
              {tech}
            </button>
          ))}
        </div>

        <div className={`text-center mb-6 text-sm ${themeClasses.sectionText}`}>
          Showing {displayedProjects.length} of {filteredProjects.length} projects
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`${themeClasses.card} rounded-xl shadow-xl flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl animate-fadeInUp`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* IMAGE CONTAINER WITH FIXED SCROLL EFFECT */}
              <div className="h-48 md:h-64 w-full overflow-hidden rounded-t-xl relative group">
                <div
                  className="absolute inset-0 w-full h-full transition-all duration-[3000ms] ease-out group-hover:bg-bottom"
                  style={{
                    backgroundImage: `url(${project.image || "/placeholder.jpg"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    transitionProperty: "background-position",
                  }}
                />
                {project.featured && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between p-6">
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${themeClasses.cardText}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-3 ${themeClasses.cardSubText}`}>
                    {project.description}
                  </p>
                </div>
                {project.password ? (
                  <div className={`mb-3 p-3 rounded-lg ${themeClasses.passwordCard}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`text-xs font-semibold mb-1 ${themeClasses.cardSubText}`}>Password</p>
                        <p className={`text-sm font-mono ${themeClasses.cardText}`}>{project.password}</p>
                      </div>
                      <button
                        onClick={(e) => handleCopyPassword(project.password, project.id, e)}
                        className={`ml-2 p-2 rounded-lg transition-all transform ${
                          copiedId === project.id ? "bg-green-500 scale-110" : "bg-blue-600 hover:bg-blue-500"
                        }`}
                      >
                        {copiedId === project.id ? (
                          <FaCheck className="text-white text-sm" />
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h2V3a3 3 0 00-3-3H9a3 3 0 00-3 3v1H4a1 1 0 000 2v2a1 1 0 001 1h1v2H4a1 1 0 11 0 2h1v2a1 1 0 001 1h10a1 1 0 001-1v-2h1a1 1 0 110-2h-1v-2h1a1 1 0 001-1V5a1 1 0 000-2h-2V3z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-blue-300 italic">No password required</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs bg-slate-500 text-white px-3 py-1 rounded-full">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-blue-300 mb-3">
                  <span>{project.date}</span>
                  <span>{project.team}</span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={(e) => handleButtonClick("live", project, e)}
                    className="px-4 py-2 text-white rounded-lg text-xs font-semibold transition-all flex-1 hover:shadow-lg transform hover:scale-105"
                    style={{ backgroundImage: `linear-gradient(90deg, ${primaryColor}, #a855f7)` }}
                  >
                    Live Demo
                  </button>
                  <button
                    onClick={(e) => handleButtonClick("code", project, e)}
                    className="px-4 py-2 text-white rounded-lg text-xs font-semibold transition-all flex-1 hover:shadow-lg transform hover:scale-105"
                    style={{ backgroundImage: `linear-gradient(90deg, ${primaryColor}, #a855f7)` }}
                  >
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && filteredProjects.length > 6 && (
          <div className="flex justify-center mt-12">
            <button
              className="px-8 py-3 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ backgroundImage: `linear-gradient(90deg, ${primaryColor}, #a855f7)` }}
              onClick={() => setShowAll(true)}
            >
              Show More Projects
            </button>
          </div>
        )}

        {modalOpen && modalProject && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-end p-4 sticky top-0 bg-white dark:bg-slate-900">
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{modalProject.title}</h3>
                <div className="mb-4">
                  {modalProject.comingSoon ? (
                    <p className="text-yellow-500 font-semibold text-lg">Coming Soon!</p>
                  ) : (
                    <>
                      {modalProject.liveLink && (
                        <a href={modalProject.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Live Demo
                        </a>
                      )}
                      {modalProject.liveLink && modalProject.githubLink && <span className="mx-2 text-gray-400">|</span>}
                      {modalProject.githubLink && (
                        <a href={modalProject.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Code
                        </a>
                      )}
                    </>
                  )}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4">{modalProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {modalProject.techStack.map((tech) => (
                    <span key={tech} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <div><span className="font-semibold text-slate-800 dark:text-white">Date:</span> {modalProject.date}</div>
                  <div><span className="font-semibold text-slate-800 dark:text-white">Team:</span> {modalProject.team}</div>
                  {modalProject.password && (
                    <div><span className="font-semibold text-slate-800 dark:text-white">Password:</span> {modalProject.password}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        @keyframes toast {
          0% { opacity: 0; transform: translateY(-20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-toast { animation: toast 2s ease-in-out forwards; }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        /* Fix for background-position transition on hover */
        .group:hover .group-hover\\:bg-bottom {
          background-position: bottom !important;
        }
      `}</style>
    </section>
  );
};

export default Projects;