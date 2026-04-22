import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [hoverColor, setHoverColor] = useState("#8b5cf6");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Desktop only (no touch)
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    document.body.classList.add("has-custom-cursor");
    setHidden(false);

    let mouseX = 0,
        mouseY = 0;
    let ringX = 0,
        ringY = 0;
    let trail = Array.from({ length: 4 }, () => ({ x: 0, y: 0 }));
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Core dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const onOver = (e) => {
      const target = e.target.closest(
        "a, button, [role='button'], input, textarea, [data-cursor='hover']"
      );
      if (target) {
        setHovering(true);
        // Get computed color or fallback
        const bg = window.getComputedStyle(target).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)") {
          setHoverColor(bg);
        } else {
          setHoverColor("#8b5cf6");
        }
      } else {
        setHovering(false);
      }
    };

    const tick = () => {
      // Faster ring follow (lower easing = quicker)
      ringX += (mouseX - ringX) * 0.28;
      ringY += (mouseY - ringY) * 0.28;

      const ringSize = hovering ? 52 : 32;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - ringSize/2}px, ${ringY - ringSize/2}px, 0)`;
        ringRef.current.style.width = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;
      }

      // Trail update – faster & less lag
      let prev = { x: ringX, y: ringY };
      for (let i = 0; i < trail.length; i++) {
        const easing = 0.35 - i * 0.06;
        trail[i].x += (prev.x - trail[i].x) * easing;
        trail[i].y += (prev.y - trail[i].y) * easing;

        const node = trailRefs.current[i];
        if (node) {
          const size = hovering ? 5 : 3;
          node.style.transform = `translate3d(${trail[i].x - size/2}px, ${trail[i].y - size/2}px, 0)`;
          node.style.opacity = 0.5 - i * 0.1;
          node.style.width = `${size}px`;
          node.style.height = `${size}px`;
        }
        prev = trail[i];
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [hovering]);

  if (hidden) return null;

  return (
    <>
      <style>{`
        .has-custom-cursor * {
          cursor: none !important;
        }
        .cursor-ring {
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          z-index: 9998;
          border-radius: 50%;
          transition: width 0.2s ease, height 0.2s ease, background 0.2s;
          will-change: transform;
        }
        .cursor-ring::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: conic-gradient(from 0deg, #3b82f6, #a855f7, #ec4899, #3b82f6);
          opacity: 0.7;
          transition: opacity 0.2s;
          filter: blur(1px);
        }
        .cursor-ring::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: inherit;
          background: rgba(0,0,0,0.1);
          backdrop-filter: blur(1px);
        }
        .cursor-ring.hover::before {
          opacity: 1;
          filter: blur(2px);
        }
        .cursor-dot {
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          z-index: 9999;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 8px currentColor;
          transition: background 0.2s, box-shadow 0.2s;
          will-change: transform;
        }
        .cursor-trail {
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          z-index: 9997;
          border-radius: 50%;
          background: radial-gradient(circle, #60a5fa, #a855f7);
          will-change: transform;
          transition: width 0.2s, height 0.2s;
        }
      `}</style>

      {/* Trail dots */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} ref={(el) => (trailRefs.current[i] = el)} className="cursor-trail" />
      ))}

      {/* Core dot with dynamic color */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: 6,
          height: 6,
          background: hovering ? hoverColor : "#ffffff",
          boxShadow: hovering ? `0 0 12px ${hoverColor}` : "0 0 6px #a855f7",
        }}
      />

      {/* Outer ring with gradient animation */}
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "hover" : ""}`}
        style={{
          background: hovering ? `radial-gradient(circle, ${hoverColor}20, transparent)` : "transparent",
        }}
      />
    </>
  );
}