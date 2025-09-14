import React from "react";
import { FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";

// Timeline items data
const timelineData = [
  {
    id: 1,
    side: "left",
    type: "education",
    date: "2022 - Present",
    title: "B.Sc. in Computer Science and Engineering",
    company: "Green University of Bangladesh",
    location: "Narayanganj, Bangladesh",
    employmentType: "Student",
    duration: "Final Year",
    cgpa: "3.75/4.00",
    expectedGraduation: "February 2025",
    description:
      "Currently pursuing Bachelor's degree in Computer Science and Engineering with a focus on software development, algorithms, and data structures. Maintaining excellent academic performance while working on practical projects.",
    responsibilities: [
      "Data Structures and Algorithms (A+)",
      "Software Engineering Principles (A)",
      "Database Management Systems (A+)",
      "Web Technologies and Frameworks (A+)",
      "Object-Oriented Programming (A)",
      "Computer Networks and Security (A+)",
    ],
    achievements: [
      "Maintained CGPA of 3.75/4.00 throughout program",
      "Dean's List for 2 consecutive semesters",
      "VC's List for 1 consecutive semesters",
    ],
    projects: [
      "Integrated Healthcare Support System - IHSS (IDP Project)",
      "Student Management System (Database Course)",
      "Chat Application (Web Technologies Course)",
      "Algorithm Visualizer (Data Structures Course)",
    ],
  },

  {
    id: 2,
    side: "right",
    type: "internship",
    date: "2025 - Present",
    title: "Software Developer",
    company: "Sardar IT",
    location: "Mirpur-2, Dhaka, Bangladesh",
    employmentType: "Internship",
    duration: "3 months",
    teamSize: "5 people team",
    description:
      "Summer internship focused on learning modern web development practices. Worked on real projects under senior developer mentorship, gaining hands-on experience with industry-standard tools and workflows.",
    responsibilities: [
      "Learned modern web development practices under senior mentorship",
      "Built 10 complete web applications from scratch",
      "Participated in agile development processes and daily standups",
      "Contributed to real client projects as team member",
      "Learned version control with Git and collaborative development",
      "Implemented responsive designs for mobile and desktop",
    ],
    achievements: [
      "Completed all assigned projects ahead of schedule",
      "Offered full-time position after graduation",
      "Built personal portfolio that impressed senior developers",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "Figma",
      "VS Code",
      "Shopify",
      "WordPress",
      "Wix",
    ],
    highlights: [
      "Only intern invited to client presentation meetings",
      "Personal project featured in company newsletter",
    ],
  },

  {
    id: 3,
    side: "left",
    type: "experience",
    date: "2023 - 2024",
    title: "Frontend Developer",
    company: "Self",
    location: "Narayanganj, Bangladesh",
    employmentType: "Part-time",
    duration: "1 year",
    teamSize: "Solo and Team",
    description:
      "Worked as a junior frontend developer, creating responsive websites and web applications. Collaborated with designers and backend developers to deliver pixel-perfect user interfaces.",
    responsibilities: [
      "Developed 10+ responsive websites using HTML, CSS, and JavaScript",
      "Collaborated with a team of 5 developers and designers",
      "Implemented modern CSS frameworks and JavaScript libraries",
      "Maintained and updated existing client websites",
      "Participated in code reviews and agile development processes",
      "Optimized website performance and reduced page load times by 30%",
    ],
    achievements: [
      "Fastest learning curve in the team",
      "Received outstanding performance evaluation",
      "Implemented responsive design system used across 8+ projects",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "Sass",
      "Git",
      "Figma",
    ],
    highlights: [
      "Promoted to lead developer on 1 major projects",
      "Reduced team's average development time by 25%",
      "Created reusable component library for team",
    ],
  },
];

const ExperienceEducation = () => {
  return (
    <section id="education" className="relative py-20 bg-gradient-to-br from-[#0a192f] to-[#1e293b] overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-900 rounded-full opacity-20 blur-2xl animate-pulse -z-10" />
      <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-purple-900 rounded-full opacity-20 blur-2xl animate-pulse -z-10" />

      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-2 animate-gradient">
            Experience & Education
          </h2>
          <p className="text-lg text-blue-200 mb-2">
            My journey to achieve development, from education to professional experience, advocating continuous learning and growth in this field.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col items-center">
          {/* Central Spine */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-400 h-full z-0" />

          {/* Timeline Items */}
          {timelineData.map((item, idx) => (
            <div
              key={item.id}
              className={`relative w-full flex flex-col md:flex-row items-center mb-16
                ${item.side === "left" ? "md:justify-start" : "md:justify-end"}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10 md:static md:translate-x-0 md:left-0 flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-full border-4 border-blue-400
                    ${item.type === "experience"
                      ? "bg-blue-500 animate-pulse"
                      : "bg-green-500"}`}
                />
              </div>

              {/* Card */}
              <div
                className={`w-full md:w-[420px] bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl relative z-10
                  ${item.side === "left" ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"}
                  animate-fadeInUp`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-lg shadow">
                    {item.date}
                  </span>
                  {item.type === "experience" && (
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md shadow">
                      {item.employmentType}
                    </span>
                  )}
                  {item.type === "education" && (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-md shadow">
                      Education
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-blue-300 mb-1">{item.company}</p>
                <p className="text-xs text-blue-200 flex items-center gap-2 mb-1">
                  <FaMapMarkerAlt /> {item.location}
                </p>
                {item.duration && (
                  <p className="text-xs text-blue-200 flex items-center gap-2 mb-1">
                    <FaClock /> {item.duration}
                  </p>
                )}
                {item.teamSize && (
                  <p className="text-xs text-blue-200 flex items-center gap-2 mb-1">
                    <FaUsers /> {item.teamSize}
                  </p>
                )}
                {item.cgpa && (
                  <p className="text-xs text-blue-200 mb-1">
                    CGPA:{" "}
                    <span className="font-bold text-green-400">{item.cgpa}</span>
                  </p>
                )}
                {item.expectedGraduation && (
                  <p className="text-xs text-blue-200 mb-1">
                    Expected Graduation:{" "}
                    <span className="font-bold text-blue-400">
                      {item.expectedGraduation}
                    </span>
                  </p>
                )}
                <p className="text-sm text-slate-300 mb-2">{item.description}</p>

                {/* Responsibilities */}
                {item.responsibilities && (
                  <ul className="list-disc pl-5 text-blue-200 mb-2 text-xs">
                    {item.responsibilities.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                )}

                {/* Achievements */}
                {item.achievements && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.achievements.map((ach, i) => (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-lg text-xs shadow"
                      >
                        {ach}
                      </span>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                {item.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-blue-400 text-white text-xs px-2 py-1 rounded-lg shadow"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Highlights */}
                {item.highlights && (
                  <ul className="mt-4 text-xs text-green-300 list-disc pl-5">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}

                {/* Projects (for education) */}
                {item.projects && (
                  <div className="mt-4">
                    <span className="text-xs font-bold text-blue-300">Projects:</span>
                    <ul className="list-disc pl-5 text-blue-200 text-xs">
                      {item.projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(.6,.2,.2,1);
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
    </section>
  );
};

export default ExperienceEducation;
