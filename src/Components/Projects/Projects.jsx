import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import vue from "../../../public/eye.jpeg";
import phase from "../../../public/phase.png";
import sparex from "../../../public/sparex.png";
import rumizii from "../../../public/rumizi.png";
import ascend from "../../../public/ascend.jpg";
import kitfix from "../../../public/kitfix.png";
import burlap from "../../../public/burlap.png";
import waterQuality from "../../../public/water.png";
import strongRoots from "../../../public/strong.png";
import shopGiselle from "../../../public/giselle.png";
import sofiSwim from "../../../public/sofi.jpeg";
import green from "../../../public/green.png";
import ihss from "../../../public/ihss.png";
import portfolio from "../../../public/portfolio.png";

// Shopify Projects (category stays "E-commerce")
const shopifyProjects = [
  {
    id: 8,
    title: "ITS Phase",
    category: "E-commerce",
    description:
      "A modern Shopify store for ITS Phase, featuring custom theme development, optimized product pages, and seamless checkout experience.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: phase,
    liveLink: "https://itsphase.com/",
    githubLink: "",
  },
  {
    id: 9,
    title: "Sperax",
    category: "E-commerce",
    description:
      "Shopify-based e-commerce platform for Sperax, focusing on brand-centric design, product catalog, and secure payment integration.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: sparex,
    liveLink: "https://sperax.com/",
    githubLink: "",
  },
  {
    id: 10,
    title: "Rumizii",
    category: "E-commerce",
    description:
      "Developed a Shopify store for Rumizii UK, implementing custom layouts, responsive design, and enhanced user experience for fashion products.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: rumizii,
    liveLink: "https://rumizii.co.uk/",
    githubLink: "",
  },
  {
    id: 11,
    title: "Ascend Physique of a God",
    category: "E-commerce",
    description:
      "Custom Shopify store for Ascend Physique of a God, with tailored product pages, branding, and streamlined checkout process.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: ascend,
    liveLink: "https://ascendphysiqueofagod.store/",
    githubLink: "",
  },
  {
    id: 12,
    title: "Kitfix",
    category: "E-commerce",
    description:
      "Shopify e-commerce solution for Kitfix, featuring dynamic product listings, mobile-friendly design, and integrated payment gateways.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: true,
    date: "2025",
    team: "Solo",
    image: kitfix,
    liveLink: "https://kitfix.com/",
    githubLink: "",
  },
  {
    id: 13,
    title: "Burlap & Oak",
    category: "E-commerce",
    description:
      "Developed Burlap & Oak's Shopify store with a focus on rustic design, easy navigation, and optimized for conversions.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: burlap,
    liveLink: "https://burlapandoak.com/",
    githubLink: "",
  },
  {
    id: 14,
    title: "Water Quality USA",
    category: "E-commerce",
    description:
      "Shopify store for Water Quality USA, providing a clean interface for water testing products and efficient order management.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: waterQuality,
    liveLink: "https://waterqualityusa.myshopify.com/",
    githubLink: "",
  },
  {
    id: 15,
    title: "Strong Roots Brand",
    category: "E-commerce",
    description:
      "Custom Shopify solution for Strong Roots Brand, with branded visuals, product filtering, and smooth shopping experience.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: strongRoots,
    liveLink: "https://strongrootsbrand.com/",
    githubLink: "",
  },
  {
    id: 16,
    title: "Shop Giselle",
    category: "E-commerce",
    description:
      "Shopify store for Shop Giselle, focusing on elegant design, easy product discovery, and secure checkout.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: shopGiselle,
    liveLink: "https://shopgiselle.com/",
    githubLink: "",
  },
  {
    id: 17,
    title: "Vue 362",
    category: "E-commerce",
    description:
      "Developed Vue 362 Shopify store with custom theme enhancements and responsive layouts for a seamless shopping experience.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: vue,
    liveLink: "https://vue-362.myshopify.com/",
    githubLink: "",
  },
  {
    id: 18,
    title: "Sofi Swim",
    category: "E-commerce",
    description:
      "Shopify store for Sofi Swim, featuring vibrant product galleries, mobile optimization, and user-friendly navigation.",
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    featured: false,
    date: "2025",
    team: "Solo",
    image: sofiSwim,
    liveLink: "https://sofi-swim-2.myshopify.com/",
    githubLink: "",
  },
];

