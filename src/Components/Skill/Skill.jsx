import { FaCode, FaServer, FaDatabase, FaWrench, FaGlobe } from "react-icons/fa";  // Import the icons

// Map icon names to the corresponding icon component
const ICONS = {
  FaCode: <FaCode className="mr-2" />,
  FaServer: <FaServer className="mr-2" />,
  FaDatabase: <FaDatabase className="mr-2" />,
  FaWrench: <FaWrench className="mr-2" />,
  FaGlobe: <FaGlobe className="mr-2" />,
};

const Skill = ({ skill }) => {
  const { name, category, proficiency, icon, projectsUsed } = skill;  // Destructuring skill data

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-6 flex flex-col gap-2 transition-transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-blue-400">{ICONS[icon]}</span>
          <h3 className="text-lg font-bold text-white">{name}</h3>
        </div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full
            ${proficiency >= 90
              ? "bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text"
              : proficiency >= 80
              ? "bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
              : proficiency >= 70
              ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text"
              : "bg-gradient-to-r from-gray-400 to-gray-600 text-transparent bg-clip-text"
            }`}
        >
          {proficiency >= 90
            ? "Expert"
            : proficiency >= 80
            ? "Advanced"
            : proficiency >= 70
            ? "Intermediate"
            : "Beginner"}
        </span>
      </div>
      <p className="text-sm text-blue-200">{category}</p>
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs text-blue-300 font-semibold">Proficiency</span>
        <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
            style={{ width: `${proficiency}%` }}
          />
        </div>
        <span className="text-xs text-blue-200 font-bold mt-1">{proficiency}%</span>
      </div>
      <p className="mt-2 text-xs text-blue-400">Used in {projectsUsed}+ projects</p>
    </div>
  );
};

export default Skill;
