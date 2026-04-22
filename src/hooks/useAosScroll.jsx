import { useEffect } from "react";

const useAosScroll = () => {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-aos]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = parseInt(el.getAttribute("data-aos-delay"), 10) || 0;
          window.setTimeout(() => {
            el.classList.add("aos-animate");
          }, delay);
          obs.unobserve(el);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

export default useAosScroll;
