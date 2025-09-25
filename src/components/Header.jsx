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
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.5sDo7rVv90GEY3o7ome2LAHaHo?pid=ImgDet&w=178&h=183&c=7&dpr=1.5&o=7&rm=3"
                alt="OAU Logo"
                className="oau-logo"
              />
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
