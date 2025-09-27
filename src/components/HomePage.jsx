import React from "react";

const HomePage = () => {
  const features = [
    {
      icon: "📍",
      title: "Precise Locations",
      description:
        "Get exact locations of lecture theatres, halls, faculties, and other campus facilities with detailed descriptions and landmarks.",
    },
    {
      icon: "🗺️",
      title: "Visual Routes",
      description:
        "See clear visual paths and directions from your current location to your destination with step-by-step guidance.",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description:
        "Access the campus navigator on any device - desktop, tablet, or mobile phone for on-the-go navigation assistance.",
    },
    {
      icon: "⚡",
      title: "Quick Search",
      description:
        "Fast search results with auto-suggestions and smart matching for common abbreviations and alternative names.",
    },
  ];

  return (
    <div className="page active">
      {/* 🏠 Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Way Around OAU Campus</h1>
          <p>
            Never get lost again! Search for any lecture theatre, building, or
            facility on campus and get instant directions with visual guides.
          </p>
        </div>
      </section>

      {/* ⚡ Features Section */}
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
