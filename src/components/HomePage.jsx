import React, { useState } from "react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(
        `Searching for: ${searchQuery}\n\nIn a real implementation, this would show:\n• Location image\n• Detailed directions\n• Interactive map\n• Nearby landmarks`
      );
    } else {
      alert("Please enter a lecture theatre or building name to search.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="page active">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Way Around OAU Campus</h1>
          <p>
            Never get lost again! Search for any lecture theatre, building, or
            facility on campus and get instant directions with visual guides.
          </p>
        </div>
      </section>

      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Enter lecture theatre or building name (e.g., LT1, Moremi Hall, Library)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button className="search-btn" onClick={handleSearch}>
          Find Location & Get Directions
        </button>
      </div>

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