// Sample Project Data
const otherProjects = [
  {
    id: 1,
    title: "Green Healthcare",
    category: "Healthcare",
    description:
      "Developed with React and Firebase, featuring user auth, responsive layout, and sections on workshops, fitness, screenings, and health resources.",
    techStack: ["React", "Firebase"],
    featured: true,
    date: "15/12/2024",
    team: "Solo",
    image: green,
    liveLink: "https://health-fairs-664ee.web.app/",
    githubLink: "",
  },
  {
    id: 2,
    title: "Integrated Healthcare Support System",
    category: "Healthcare",
    description:
      "The system securely manages user access, doctor appointments, digital medical records, face-verified discounts, and provides admins full control for efficient healthcare management.",
    techStack: ["React", "Next.js", "Node.js", "MySQL"],
    featured: true,
    date: "12/02/2024",
    team: "Solo",
    image: ihss,
    liveLink: "",
    githubLink:
      "https://github.com/rifat3790/Integrated-Healthcare-Support-System-IHSS-", // GitHub link available
  },
  {
    id: 3,
    title: "HR Management System",
    category: "Web App",
    description: "Project coming soon..",
    techStack: ["React", "Next.js", "Node.js", "MySQL"],
    featured: true,
    date: "19/09/2025",
    team: "Solo",
    image: "/path/to/hr-management-screenshot.jpg",
    liveLink: "",
    githubLink: "",
  },
  {
    id: 4,
    title: "Portfolio Website",
    category: "Portfolio",
    description:
      "A modern, responsive portfolio website with animations and dark mode support.",
    techStack: ["React", "Tailwind CSS", "DaisyUI"],
    featured: true,
    date: "13/08/2025",
    team: "Solo",
    image: portfolio,
    liveLink: "https://portfolio-tyko.vercel.app/",
    githubLink: "https://github.com/rifat3790/portfolio",
  },
  {
    id: 5,
    title: "Blog Platform",
    category: "Web App",
    description: "Project coming soon..",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "TinyMCE"],
    featured: false,
    date: "15/12/2025",
    team: "1 person",
    image: "/path/to/blog-platform-screenshot.jpg",
    liveLink: "",
    githubLink: "https://github.com/example",
  },
  {
    id: 6,
    title: "Chat Application",
    category: "Dashboard",
    description: "Project coming soon..",
    techStack: ["React", "Socket.io", "Node.js", "MongoDB"],
    featured: false,
    date: "19/05/2023",
    team: "Solo",
    image: "/path/to/chat-application-screenshot.jpg",
    liveLink: "https://chatapp.example.com",
    githubLink: "",
  },
  {
    id: 7,
    title: "Weather Dashboard",
    category: "Web App",
    description: "Project coming soon..",
    techStack: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    featured: false,
    date: "19/09/2025",
    team: "Solo",
    image: "/path/to/weather-dashboard-screenshot.jpg",
    liveLink: "",
    githubLink: "",
  },
];

