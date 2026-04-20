import React, { useEffect, useRef } from "react";

const Loader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Particle background (lightweight canvas animation)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] z-[9999] overflow-hidden">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-cyan-600/10 animate-pulse" />

      {/* Main Loader Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Outer Glowing Ring */}
        <div className="relative mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin-slow" />
          <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-transparent border-b-cyan-500 border-l-indigo-500 animate-spin-reverse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm animate-pulse-glow" />
          </div>
        </div>

        {/* Animated Text */}
        <h1
          className="text-5xl md:text-7xl font-extrabold tracking-[0.2em] bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          RIFAT
        </h1>

        {/* Loading Dots */}
        <div className="flex gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
        </div>

        {/* Subtle Loading Text */}
        <p className="text-xs text-blue-300/60 mt-4 font-mono tracking-wider animate-pulse">
          LOADING EXPERIENCE
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 2.5s linear infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;