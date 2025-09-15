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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-5xl text-center font-bold my-10">Skills & Technologies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {
          skills.map(skill => <Skill key={skill.id} skill={skill} />)
        }
      </div>
    </div>
  );
};

export default Skills;
