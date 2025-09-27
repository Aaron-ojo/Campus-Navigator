import React from "react";

const Navigation = ({
  activePage,
  onNavigate,
  mobileMenuOpen,
  onMobileMenuToggle,
}) => {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "map", label: "Maps" },
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <nav>
      <ul className={`nav-menu ${mobileMenuOpen ? "show" : ""}`}>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              className={`nav-link ${activePage === item.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="mobile-menu"
        onClick={() => onMobileMenuToggle(!mobileMenuOpen)}
      >
        ☰
      </button>
    </nav>
  );
};

export default Navigation;
