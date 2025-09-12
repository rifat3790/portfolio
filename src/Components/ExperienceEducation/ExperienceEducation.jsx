import React from "react";
import { FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";

// Timeline items data
const timelineData = [
	{
		id: 1,
		side: "left",
		type: "experience",
		date: "2022 - Present",
		title: "Full Stack Developer",
		company: "Freelance / Independent Contractor",
		location: "Remote, Bangladesh",
		employmentType: "Freelance",
		duration: "2+ years",
		teamSize: "Solo projects",
		description:
			"Developing modern web applications for various clients, focusing on React, Next.js, and Node.js technologies. Delivering high-quality, scalable solutions that meet client requirements and exceed expectations.",
		responsibilities: [
			"Successfully delivered 15+ projects with 98% client satisfaction",
			"Built responsive web applications using React, Next.js, and TypeScript",
			"Developed secure backend APIs with Node.js and Express.js",
			"Implemented database solutions using MySQL, Firebase, and MongoDB",
			"Collaborated with international clients across different time zones",
			"Improved application performance by 40% on average through optimization",
		],
		achievements: [
			"Zero critical bugs in production across all projects",
			"100% on-time project delivery record",
			"4 client referrals received based on work quality",
			"Built scalable solutions handling 1000+ concurrent users",
			"Implemented secure payment integrations and authentication systems",
		],
		technologies: [
			"React",
			"Next.js",
			"Node.js",
			"TypeScript",
			"MySQL",
			"Firebase",
			"MongoDB",
			"Tailwind CSS",
			"Express.js",
			"Git",
		],
		highlights: [
			"Featured project reached 10K+ users in first month",
			"Client project increased their revenue by 35%",
			"Mentored 2 junior developers remotely",
		],
	},
	{
		id: 2,
		side: "right",
		type: "experience",
		date: "2021 - 2022",
		title: "Frontend Developer",
		company: "Local Web Agency",
		location: "Narayanganj, Bangladesh",
		employmentType: "Part-time",
		duration: "8 months",
		teamSize: "5 people team",
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
			"Led 3 client projects independently",
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
			"Promoted to lead developer on 2 major projects",
			"Reduced team's average development time by 25%",
			"Created reusable component library for team",
		],
	},
	{
		id: 3,
		side: "left",
		type: "internship",
		date: "2020 - 2021",
		title: "Web Development Intern",
		company: "Tech Startup",
		location: "Dhaka, Bangladesh",
		employmentType: "Internship",
		duration: "6 months",
		teamSize: "8 people team",
		description:
			"Summer internship focused on learning modern web development practices. Worked on real projects under senior developer mentorship, gaining hands-on experience with industry-standard tools and workflows.",
		responsibilities: [
			"Learned modern web development practices under senior mentorship",
			"Built 3 complete web applications from scratch",
			"Participated in agile development processes and daily standups",
			"Contributed to real client projects as team member",
			"Learned version control with Git and collaborative development",
			"Implemented responsive designs for mobile and desktop",
		],
		achievements: [
			"Completed all assigned projects ahead of schedule",
			"Received outstanding intern evaluation (9.5/10)",
			"Offered full-time position after graduation",
			"Contributed to 2 production client projects",
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
		],
		highlights: [
			"Only intern invited to client presentation meetings",
			"Personal project featured in company newsletter",
			"Received mentorship award from senior developers",
		],
	},
	{
		id: 4,
		side: "right",
		type: "education",
		date: "2020 - Present",
		title: "B.Sc. in Computer Science and Engineering",
		company: "Green University of Bangladesh",
		location: "Dhaka, Bangladesh",
		employmentType: "Student",
		duration: "Final Year",
		cgpa: "3.75/4.00",
		expectedGraduation: "December 2024",
		description:
			"Currently pursuing Bachelor's degree in Computer Science and Engineering with a focus on software development, algorithms, and data structures. Maintaining excellent academic performance while working on practical projects.",
		responsibilities: [
			"Data Structures and Algorithms (A+)",
			"Software Engineering Principles (A)",
			"Database Management Systems (A+)",
			"Web Technologies and Frameworks (A+)",
			"Object-Oriented Programming (A)",
			"Computer Networks and Security (A-)",
		],
		achievements: [
			"Maintained CGPA of 3.75/4.00 throughout program",
			"Dean's List for 3 consecutive semesters",
			"Led university web development club activities",
			"Won first place in university coding competition 2023",
			"Published research paper on web performance optimization",
			"Completed advanced courses in Data Structures and Algorithms",
		],
		projects: [
			"E-commerce Platform (Final Year Project)",
			"Student Management System (Database Course)",
			"Chat Application (Web Technologies Course)",
			"Algorithm Visualizer (Data Structures Course)",
		],
		highlights: [
			"Top 5% of graduating class",
			"Student representative for Computer Science department",
			"Organized 3 technical workshops for junior students",
		],
	},
];

const ExperienceEducation = () => {
	return (
		<section className="relative py-20 bg-gradient-to-br from-[#0a192f] to-[#1e293b] overflow-hidden">
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
						My journey to achieve development, from education to professional
						experience, advocating continuous learning and growth in this field.
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
                ${item.side === "left" ? "md:justify-start" : "md:justify-end"}
              `}
						>
							{/* Timeline Dot */}
							<div className="absolute left-1/2 -translate-x-1/2 z-10 md:static md:translate-x-0 md:left-0 flex items-center justify-center">
								<div
									className={`w-6 h-6 rounded-full border-4 border-blue-400
                    ${
											item.type === "experience"
												? "bg-blue-500 animate-pulse"
												: "bg-green-500"
										}
                  `}
								/>
							</div>

							{/* Card */}
							<div
								className={`w-full md:w-[420px] bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl relative z-10
                  ${
											item.side === "left"
												? "md:mr-auto md:ml-0"
												: "md:ml-auto md:mr-0"
										}
                  animate-fadeInUp
                `}
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
								<p className="text-sm text-blue-300 mb-1">
									{item.company}
								</p>
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
