import React, { useState } from "react";
import MyMap from "./MyMap";
import locations from "./Location";

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // 🔍 When pressing "Find Location"
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
        setSuggestions([]);
      } else {
        alert("No matching location found on campus.");
      }
    }
  };

  // 📌 While typing, show suggestions
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

  // ✅ Click suggestion
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
      <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
        Campus Map & Location Search
      </h2>

      {/* 🔍 Search Section */}
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

      {/* 🗺️ Map Section */}
      <div
        className="map-section"
        style={{ margin: "40px 0", height: "800px" }}
      >
        <MyMap
          locations={locations}
          setSelected={setSelectedLocation}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
};

export default MapPage;
