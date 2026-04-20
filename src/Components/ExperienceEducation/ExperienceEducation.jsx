import React, { useEffect, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaUserTie,
  FaAward,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaStar,
  FaRocket,
} from "react-icons/fa";

// Timeline items data (same as original)
const timelineData = [
  {
    id: 1,
    type: "education",
    date: "2022 - Present",
    title: "B.Sc. in Computer Science and Engineering",
    company: "Green University of Bangladesh",
    location: "Narayanganj, Bangladesh",
    duration: "Final Year",
    cgpa: "3.75/4.00",
    expectedGraduation: "February 2025",
    description:
      "Currently pursuing Bachelor's degree in Computer Science and Engineering with a focus on software development, algorithms, and data structures.",
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
      "Integrated Healthcare Support System - IHSS",
      "Student Management System",
      "Chat Application",
      "Algorithm Visualizer",
    ],
  },
  {
    id: 2,
    type: "experience",
    date: "Oct 15, 2025 - Present",
    title: "Web Developer & Team Leader",
    company: "Softvence Agency",
    location: "Dhaka, Bangladesh",
    duration: "Current",
    teamSize: "10 people team",
    description:
      "Leading a 10-member web development team at Softvence Agency, delivering premium websites and web apps for global clients.",
    responsibilities: [
      "Lead and co-manage a team of 10 developers",
      "Architect scalable web solutions",
      "Conduct code reviews and enforce best practices",
      "Mentor junior developers and interns",
      "Coordinate with designers and project managers",
      "Deliver projects on tight deadlines",
    ],
    achievements: [
      "Promoted to Team Co-Leader within 2 months",
      "Successfully launched 15+ client projects",
      "Recognized for leadership and technical excellence",
    ],
    technologies: [
      "HTML", "CSS", "JavaScript", "Liquid", "Tailwind CSS",
      "Figma", "Git", "Shopify", "Wix", "WordPress",
    ],
    highlights: [
      "Team achieved 100% client satisfaction rate",
      "Introduced automated deployment pipelines",
      "Organized internal workshops",
    ],
  },
  {
    id: 3,
    type: "experience",
    date: "2025 - Oct 14, 2025",
    title: "Software Developer",
    company: "Sardar IT",
    location: "Mirpur-2, Dhaka, Bangladesh",
    duration: "3 months",
    teamSize: "5 people team",
    description:
      "Worked as a software developer at Sardar IT, building custom websites and web applications for clients.",
    responsibilities: [
      "Develop and manage custom websites",
      "Project management and client communication",
      "Optimize user experience with responsive design",
      "Collaborate with team members",
      "Implement modern web technologies",
      "Maintain code quality",
    ],
    achievements: [
      "Completed all projects ahead of schedule",
      "Offered full-time position after graduation",
      "Built personal portfolio that impressed seniors",
    ],
    technologies: [
      "HTML", "CSS", "JavaScript", "Liquid", "Tailwind CSS",
      "Figma", "Git", "Shopify", "Wix", "WordPress",
    ],
    highlights: [
      "Only developer invited to client presentation meetings",
      "Personal project featured in company newsletter",
    ],
  },
  {
    id: 4,
    type: "experience",
    date: "2023 - 2024",
    title: "Frontend Developer",
    company: "Self",
    location: "Narayanganj, Bangladesh",
    duration: "1 year",
    teamSize: "Solo and Team",
    description:
      "Worked as a junior frontend developer, creating responsive websites and web applications.",
    responsibilities: [
      "Developed 10+ responsive websites",
      "Collaborated with a team of 5 developers and designers",
      "Implemented modern CSS frameworks",
      "Maintained and updated existing client websites",
      "Participated in code reviews",
      "Optimized website performance (30% load time reduction)",
    ],
    achievements: [
      "Fastest learning curve in the team",
      "Received outstanding performance evaluation",
      "Implemented responsive design system used across 8+ projects",
    ],
    technologies: [
      "HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery", "Sass", "Git", "Figma",
    ],
    highlights: [
      "Promoted to lead developer on 1 major project",
      "Reduced team's average development time by 25%",
      "Created reusable component library",
    ],
  },
];

