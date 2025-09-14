import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    projectDetails: "",
    communication: "Email",
    subscribe: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is not valid";
    if (!formData.projectDetails || formData.projectDetails.length < 20)
      errors.projectDetails = "Project details should be at least 20 characters";
    return errors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setFormStatus("Submitting...");
      // Simulate form submission
      setTimeout(() => {
        setFormStatus("Message sent successfully!");
        setIsSubmitting(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          projectDetails: "",
          communication: "Email",
          subscribe: false,
        });
      }, 2000);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#0a192f] to-[#1e293b] text-white min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-2 animate-gradient">
            Get In Touch
          </h2>
          <p className="text-lg text-blue-200 mb-2">
            I'm always interested in new opportunities and exciting projects. Let's connect!
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fadeInUp flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Let's work together</h3>
              <p className="text-base text-blue-200 mb-6">
                Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400" />
                  <span className="text-white font-medium">mdrifayethossen@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-blue-400" />
                  <span className="text-white font-medium">01952321390</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span className="text-white font-medium">Narayanganj, Bangladesh</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-blue-300 font-semibold hover:bg-blue-600 hover:text-white transition-all">
                <FaGithub /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-blue-300 font-semibold hover:bg-blue-600 hover:text-white transition-all">
                <FaLinkedin /> LinkedIn
              </a>
              <a href="mailto:mdrifayethossen@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-blue-300 font-semibold hover:bg-blue-600 hover:text-white transition-all">
                <FaEnvelope /> Email
              </a>
              <a href="tel:01952321390"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-blue-300 font-semibold hover:bg-blue-600 hover:text-white transition-all">
                <FaPhone /> Phone
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fadeInUp">
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-blue-300">
                  <FaEnvelope /> mdrifayethossen@gmail.com
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-blue-300">
                  <FaPhone /> 01952321390
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-blue-300">
                  <FaMapMarkerAlt /> Narayanganj, Bangladesh
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mt-6 mb-2">Send me a message</h3>
              <p className="text-sm text-blue-200 mb-2">
                I'll get back to you within 24-48 hours.<span className="ml-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs">Demo Mode</span>
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="text-sm text-blue-200">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full p-3 mt-2 bg-white/10 rounded-lg text-white placeholder-blue-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                  {formErrors.firstName && <p className="text-red-500 text-xs">{formErrors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm text-blue-200">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full p-3 mt-2 bg-white/10 rounded-lg text-white placeholder-blue-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                  {formErrors.lastName && <p className="text-red-500 text-xs">{formErrors.lastName}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="text-sm text-blue-200">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 mt-2 bg-white/10 rounded-lg text-white placeholder-blue-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
                {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
              </div>
              <div className="mt-4">
                <label htmlFor="projectDetails" className="text-sm text-blue-200">Message *</label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows="5"
                  className="w-full p-3 mt-2 bg-white/10 rounded-lg text-white placeholder-blue-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Tell me about your project, questions, or how I can help you..."
                />
                {formErrors.projectDetails && <p className="text-red-500 text-xs">{formErrors.projectDetails}</p>}
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  <FaPaperPlane />
                  {isSubmitting ? "Sending your message..." : "Send Message (Demo Mode)"}
                </button>
                {formStatus && <p className="mt-4 text-green-500">{formStatus}</p>}
              </div>
              <p className="mt-2 text-xs text-blue-300">
                Please provide as much detail as possible about your project or inquiry.
              </p>
            </form>
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
      `}</style>
    </section>
  );
};

export default GetInTouch;
