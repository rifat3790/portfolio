import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaGlobe, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 max-w-screen-xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Introduction */}
          <div className="max-w-xs">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              MD. REFAYET HOSSEN
            </h2>
            <p className="text-sm text-slate-400 mb-4">Full Stack Developer</p>
            <p className="text-xs text-white/70 mb-6">
              Passionate about creating modern web applications that deliver exceptional user experiences. Specializing in React, Next.js, and Node.js development.
            </p>
            <p className="text-xs text-white/70 mb-2">📍 Narayanganj, Bangladesh</p>
            <p className="text-xs text-white/70 mb-2">🟢 Available for projects</p>
            <p className="text-xs text-white/70">⚡ Responds within 4 hours</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 underline underline-offset-4">Quick Links</h3>
            <ul>
              {["Home", "About Me", "Skills", "Projects", "Experience", "Testimonials", "Contact", "Blog"].map((link) => (
                <li key={link} className="mb-2">
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-white/80 hover:text-primary transition-all flex items-center gap-2">
                    {link}
                    <span className="inline-block transform transition-transform hover:translate-x-2">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services & Tech Stack</h3>
            <ul className="space-y-2">
              {[
                "🌐 Web Development",
                "⚛️ React Applications",
                "🚀 Next.js Projects",
                "🔧 API Development",
                "💾 Database Design",
                "🎨 UI/UX Implementation",
                "📱 Responsive Design",
                "⚡ Performance Optimization",
              ].map((service) => (
                <li key={service} className="text-sm text-white/80">{service}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {["React", "Next.js", "Node.js", "TypeScript", "MySQL", "MongoDB", "Tailwind CSS", "Git"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm text-white/80 border-2 border-white/40 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              {/* Email */}
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <a href="mailto:mdrifayethossen@gmail.com" className="text-white/80 hover:text-primary transition-all">mdrifayethossen@gmail.com</a>
              </li>
              {/* Phone */}
              <li className="flex items-center gap-2">
                <FaPhone className="text-green-500" />
                <a href="tel:+8801952321390" className="text-white/80 hover:text-primary transition-all">+880 1952-321390</a>
              </li>
              {/* Location */}
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span className="text-white/80">Narayanganj, Bangladesh</span>
              </li>
              {/* Social Media */}
              <li>
                <div className="flex space-x-4">
                  {[FaLinkedin, FaGithub, FaTwitter, FaInstagram].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      target="_blank"
                      className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:text-primary hover:bg-white/20 transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Secondary Links Bar */}
        <div className="border-t-2 border-white/10 py-6 mb-8">
          <div className="flex justify-between items-center text-xs text-white/60">
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Sitemap</a>
              <a href="#" className="hover:text-primary">RSS Feed</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">Download Resume</a>
              <a href="#" className="hover:text-primary">View Portfolio</a>
              <a href="#" className="hover:text-primary">Schedule Call</a>
              <a href="#" className="hover:text-primary">Send Message</a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="bg-slate-900 py-4 text-center text-xs text-white/60">
          <p>© 2024 MD. Refayet Hossen. All rights reserved.</p>
          <p className="mt-2">Built with ❤️ using Next.js and Tailwind CSS</p>
          <div className="mt-4">
            <a href="https://nextjs.org/" className="hover:text-primary">Made with Next.js</a> | 
            <a href="https://vercel.com/" className="hover:text-primary"> Hosted on Vercel</a> | 
            <a href="https://github.com/mdrifayethossen/portfolio" className="hover:text-primary"> Source Code</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
