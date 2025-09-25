import React, { useState } from "react";
import MyMap from "./MyMap";
import locations from "./Location"; // ✅ make sure path is correct

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

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

  // 🔍 When pressing "Find Location" or Enter
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const match = locations.find(
        (loc) =>
          loc.name.toLowerCase() === searchQuery.toLowerCase() ||
          loc.aliases?.some(
            (alias) => alias.toLowerCase() === searchQuery.toLowerCase()
          )
      );

      if (match) {
        setSelectedLocation(match);
        setSuggestions([]); // hide suggestions
      } else {
        alert("No matching location found on campus.");
      }
    } else {
      alert("Please enter a lecture theatre or building name to search.");
    }
  };

  // 📌 While typing, update suggestions
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = locations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(query.toLowerCase()) ||
          loc.aliases?.some((alias) =>
            alias.toLowerCase().includes(query.toLowerCase())
          )
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // ✅ When suggestion is clicked
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setSuggestions([]);
    setSelectedLocation(suggestion);
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

      {/* 🔍 Search Section with Suggestions */}
      <div className="search-container" style={{ position: "relative" }}>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Enter lecture theatre or building name (e.g., LT1, Moremi Hall, Library)"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button className="search-btn" onClick={handleSearch}>
          Find Location & Get Directions
        </button>

        {/* ✅ Suggestions dropdown */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((s, i) => (
              <li key={i} onClick={() => handleSuggestionClick(s)}>
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🗺️ Map Section (right under search bar) */}
      <div
        className="map-section"
        style={{ margin: "20px 0", height: "900px" }}
      >
        <MyMap
          locations={locations}
          setSelected={setSelectedLocation}
          selectedLocation={selectedLocation}
        />
      </div>

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
