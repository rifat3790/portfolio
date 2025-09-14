import React, { useState } from "react";
import profile from "../../../public/rifat.png";

// Use section IDs for hrefs
const menuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#education" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

// Improved smooth scroll handler
const handleMenuClick = (e, href, setModalVisible) => {
  e.preventDefault();
  const id = href.replace("#", "");
  // Check if the clicked menu is Blog and show the modal
  if (id === "blog") {
    setModalVisible(true);
  } else {
    const el = document.getElementById(id) || document.querySelector(`[name='${id}']`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback: scroll to top for "home"
      if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};

const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false); // Modal state

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar bg-gray-900 shadow-sm border-b-2 border-gray-700 py-4">
        {/* Logo Container */}
        <div className="navbar-start flex items-center gap-2">
          <img className="w-[50px] h-[50px] rounded-full" src={profile} alt="Profile" />
          <a className="btn btn-ghost text-xl text-white font-semibold hover:text-gray-300">Rifat</a>
        </div>

        {/* Menu Container */}
        <div className="navbar-end w-full">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="text-white hover:text-gray-300"
                    onClick={(e) => handleMenuClick(e, item.href, setModalVisible)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="text-white hover:text-gray-300"
                    onClick={(e) => handleMenuClick(e, item.href, setModalVisible)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for Blog */}
      {modalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-center mb-4 text-black">Blog Coming Soon</h3>
            <p className="text-center text-gray-600">I am working hard on the blog section. Stay tuned for updates!</p>
            <div className="flex justify-center mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
