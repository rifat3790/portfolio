import { useState, useEffect } from "react";
import Skill from "../Skill/Skill";


const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/skills.json")
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) {
    return <div className="py-10 px-4 md:px-8 lg:px-16 text-center">Loading...</div>;
  }

  return (
    <section className="bg-gradient-to-br from-[#0a192f] to-[#1e293b] dark:from-[#0a192f] dark:to-[#1e293b] overflow-hidden py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-5xl text-center font-bold mb-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg animate-gradient">
          Skills & Technologies
        </h2>
        <p className="text-center text-base md:text-lg text-gray-300 mb-8">
          Explore my core skills in frontend, backend, programming languages, tools, and soft skills. All technologies are selected for modern, scalable web development.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {
            skills.map(skill => <Skill key={skill.id} skill={skill} />)
          }
        </div>
      </div>
    </section>
  );
};

export default Skills;
