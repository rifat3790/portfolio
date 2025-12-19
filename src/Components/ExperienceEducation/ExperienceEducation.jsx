import React from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaUserTie,
  FaAward,
} from "react-icons/fa";

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
    type: "experience",
    date: "Oct 15, 2025 - Present",
    title: "Web Developer & Team Leader",
    company: "Softvence Agency",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    duration: "Current",
    teamSize: "10 people team",
    description:
      "Leading a 10-member web development team at Softvence Agency, delivering premium websites and web apps for global clients. Responsible for project architecture, code reviews, and mentoring junior developers. Launched 15+ client projects.",
    responsibilities: [
      "Lead and co-manage a team of 10 developers",
      "Architect scalable web solutions for clients",
      "Conduct code reviews and enforce best practices",
      "Mentor junior developers and interns",
      "Coordinate with designers and project managers",
      "Deliver projects on tight deadlines with high quality",
    ],
    achievements: [
      "Promoted to Team Co-Leader within 2 months",
      "Successfully launched 15+ client projects",
      "Recognized for leadership and technical excellence",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Liquid",
      "Tailwind CSS",
      "Figma",
      "Git",
      "Shopify",
      "Wix",
      "WordPress",
    ],
    highlights: [
      "Team achieved 100% client satisfaction rate",
      "Introduced automated deployment pipelines",
      "Organized internal workshops for skill development",
    ],
  },
  {
    id: 3,
    side: "right",
    type: "experience",
    date: "2025 - Oct 14, 2025",
    title: "Software Developer",
    company: "Sardar IT",
    location: "Mirpur-2, Dhaka, Bangladesh",
    employmentType: "Full-time",
    duration: "3 months",
    teamSize: "5 people team",
    description:
      "Worked as a software developer at Sardar IT, building custom websites and web applications for clients. Collaborated with a team, managed projects, and optimized user experience using modern web technologies.",
    responsibilities: [
      "Develop and manage custom websites for clients",
      "Project management and client communication",
      "Optimize user experience with responsive design and CMS tools",
      "Collaborate with team members for efficient delivery",
      "Implement modern web technologies and frameworks",
      "Maintain code quality and documentation",
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
      "Liquid",
      "Tailwind CSS",
      "Figma",
      "Git",
      "Shopify",
      "Wix",
      "WordPress",
    ],
    highlights: [
      "Only developer invited to client presentation meetings",
      "Personal project featured in company newsletter",
    ],
  },
  {
    id: 4,
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

const ICONS = {
  experience: <FaUserTie className="text-white text-xl" />,
  internship: <FaUsers className="text-white text-xl" />,
  education: <FaAward className="text-white text-xl" />,
};

const AnimatedBg = () => (
  <div className="absolute inset-0 -z-20 overflow-hidden">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      <defs>
        <linearGradient
          id="exp-grad"
          x1="0"
          y1="0"
          x2="1440"
          y2="800"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3b82f6" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <g>
        <ellipse
          cx="300"
          cy="200"
          rx="320"
          ry="120"
          fill="url(#exp-grad)"
          opacity="0.13"
        >
          <animate
            attributeName="cy"
            values="200;250;200"
            dur="7s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="1200"
          cy="600"
          rx="260"
          ry="100"
          fill="url(#exp-grad)"
          opacity="0.1"
        >
          <animate
            attributeName="cy"
            values="600;550;600"
            dur="8s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="800"
          cy="400"
          rx="400"
          ry="180"
          fill="url(#exp-grad)"
          opacity="0.08"
        >
          <animate
            attributeName="rx"
            values="400;350;400"
            dur="9s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>
    </svg>
  </div>
);

const ColumnAnimationBg = () => (
  <div className="absolute inset-0 -z-20 pointer-events-none">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g>
        {/* Animated vertical columns */}
        <rect x="200" width="18" height="800" fill="#3b82f6" opacity="0.1">
          <animate
            attributeName="y"
            values="0;40;0"
            dur="6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="400" width="18" height="800" fill="#06b6d4" opacity="0.1">
          <animate
            attributeName="height"
            values="800;700;800"
            dur="7s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="600" width="18" height="800" fill="#a78bfa" opacity="0.1">
          <animate
            attributeName="y"
            values="0;60;0"
            dur="8s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="800" width="18" height="800" fill="#3b82f6" opacity="0.1">
          <animate
            attributeName="height"
            values="800;600;800"
            dur="6.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="1000" width="18" height="800" fill="#06b6d4" opacity="0.1">
          <animate
            attributeName="y"
            values="0;30;0"
            dur="7.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="1200" width="18" height="800" fill="#a78bfa" opacity="0.1">
          <animate
            attributeName="height"
            values="800;650;800"
            dur="8.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  </div>
);

const ExperienceEducation = () => {
  return (
    <section
      id="education"
      className="relative py-20 bg-gradient-to-br from-[#0a192f] to-[#1e293b] overflow-hidden"
    >
      {/* Animated Column SVG Background */}
      <ColumnAnimationBg />

      {/* Decorative blurred circles */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-900 rounded-full opacity-20 blur-2xl animate-pulse -z-10" />
      <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-purple-900 rounded-full opacity-20 blur-2xl animate-pulse -z-10" />

      <div className="container mx-auto max-w-[1250px] px-4 md:px-2 lg:px-0 animate-fadeInUp">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-2 animate-gradient">
            Experience & Education
          </h2>
          <p className="text-lg text-blue-200 mb-2">
            My journey to achieve development, from education to professional
            experience, advocating continuous learning and growth in this field.
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col items-center">
          {/* Cards Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
            style={{ rowGap: "30px" }}
          >
            {timelineData.map((item, idx) => (
              <div
                key={item.id}
                className="relative flex flex-col items-center md:items-stretch"
              >
                {/* Card */}
                <div className="w-full h-full bg-gradient-to-br from-[#1e293b] to-[#0a192f] backdrop-blur-lg p-7 rounded-2xl shadow-2xl border border-blue-900 relative z-10 transition-all duration-300 hover:scale-[1.03] hover:shadow-3xl flex flex-col min-h-[340px]">
                  {/* Icon inside card, centered above content */}
                  <div className="flex justify-center mb-3">
                    <div
                      className={`w-12 h-12 rounded-full border-4 border-blue-400 flex items-center justify-center shadow-lg
                        ${
                          item.type === "experience"
                            ? "bg-blue-500 animate-pulse"
                            : item.type === "internship"
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-green-500"
                        }`}
                    >
                      {ICONS[item.type]}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                    <span className="text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-lg shadow">
                      {item.date}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-md shadow ${
                        item.type === "experience"
                          ? "bg-blue-600 text-white"
                          : item.type === "internship"
                          ? "bg-yellow-600 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
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
                      <span className="font-bold text-green-400">
                        {item.cgpa}
                      </span>
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
                  <p className="text-sm text-slate-300 mb-2">
                    {item.description}
                  </p>

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
                      <span className="text-xs font-bold text-blue-300">
                        Projects:
                      </span>
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
        @media (max-width: 1024px) {
          .grid-cols-2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .rounded-2xl { border-radius: 1rem !important; }
          .p-7 { padding: 1rem !important; }
          .mb-12 { margin-bottom: 2rem !important; }
        }
      `}</style>
    </section>
  );
};

export default ExperienceEducation;
