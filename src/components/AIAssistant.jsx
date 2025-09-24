import React, { useState, useEffect } from "react";

const AIAssistant = ({ onAIClick }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    // Show tooltip on page load after 3 seconds
    const timer = setTimeout(() => {
      setTooltipVisible(true);

      // Hide tooltip after 5 seconds
      const hideTimer = setTimeout(() => {
        setTooltipVisible(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setTooltipVisible(false);
    }, 500);
  };

  return (
    <div
      className="ai-assistant-float"
      onClick={onAIClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="icon">🤖</div>
      <div className={`ai-tooltip ${tooltipVisible ? "show" : ""}`}>
        <div className="ai-tooltip-content">
          <div className="ai-tooltip-title">Your Personal Assistant</div>
          <div className="ai-tooltip-subtitle">Click to get instant help!</div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
