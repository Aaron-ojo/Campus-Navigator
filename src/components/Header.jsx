import React from "react";
import Navigation from "./Navigation";

const Header = ({
  activePage,
  onNavigate,
  mobileMenuOpen,
  onMobileMenuToggle,
}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <img src="/oau-logo.png" alt="OAU LOGO" />
            </div>
            <div className="brand-text">
              <h1>Campus Navigator</h1>
              <p>Obafemi Awolowo University</p>
            </div>
          </div>

          <Navigation
            activePage={activePage}
            onNavigate={onNavigate}
            mobileMenuOpen={mobileMenuOpen}
            onMobileMenuToggle={onMobileMenuToggle}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
