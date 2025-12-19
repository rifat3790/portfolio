import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaGlobe, FaCalendarAlt, FaReact, FaServer, FaDatabase, FaPalette } from 'react-icons/fa';

const About = () => {
  return (
    <section id='about' className="relative bg-gradient-to-br from-[#0a192f] to-[#1e293b] text-white py-20 flex items-center justify-center overflow-hidden">
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-900 rounded-full opacity-20 blur-2xl animate-pulse -z-10" />
      <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-purple-900 rounded-full opacity-20 blur-2xl animate-pulse -z-10" />

      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch justify-center">
          <div className="flex-1 h-full space-y-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-2 animate-gradient">
              About Me
            </h2>
            <p className="text-lg text-blue-200 text-center font-medium mb-6 animate-fadeIn">
              I'm a passionate developer with <span className="font-bold text-blue-400">2+ years</span> of experience creating digital solutions that make a difference.
            </p>
            <div className="space-y-4 text-base text-slate-200 leading-relaxed font-medium">
              <p>
                Passionate and detail-focused Full Stack Developer with experience in developing responsive and interactive web applications using <span className="text-blue-400 font-semibold">HTML, CSS, JavaScript, React, Next.js, Node.js</span>.
              </p>
              <p>
                Skilled in designing modern UI with <span className="text-purple-400 font-semibold">Tailwind CSS</span> and DaisyUI, managing databases using <span className="text-blue-300 font-semibold">MySQL</span>, and implementing secure authentication systems with <span className="text-blue-400 font-semibold">bcrypt</span>.
              </p>
              <p>
                Quick to learn new technologies and committed to continuous skill development. Currently pursuing <span className="text-blue-400 font-semibold">B.Sc. in Computer Science</span> at Green University of Bangladesh with a CGPA of <span className="text-purple-400 font-semibold">3.75</span>.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 mt-6 items-center justify-center">
              <div className="flex items-center gap-2 text-blue-400">
                <FaMapMarkerAlt />
                <span className="font-semibold">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <FaCalendarAlt />
                <span className="font-semibold">Available for new opportunities</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fadeInRight">
              <h3 className="text-xl font-bold text-blue-300 mb-4 text-center">Personal Details</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 hover:scale-105 transition-transform">
                  <FaBriefcase className="text-blue-400" />
                  <div>
                    <p className="text-xs text-blue-200 uppercase">Experience</p>
                    <p className="font-semibold text-white">2+ Years</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 hover:scale-105 transition-transform">
                  <FaGraduationCap className="text-purple-400" />
                  <div>
                    <p className="text-xs text-blue-200 uppercase">Education</p>
                    <p className="font-semibold text-white">Computer Science Graduate</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 hover:scale-105 transition-transform">
                  <FaGlobe className="text-blue-400" />
                  <div>
                    <p className="text-xs text-blue-200 uppercase">Languages</p>
                    <p className="font-semibold text-white">Bengali (Native), English (Fluent)</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 hover:scale-105 transition-transform">
                  <FaCalendarAlt className="text-blue-400" />
                  <div>
                    <p className="text-xs text-blue-200 uppercase">Availability</p>
                    <p className="font-semibold text-white">Open to opportunities</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fadeInRight">
              <h3 className="text-xl font-bold text-blue-300 mb-4 text-center">Core Competencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 w-full">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold shadow hover:scale-105 transition-transform">
                  <FaReact /> Frontend Development
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 text-white font-semibold shadow hover:scale-105 transition-transform">
                  <FaServer /> Backend Development
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition-transform">
                  <FaDatabase /> Database Design
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-400 text-white font-semibold shadow hover:scale-105 transition-transform">
                  <FaPalette /> UI/UX Design
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(.6,.2,.2,1);
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s cubic-bezier(.6,.2,.2,1);
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

export default About;