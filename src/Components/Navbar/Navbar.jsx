import React, { useContext, useState } from "react";
import profile from "../../../public/rifat.png";
import { ThemeContext } from "../../context/themeContext";

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#education" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-xl py-2 md:py-4">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-3 shadow-2xl transition-all duration-500 ${
          isDarkMode
            ? "border-slate-800 bg-slate-950/95 text-white"
            : "border-slate-200 bg-white/85 text-slate-950"
        }`}
      >
        <div className="flex items-center gap-3">
          <img
            className="w-11 h-11 rounded-full border border-white/10"
            src={profile}
            alt="Profile"
          />
          <a
            href="#home"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-lg font-semibold transition-colors duration-300 ${
              isDarkMode
                ? "text-white hover:text-slate-300"
                : "text-slate-950 hover:text-slate-700"
            }`}
          >
            Rifat
          </a>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode
                  ? "text-white hover:text-slate-300"
                  : "text-slate-950 hover:text-slate-700"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={toggleMenu}
          className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 ${
            isDarkMode
              ? "border-slate-700 bg-slate-900 text-white hover:border-slate-500"
              : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
          }`}
          aria-label="Toggle menu"
        >
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
        </button>
      </div>

      {menuOpen && (
        <div
          className={`mx-auto mt-3 w-full max-w-7xl rounded-3xl border px-4 py-4 shadow-2xl transition-all duration-300 lg:hidden ${
            isDarkMode
              ? "border-slate-800 bg-slate-950/95 text-white"
              : "border-slate-200 bg-white/95 text-slate-950"
          }`}
        >
          <div className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={handleMenuClick}
                className={`text-base font-medium transition-colors duration-300 ${
                  isDarkMode
                    ? "text-white hover:text-slate-300"
                    : "text-slate-950 hover:text-slate-700"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
