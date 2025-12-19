import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectDetails: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("c_JLvP-qzJR8YwMC4");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is not valid";
    if (!formData.projectDetails || formData.projectDetails.length < 20)
      errors.projectDetails =
        "Project details should be at least 20 characters";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setFormStatus("Submitting...");
      setFormErrors({});

      try {
        const templateParams = {
          to_email: "mdrifayethossen@gmail.com",
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone_number: formData.phone || "Not provided",
          message: formData.projectDetails,
          reply_to: formData.email,
        };

        const response = await emailjs.send(
          "service_qd7wyne",
          "template_x9vn5jf",
          templateParams
        );

        if (response.status === 200) {
          setFormStatus(
            "✓ Message sent successfully! I'll get back to you soon."
          );
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            projectDetails: "",
          });
          setFormErrors({});

          setTimeout(() => setFormStatus(""), 5000);
        }
      } catch (error) {
        console.error("EmailJS error:", error);
        setFormStatus(
          "⚠ Failed to send. Please email directly: mdrifayethossen@gmail.com"
        );
        setTimeout(() => setFormStatus(""), 5000);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-[#0a192f] to-[#1e293b] text-white min-h-screen"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-2 animate-gradient">
            Get In Touch
          </h2>
          <p className="text-lg text-blue-200 mb-2">
            I'm always interested in new opportunities and exciting projects.
            Let's connect!
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fadeInUp flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-4">
                Let's work together
              </h3>
              <p className="text-base text-blue-200 mb-6">
                Whether you have a project in mind, want to collaborate, or just
                want to say hello, I'd love to hear from you.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400 flex-shrink-0" />
                  <span className="text-white font-medium break-all">
                    mdrifayethossen@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-blue-400 flex-shrink-0" />
                  <span className="text-white font-medium">01952321390</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />
                  <span className="text-white font-medium">
                    Dhaka, Mohakhali, Bangladesh
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://github.com/rifat3790"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-blue-300 font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/md-refayet-hossen-62b796236"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-blue-300 font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="mailto:mdrifayethossen@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-blue-300 font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaEnvelope /> Email
              </a>
              <a
                href="tel:01952321390"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-blue-300 font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaPhone /> Phone
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fadeInUp flex flex-col h-full">
            <h3 className="text-lg font-bold text-white mb-4">
              Send me a message
            </h3>
            <p className="text-sm text-blue-200 mb-6">
              I'll get back to you within 24-48 hours.
            </p>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="text-sm text-blue-200">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full p-3 mt-2 bg-white/10 rounded-lg text-white placeholder-blue-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    disabled={isSubmitting}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm text-blue-200">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full p-3 mt-2 bg-white/10 rounded-lg text-white placeholder-blue-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    disabled={isSubmitting}
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="text-sm text-blue-200">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 mt-2 bg-white/10 rounded-lg text-white placeholder-blue-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label htmlFor="phone" className="text-sm text-blue-200">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-3 mt-2 bg-white/10 rounded-lg text-white placeholder-blue-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                />
              </div>
              <div className="mt-4 flex-1 flex flex-col">
                <label
                  htmlFor="projectDetails"
                  className="text-sm text-blue-200"
                >
                  Message *
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows="5"
                  className="w-full p-3 mt-2 bg-white/10 rounded-lg text-white placeholder-blue-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none flex-1"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Tell me about your project, questions, or how I can help you..."
                  disabled={isSubmitting}
                />
                {formErrors.projectDetails && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.projectDetails}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <FaPaperPlane />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {formStatus && (
                  <p
                    className={`mt-4 text-center font-medium text-sm ${
                      formStatus.includes("successfully")
                        ? "text-green-400"
                        : "text-orange-400"
                    }`}
                  >
                    {formStatus}
                  </p>
                )}
              </div>
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
