import React, { useEffect, useState } from "react";
import Loader from './Components/Loadder'

import About from "./Components/About/About";
import Banner from "./Components/Banner/Banner";
import Chatbot from "./Components/Chatbot/Chatbot";
import ExperienceEducation from "./Components/ExperienceEducation/ExperienceEducation";
import Footer from "./Components/Footer/Footer";
import GetInTouch from "./Components/GetInTouch/GetInTouch";
import Navbar from "./Components/Navbar/Navbar";
import Projects from "./Components/Projects/Projects";
import Blog from "./Components/Blog/Blog";
import Skills from "./Components/Skills/Skills";

import { ThemeContext, COLOR_SCHEMES } from "./context/themeContext";

function App() {
  const [colorIdx, setColorIdx] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Load saved theme
  useEffect(() => {
    const savedColor = localStorage.getItem("portfolioColorIdx");
    const savedDark = localStorage.getItem("portfolioDarkMode");

    if (savedColor !== null) {
      setColorIdx(Number(savedColor));
    }
    if (savedDark !== null) {
      setIsDarkMode(savedDark === "dark");
    }
  }, []);

  // Apply theme
  useEffect(() => {
    const scheme = COLOR_SCHEMES[colorIdx];

    document.documentElement.classList.toggle("dark", isDarkMode);
    document.body.classList.toggle("theme-light", !isDarkMode);
    document.body.classList.toggle("theme-dark", isDarkMode);

    document.body.style.setProperty("--theme-start", scheme.start);
    document.body.style.setProperty("--theme-end", scheme.end);
    document.body.style.setProperty("--theme-hsl", scheme.hsl);

    localStorage.setItem("portfolioColorIdx", String(colorIdx));
    localStorage.setItem("portfolioDarkMode", isDarkMode ? "dark" : "light");
  }, [colorIdx, isDarkMode]);

  // Loader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 🔥 smoother (1.5 sec)

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ colorIdx, setColorIdx, isDarkMode, setIsDarkMode }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Banner />
          <About />
          <Skills />
          <Projects />
          <Blog />
          <ExperienceEducation />
          <GetInTouch />
          <Footer />
          <Chatbot />
        </>
      )}
    </ThemeContext.Provider>
  );
}

export default App;