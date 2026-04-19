import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/themeContext";

const posts = [
  {
    slug: "premium-ui-patterns",
    category: "Design",
    title: "Premium UI Patterns for Modern Web Apps",
    date: "Apr 2026",
    excerpt:
      "Explore polished UI patterns, subtle motion, and refined layout choices that make product experiences feel premium and memorable.",
    tags: ["UI Design", "Motion", "Branding"],
    link: "#",
  },
  {
    slug: "building-trust-online",
    category: "Strategy",
    title: "Building Trust with High-End Web Experiences",
    date: "Apr 2026",
    excerpt:
      "Learn how to craft messaging, pacing, and visual hierarchy that converts visitors into clients with confidence.",
    tags: ["Conversion", "UX", "Content"],
    link: "#",
  },
  {
    slug: "next-level-performance",
    category: "Development",
    title: "Next-Level Performance for Client-Grade Portfolios",
    date: "Apr 2026",
    excerpt:
      "A modern approach to faster interactions, lightweight assets, and polished page transitions for premium portfolio sites.",
    tags: ["Performance", "React", "Optimization"],
    link: "#",
  },
  {
    slug: "brand-velocity",
    category: "Branding",
    title: "Brand Velocity: Designing for Momentum",
    date: "Apr 2026",
    excerpt:
      "How to create dynamic brand systems that feel fast, polished, and premium across every interaction.",
    tags: ["Branding", "Motion", "Narrative"],
    link: "#",
  },
  {
    slug: "clean-codecraft",
    category: "Engineering",
    title: "Clean Codecraft for High-End Frontends",
    date: "Apr 2026",
    excerpt:
      "A premium approach to component architecture, animation performance, and frontend craftsmanship.",
    tags: ["React", "Architecture", "Performance"],
    link: "#",
  },
  {
    slug: "white-mode-design",
    category: "UX",
    title: "White-Mode Design with Strong Contrast",
    date: "Apr 2026",
    excerpt:
      "Designing elegant white-mode interfaces that retain depth, clarity, and brand vibrancy.",
    tags: ["UI", "Contrast", "Accessibility"],
    link: "#",
  },
];

const Blog = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 6200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll("[data-blog-card]");
    if (!cards.length) return;
    const card = cards[activeIndex];
    trackRef.current.scrollTo({
      left: card.offsetLeft - 24,
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <section
      id="blog"
      className={`py-20 min-h-screen transition-colors duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-[#020617] to-[#0f172a] text-white"
          : "bg-gradient-to-br from-white to-slate-100 text-slate-950"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 px-4 lg:px-0 section-fade">
          <p className="text-sm uppercase tracking-[0.35em] theme-accent-text mb-4">
            Insights & Premium Notes
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold theme-gradient-text mb-4">
            From the Blog
          </h2>
          <p className="mx-auto max-w-2xl text-slate-300 text-lg leading-relaxed">
            Short, sharp articles on design, development, and growth strategy
            for premium brands.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            {posts.map((post) => (
              <article
                key={post.slug}
                data-blog-card
                className="snap-center min-w-[280px] md:min-w-[44%] lg:min-w-[31%] theme-card rounded-[2rem] border border-white/10 p-8 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2 animate-premium-glow"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold theme-accent-text">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  {post.title}
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-200 bg-white/10 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={post.link}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 theme-btn text-white font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Read Article
                </a>
              </article>
            ))}
          </div>

          <div
            className={`absolute inset-x-0 top-0 h-full pointer-events-none opacity-70 ${
              isDarkMode
                ? "bg-gradient-to-r from-[#020617] via-transparent to-[#020617]"
                : "bg-gradient-to-r from-white via-transparent to-white"
            }`}
          />
          <div
            className={`absolute inset-y-0 left-0 w-20 pointer-events-none ${
              isDarkMode
                ? "bg-gradient-to-r from-[#020617] to-transparent"
                : "bg-gradient-to-r from-white to-transparent"
            }`}
          />
          <div
            className={`absolute inset-y-0 right-0 w-20 pointer-events-none ${
              isDarkMode
                ? "bg-gradient-to-l from-[#020617] to-transparent"
                : "bg-gradient-to-l from-white to-transparent"
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default Blog;
