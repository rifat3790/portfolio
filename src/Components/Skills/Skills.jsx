import React, { useState } from "react";
import { FaGlobe, FaCode, FaServer, FaDatabase, FaWrench } from "react-icons/fa";

// Sample Skill Data
const skillData = [
  { id: 1, category: "Frontend", name: "React", proficiency: 90, icon: <FaCode />, projectsUsed: 8 },
  { id: 2, category: "Frontend", name: "Next.js", proficiency: 85, icon: <FaCode />, projectsUsed: 6 },
  { id: 3, category: "Frontend", name: "TypeScript", proficiency: 80, icon: <FaCode />, projectsUsed: 4 },
  { id: 4, category: "Frontend", name: "Tailwind CSS", proficiency: 95, icon: <FaCode />, projectsUsed: 7 },
  { id: 5, category: "Backend", name: "Node.js", proficiency: 85, icon: <FaServer />, projectsUsed: 5 },
  { id: 6, category: "Backend", name: "Express.js", proficiency: 80, icon: <FaServer />, projectsUsed: 5 },
  { id: 7, category: "Database", name: "MySQL", proficiency: 80, icon: <FaDatabase />, projectsUsed: 3 },
  { id: 8, category: "Database", name: "MongoDB", proficiency: 70, icon: <FaDatabase />, projectsUsed: 2 },
  { id: 9, category: "Tools", name: "Git", proficiency: 85, icon: <FaWrench />, projectsUsed: 10 },
  { id: 10, category: "Tools", name: "Postman", proficiency: 80, icon: <FaWrench />, projectsUsed: 4 },
  { id: 11, category: "Tools", name: "Shopify", proficiency: 90, icon: <FaWrench />, projectsUsed: 10 },
  { id: 12, category: "Tools", name: "WordPress", proficiency: 90, icon: <FaWrench />, projectsUsed: 6 },
  { id: 13, category: "Tools", name: "Wix", proficiency: 90, icon: <FaWrench />, projectsUsed: 2 },
];

const technologies = [
  { name: "React" },
  { name: "Node.js" },
  { name: "MySQL" },
  { name: "Git" },
];

const CATEGORY_ICONS = {
  All: <FaGlobe className="mr-2" />,
  Frontend: <FaCode className="mr-2" />,
  Backend: <FaServer className="mr-2" />,
  Database: <FaDatabase className="mr-2" />,
  Tools: <FaWrench className="mr-2" />,
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredSkills =
    activeCategory === "All"
      ? skillData
      : skillData.filter((skill) => skill.category === activeCategory);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0a192f] to-[#1e293b] py-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-2 animate-gradient">
            Skills & Technologies
          </h2>
          <p className="text-lg text-blue-200 font-medium">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["All", "Frontend", "Backend", "Database", "Tools"].map((category) => (
            <button
              key={category}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all
                ${activeCategory === category
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white/10 text-blue-300 hover:bg-blue-600 hover:text-white"}`}
              onClick={() => setActiveCategory(category)}
            >
              {CATEGORY_ICONS[category]} {category}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-6 flex flex-col gap-2 transition-transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-blue-400">{skill.icon}</span>
                  <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full
                    ${skill.proficiency >= 90
                      ? "bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text"
                      : skill.proficiency >= 80
                      ? "bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
                      : skill.proficiency >= 70
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text"
                      : "bg-gradient-to-r from-gray-400 to-gray-600 text-transparent bg-clip-text"
                    }`}
                >
                  {skill.proficiency >= 90
                    ? "Expert"
                    : skill.proficiency >= 80
                    ? "Advanced"
                    : skill.proficiency >= 70
                    ? "Intermediate"
                    : "Beginner"}
                </span>
              </div>
              <p className="text-sm text-blue-200">{skill.category}</p>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-xs text-blue-300 font-semibold">Proficiency</span>
                <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <span className="text-xs text-blue-200 font-bold mt-1">{skill.proficiency}%</span>
              </div>
              <p className="mt-2 text-xs text-blue-400">
                Used in {skill.projectsUsed}+ projects
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-blue-300 mt-8 text-sm">
          Showing {filteredSkills.length} skills
        </p>
      </div>
    </section>
  );
};

export default Skills;