// ========== Enhanced 3D Background ==========
const ThreeBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initThree = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      scene.background = null;
      scene.fog = new THREE.FogExp2(0x0a0a2a, 0.012);

      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
      camera.position.set(0, 1.5, 14);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Lighting
      const ambient = new THREE.AmbientLight(0x404060, 0.8);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(3, 4, 5);
      const backLight = new THREE.PointLight(0x3b82f6, 0.6);
      backLight.position.set(-2, 1, -5);
      const fillLight = new THREE.PointLight(0x8b5cf6, 0.5);
      fillLight.position.set(2, 2, 3);
      scene.add(ambient, dirLight, backLight, fillLight);

      // Main group
      const group = new THREE.Group();

      // Central glowing torus knot
      const knotGeo = new THREE.TorusKnotGeometry(1.3, 0.15, 200, 32, 3, 4);
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.2,
      });
      const knot = new THREE.Mesh(knotGeo, knotMat);
      group.add(knot);

      // Floating particles (sphere cloud)
      const particleCount = 2500;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const radius = 2.2 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        const color = new THREE.Color().setHSL(0.55 + Math.random() * 0.2, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      group.add(particles);

      // Rotating rings
      const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 64, 400);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x6d28d9,
        emissiveIntensity: 0.4,
      });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.rotation.x = Math.PI / 2;
      group.add(ring1);
      
      const ring2 = new THREE.Mesh(ringGeo, ringMat);
      ring2.rotation.z = Math.PI / 3;
      ring2.rotation.x = Math.PI / 3;
      group.add(ring2);

      scene.add(group);

      let time = 0;
      let animId;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        time += 0.008;
        
        group.rotation.y = time * 0.1;
        group.rotation.x = Math.sin(time * 0.2) * 0.1;
        knot.rotation.x = time * 0.5;
        knot.rotation.y = time * 0.3;
        particles.rotation.y = time * 0.05;
        particles.rotation.x = time * 0.03;
        ring1.rotation.z = time * 0.15;
        ring2.rotation.x = time * 0.2;
        
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
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
        if (container && renderer.domElement) container.removeChild(renderer.domElement);
      };
    };

    const cleanupPromise = initThree();
    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ opacity: 0.6 }} />;
};

// ========== Main Component ==========
const ExperienceEducation = () => {
  return (
    <section
      id="education"
      className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 overflow-hidden"
    >
      {/* 3D Background */}
      <ThreeBackground />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

      {/* Floating glow orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse animation-delay-2000" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-2">
            <span className="text-sm font-mono tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
              ✦ My Journey ✦
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg animate-gradient">
            Experience & Education
          </h2>
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto mt-4">
            A timeline of my academic achievements and professional growth in the world of development.
          </p>
        </div>

        {/* Cards Grid - Clean 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {timelineData.map((item, idx) => (
            <div
              key={item.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: "both" }}
            >
              <div className="group h-full">
                {/* Premium Card */}
                <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-blue-500/20 hover:border-blue-500/40 h-full flex flex-col">
                  
                  {/* Header with icon and badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                        item.type === "education" 
                          ? "bg-gradient-to-br from-emerald-500 to-teal-500" 
                          : "bg-gradient-to-br from-blue-500 to-indigo-500"
                      }`}>
                        {item.type === "education" ? (
                          <FaGraduationCap className="text-white text-2xl" />
                        ) : (
                          <FaBriefcase className="text-white text-2xl" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <p className="text-sm text-blue-300">{item.company}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-blue-600/40 text-blue-200 px-3 py-1.5 rounded-full border border-blue-500/40 backdrop-blur-sm whitespace-nowrap ml-2">
                      {item.date}
                    </span>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5 text-sm text-blue-200/80">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-400 text-xs" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-blue-400 text-xs" />
                      <span>{item.duration || item.expectedGraduation}</span>
                    </div>
                    {item.teamSize && (
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-blue-400 text-xs" />
                        <span>{item.teamSize}</span>
                      </div>
                    )}
                    {item.cgpa && (
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span>CGPA: <span className="font-bold text-yellow-300">{item.cgpa}</span></span>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-300 text-sm mb-5 leading-relaxed">{item.description}</p>

                  {/* Responsibilities */}
                  {item.responsibilities && (
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <FaCode className="text-blue-400" /> Key Responsibilities
                      </h4>
                      <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                        {item.responsibilities.slice(0, 4).map((res, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400">▹</span> {res}
                          </li>
                        ))}
                        {item.responsibilities.length > 4 && (
                          <li className="text-blue-400 text-xs">+{item.responsibilities.length - 4} more</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Achievements */}
                  {item.achievements && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.achievements.map((ach, i) => (
                        <span key={i} className="bg-blue-500/20 text-blue-200 text-xs px-3 py-1.5 rounded-full border border-blue-500/30">
                          🏆 {ach}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  {item.technologies && (
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.slice(0, 6).map((tech, i) => (
                          <span key={i} className="bg-slate-700/80 text-blue-200 text-xs px-3 py-1.5 rounded-md border border-slate-600">
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 6 && (
                          <span className="text-xs text-blue-400">+{item.technologies.length - 6}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  {item.highlights && (
                    <div className="mt-auto pt-4 border-t border-slate-700/50">
                      <p className="text-xs text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                        <FaRocket /> Highlights
                      </p>
                      <ul className="text-xs text-emerald-300/80 list-disc pl-4 space-y-1">
                        {item.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Projects (education) */}
                  {item.projects && (
                    <div className="mt-auto pt-4 border-t border-slate-700/50">
                      <p className="text-xs text-purple-400 font-semibold mb-2 flex items-center gap-2">
                        📌 Key Projects
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.projects.map((p, i) => (
                          <span key={i} className="bg-purple-500/20 text-purple-200 text-xs px-3 py-1.5 rounded-full border border-purple-500/30">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        .animate-pulse {
          animation: pulse 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default ExperienceEducation;