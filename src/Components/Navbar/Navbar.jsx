import profile from "../../../public/rifat.png"
const menuItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Experience ", href: "#" },
  { label: "Education", href: "#" },
  
];

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm border-b-1 border-gray-200 py-4">
      {/* Logo Container */}
      <div className="navbar-start">
        <img className="w-[50px] h-[50px] rounded-b-full" src={profile} alt="" />
        <a className="btn btn-ghost text-xl">Rifat</a>
      </div>
      {/* Menu Container */}
      <div className="navbar-end w-full">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item, idx) =>
              item.submenu ? (
                <li key={idx}>
                  <a>{item.label}</a>
                  <ul className="p-2">
                    {item.submenu.map((sub, subIdx) => (
                      <li key={subIdx}>
                        <a href={sub.href}>{sub.label}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={idx}>
                  <a href={item.href}>{item.label}</a>
                </li>
              )
            )}
          </ul>
        </div>
        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item, idx) =>
              item.submenu ? (
                <li key={idx}>
                  <details>
                    <summary>{item.label}</summary>
                    <ul className="p-2">
                      {item.submenu.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <a href={sub.href}>{sub.label}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={idx}>
                  <a href={item.href}>{item.label}</a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
