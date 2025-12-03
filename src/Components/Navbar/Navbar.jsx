import React, { useState, useEffect } from "react";
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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Pure JS confetti animation (canvas)
  useEffect(() => {
    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const confettiCount = 120;
    const confetti = [];
    const colors = [
      "#00bcd4",
      "#8bc34a",
      "#ffeb3b",
      "#ff9800",
      "#e91e63",
      "#9c27b0",
    ];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * confettiCount,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      });
    }

    let frame = 0;
    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((c) => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
        ctx.stroke();
      });
      updateConfetti();
      frame++;
      if (frame < 90)
        requestAnimationFrame(drawConfetti); // faster: half the frames
      else document.body.removeChild(canvas);
    }

    function updateConfetti() {
      confetti.forEach((c) => {
        c.y += ((Math.cos(c.d) + 3 + c.r / 2) / 2) * 2; // faster: double the speed
        c.x += Math.sin(frame / 10) * 3; // faster: increase horizontal movement
        c.tiltAngle += c.tiltAngleIncremental * 1.5; // faster tilt
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > canvas.height) {
          c.x = Math.random() * canvas.width;
          c.y = -10;
        }
      });
    }

    drawConfetti();

    // Cleanup
    return () => {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar bg-gray-900 shadow-sm border-b-2 border-gray-700 py-4">
        {/* Logo Container */}
        <div className="navbar-start flex items-center gap-2">
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={profile}
            alt="Profile"
          />
          <a className="btn btn-ghost text-xl text-white font-semibold hover:text-gray-300">
            Rifat
          </a>
        </div>

        {/* Menu Container */}
        <div className="navbar-end w-full">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <button
              onClick={toggleMenu}
              className="btn btn-ghost text-white"
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
            {menuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-10 mt-3 w-52 p-2 shadow left-0 absolute"
                style={{ left: "-150px", top: "50px" }} // Make sure the menu opens from the left side
                onClick={() => setMenuOpen(false)}
              >
                {menuItems.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="text-white hover:text-gray-300"
                      onClick={(e) =>
                        handleMenuClick(e, item.href, setModalVisible)
                      }
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="text-white hover:text-gray-300"
                    onClick={(e) =>
                      handleMenuClick(e, item.href, setModalVisible)
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
