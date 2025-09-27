import React, { useState } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ChatbotPage from "./components/ChatbotPage";
import AboutPage from "./components/AboutPage";
import FAQPage from "./components/FAQPage";
import AIAssistant from "./components/AIAssistant";
import Footer from "./components/Footer";
import MapPage from "./components/MapPage";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pages = {
    home: <HomePage />,
    chatbot: <ChatbotPage />,
    about: <AboutPage />,
    faq: <FAQPage />,
    map: <MapPage />,
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAIClick = () => {
    setActivePage("chatbot");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <Header
        activePage={activePage}
        onNavigate={handleNavigation}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={setMobileMenuOpen}
      />

      <main className="container">{pages[activePage]}</main>

      <AIAssistant onAIClick={handleAIClick} />
      <Footer />
    </div>
  );
}

export default App;