// Merge Shopify projects first, then others
const projectData = [...shopifyProjects, ...otherProjects];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTechnologies, setActiveTechnologies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Filter projects based on category, technologies, and search term
  const filteredProjects = projectData.filter((project) => {
    // Show Shopify projects in both "Web App" and "E-commerce" filters
    const matchesCategory =
      activeCategory === "All" ||
      project.category === activeCategory ||
      (activeCategory === "Web App" && project.techStack.includes("Shopify")) ||
      (activeCategory === "E-commerce" &&
        project.techStack.includes("Shopify")) ||
      (activeCategory === "Shopify" && project.techStack.includes("Shopify"));
    const matchesTechnology =
      activeTechnologies.length === 0 ||
      project.techStack.some((tech) => activeTechnologies.includes(tech));
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTechnology && matchesSearch;
  });

  // Modal handler
  const handleProjectClick = (project) => {
    setModalProject(project);
    setModalOpen(true);
  };

  // Only open modal if BOTH links are empty OR liveLink is empty, otherwise open the link directly
  const handleButtonClick = (type, project) => {
    if (type === "live") {
      if (!project.liveLink) {
        setModalProject({ ...project, comingSoon: true });
        setModalOpen(true);
        return;
      } else {
        window.open(project.liveLink, "_blank");
        return;
      }
    }
    if (type === "code") {
      if (!project.githubLink) {
        setModalProject({ ...project, comingSoon: true });
        setModalOpen(true);
        return;
      } else {
        window.open(project.githubLink, "_blank");
        return;
      }
    }
  };

  // Limit initial projects to 8, show all if showAll is true
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-[#0a192f] to-[#1e293b] text-white min-h-screen"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-2 animate-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-blue-200 mb-2">
            A showcase of my recent work and personal projects that demonstrate
            my skills and passion for development.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="px-4 py-2 w-full rounded-lg bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-3 right-4 text-blue-300" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {[
            "All",
            "Web App",
            "E-commerce",
            "Healthcare",
            "Portfolio",
            "Dashboard",
          ].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all
                ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white/10 text-blue-300 hover:bg-blue-600 hover:text-white"
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Technology Filters (Shopify after Node.js) */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            "React",
            "Next.js",
            "Node.js",
            "Shopify",
            "MySQL",
            "Tailwind CSS",
            "TypeScript",
            "Firebase",
            "PHP",
            "Express",
            "MongoDB",
            "Chart.js",
            "OpenWeather API",
            "Prisma",
            "PostgreSQL",
            "TinyMCE",
            "Framer Motion",
          ].map((tech) => (
            <button
              key={tech}
              className={`px-3 py-1 rounded-full font-medium text-xs transition-all
                ${
                  activeTechnologies.includes(tech)
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white/10 text-blue-300 hover:bg-blue-600 hover:text-white"
                }`}
              onClick={() =>
                setActiveTechnologies((prev) =>
                  prev.includes(tech)
                    ? prev.filter((item) => item !== tech)
                    : [...prev, tech]
                )
              }
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Showing count */}
        <div className="text-center text-blue-300 mb-6 text-sm">
          Showing {filteredProjects.length} of {projectData.length} projects
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer animate-fadeIn"
              onClick={() => handleProjectClick(project)}
            >
              {/* Project Image with hover scroll effect */}
              <div className="h-40 md:h-64 lg:h-72 w-full overflow-hidden rounded-t-xl relative group">
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${
                      project.image || "/placeholder.jpg"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    transition:
                      "background-position 8s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
                {/* Scroll effect on hover */}
                <style>{`
                    .group:hover > div {
                      background-position: bottom !important;
                    }
                  `}</style>
                {/* Optional: fallback icon if no image */}
                {!project.image && (
                  <span className="absolute inset-0 flex items-center justify-center text-4xl text-blue-300 font-bold">
                    B
                  </span>
                )}
                {project.featured && (
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-blue-200 mb-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-blue-300 mb-2">
                  <span>{project.date}</span>
                  <span>{project.team}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleButtonClick("live", project)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-xs font-semibold transition-all"
                  >
                    Live Demo
                  </button>
                  <button
                    onClick={() => handleButtonClick("code", project)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-xs font-semibold transition-all"
                  >
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && filteredProjects.length > 8 && (
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-all"
              onClick={() => setShowAll(true)}
            >
              Show More
            </button>
          </div>
        )}

        {/* Modal Component (Project Details) - Adjusted for new layout */}
        {modalOpen && modalProject && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {modalProject.title}
                </h3>
                <div className="mb-4">
                  {modalProject.comingSoon ? (
                    <p className="text-yellow-500 font-semibold">
                      Coming Soon!
                    </p>
                  ) : (
                    <>
                      <a
                        href={modalProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Live Demo
                      </a>
                      {modalProject.githubLink && (
                        <span className="mx-2 text-gray-400">|</span>
                      )}
                      {modalProject.githubLink && (
                        <a
                          href={modalProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Code
                        </a>
                      )}
                    </>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{modalProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {modalProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-800">Date:</span>{" "}
                  {modalProject.date}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-800">Team:</span>{" "}
                  {modalProject.team}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
