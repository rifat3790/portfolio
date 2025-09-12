import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

// Sample Project Data
const projectData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "E-commerce",
    description: "A full-stack e-commerce solution with modern UI and secure payment integration.",
    techStack: ["React", "Node.js", "Express", "MySQL"],
    featured: true,
    date: "15/12/2024",
    team: "1 person",
    image: "",
  },
  {
    id: 2,
    title: "Task Management App",
    category: "Dashboard",
    description: "A collaborative task management application with real-time updates and team features.",
    techStack: ["React", "Socket.io", "Node.js", "MongoDB"],
    featured: true,
    date: "12/02/2023",
    team: "2 people",
    image: "",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    category: "Web App",
    description: "A responsive weather application with location-based forecasts and interactive charts.",
    techStack: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    featured: false,
    date: "19/09/2023",
    team: "Solo",
    image: "",
  },
  {
    id: 4,
    title: "Portfolio Website",
    category: "Portfolio",
    description: "A modern, responsive portfolio website with animations and dark mode support.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    featured: true,
    date: "28/12/2024",
    team: "Solo",
    image: "",
  },
  {
    id: 5,
    title: "Blog Platform",
    category: "Web App",
    description: "A full-featured blog platform with CMS capabilities and SEO optimization.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "TinyMCE"],
    featured: false,
    date: "15/12/2025",
    team: "1 person",
    image: "",
  },
  {
    id: 6,
    title: "Chat Application",
    category: "Dashboard",
    description: "Real-time chat application with group messaging and file sharing capabilities.",
    techStack: ["React", "Socket.io", "Node.js", "MongoDB"],
    featured: false,
    date: "19/05/2023",
    team: "Solo",
    image: "",
  },
];

// Filter Categories and Technologies
const categories = ["All", "Web App", "Healthcare", "Portfolio", "E-commerce", "Dashboard"];
const technologies = [
  "React", "Next.js", "Node.js", "MySQL", "Tailwind CSS", "TypeScript", "Firebase", "PHP", "Express", "MongoDB", "Chart.js", "OpenWeather API", "Prisma", "PostgreSQL", "TinyMCE", "Framer Motion"
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTechnologies, setActiveTechnologies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);

  // Filter projects based on category, technologies, and search term
  const filteredProjects = projectData.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
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

  return (
    <section className="py-20 bg-gradient-to-br from-[#0a192f] to-[#1e293b] text-white min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-2 animate-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-blue-200 mb-2">
            A showcase of my recent work and personal projects that demonstrate my skills and passion for development.
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
              onChange={e => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-3 right-4 text-blue-300" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all
                ${activeCategory === category
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white/10 text-blue-300 hover:bg-blue-600 hover:text-white"}
              `}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Technology Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {technologies.map((tech) => (
            <button
              key={tech}
              className={`px-3 py-1 rounded-full font-medium text-xs transition-all
                ${activeTechnologies.includes(tech)
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white/10 text-blue-300 hover:bg-blue-600 hover:text-white"}
              `}
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
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer animate-fadeIn"
              onClick={() => handleProjectClick(project)}
            >
              <div className="h-40 bg-gradient-to-br from-blue-900 to-purple-900 rounded-t-xl flex items-center justify-center relative">
                {/* Placeholder for image */}
                <span className="text-4xl text-blue-300 font-bold">B</span>
                {project.featured && (
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-blue-200 mb-2">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">{tech}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-blue-300 mb-2">
                  <span>{project.date}</span>
                  <span>{project.team}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-xs font-semibold transition-all">Live Demo</button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-xs font-semibold transition-all">Code</button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-xs font-semibold transition-all">Github</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white/90 rounded-xl shadow-2xl p-8 max-w-sm w-full text-center animate-fadeInUp">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">{modalProject?.title}</h3>
              <p className="text-lg text-gray-800 mb-6">Project coming soon...</p>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-all"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95);}
            to { opacity: 1; transform: scale(1);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s cubic-bezier(.6,.2,.2,1);
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.7s cubic-bezier(.6,.2,.2,1);
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
      </div>
    </section>
  );
};

export default Projects;
