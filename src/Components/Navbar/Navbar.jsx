import profile from "../../../public/rifat.png";

const menuItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Experience", href: "#" },
  { label: "Education", href: "#" },
];

const Navbar = () => {
  return (
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
                <a href={item.href} className="text-white hover:text-gray-300">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <a href={item.href} className="text-white hover:text-gray-300">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
