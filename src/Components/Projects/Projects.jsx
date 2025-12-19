import React, { useState } from "react";
import { FaSearch, FaCheck } from "react-icons/fa";
import projectsData from "../../data/projectsData.json";

// Merge Shopify projects (desc order) then others
const projectData = [
  ...projectsData.shopifyProjects,
  ...projectsData.otherProjects,
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTechnologies, setActiveTechnologies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
const [showToast, setShowToast] = useState(false);


  // Filter projects based on category, technologies, and search term
  const filteredProjects = projectData.filter((project) => {
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
  const handleButtonClick = (type, project, e) => {
    e.stopPropagation();
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

  // Copy password to clipboard with animation
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

  {/* Global Copy Toast */}
  {showToast && (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-toast">
      <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl backdrop-blur-md">
        <FaCheck className="text-sm" />
        <span className="text-sm font-semibold tracking-wide">
          Password copied successfully
        </span>
      </div>
    </div>
  )}

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

        {/* Technology Filters */}
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
          Showing {displayedProjects.length} of {filteredProjects.length}{" "}
          projects
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl animate-fadeIn"
            >
              {/* Project Image */}
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
                <style>{`
                    .group:hover > div {
                      background-position: bottom !important;
                    }
                  `}</style>
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
                  <p className="text-sm text-blue-200 mb-3">
                    {project.description}
                  </p>
                </div>

                {/* Password Field */}
                {/* Password / Access Info */}
{project.password ? (
  <div className="mb-3 p-3 bg-white/10 rounded-lg relative">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs text-blue-300 font-semibold mb-1">
          Password
        </p>
        <p className="text-sm font-mono text-white">
          {project.password}
        </p>
      </div>

      <button
        onClick={(e) =>
          handleCopyPassword(project.password, project.id, e)
        }
        className={`ml-2 p-2 rounded-lg transition-all transform ${
          copiedId === project.id
            ? "bg-green-500 scale-110"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
        title="Copy password"
      >
        {copiedId === project.id ? (
          <FaCheck className="text-white text-sm" />
        ) : (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h2V3a3 3 0 00-3-3H9a3 3 0 00-3 3v1H4a1 1 0 000 2v2a1 1 0 001 1h1v2H4a1 1 0 11 0 2h1v2a1 1 0 001 1h10a1 1 0 001-1v-2h1a1 1 0 110-2h-1v-2h1a1 1 0 001-1V5a1 1 0 000-2h-2V3z" />
          </svg>
        )}
      </button>
    </div>
  </div>
) : (
  <div className="mb-3 p-3 bg-white/5 rounded-lg">
    <p className="text-xs text-blue-300 italic">
      This project is not password protected.
    </p>
  </div>
)}


                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-blue-300 mb-3">
                  <span>{project.date}</span>
                  <span>{project.team}</span>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={(e) => handleButtonClick("live", project, e)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-xs font-semibold transition-all flex-1"
                  >
                    Live Demo
                  </button>
                  <button
                    onClick={(e) => handleButtonClick("code", project, e)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-xs font-semibold transition-all flex-1"
                  >
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && filteredProjects.length > 6 && (
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-all"
              onClick={() => setShowAll(true)}
            >
              Show More
            </button>
          </div>
        )}

        {/* Modal Component */}
        {modalOpen && modalProject && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-end p-4 sticky top-0 bg-white">
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition"
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

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {modalProject.title}
                </h3>
                <div className="mb-4">
                  {modalProject.comingSoon ? (
                    <p className="text-yellow-500 font-semibold text-lg">
                      Coming Soon!
                    </p>
                  ) : (
                    <>
                      {modalProject.liveLink && (
                        <a
                          href={modalProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
                      {modalProject.liveLink && modalProject.githubLink && (
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
                <div className="text-sm text-gray-600 space-y-2">
                  <div>
                    <span className="font-semibold text-gray-800">Date:</span>{" "}
                    {modalProject.date}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Team:</span>{" "}
                    {modalProject.team}
                  </div>
                  {modalProject.password && (
                    <div>
                      <span className="font-semibold text-gray-800">
                        Password:
                      </span>{" "}
                      {modalProject.password}
                    </div>
                  )}
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
