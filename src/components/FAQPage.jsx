import React, { useState } from "react";
import Navigation from "./Navigation";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: "How do I search for a lecture theatre?",
      answer:
        "Simply type the name or code of the lecture theatre in the search box on the home page. You can use common abbreviations like 'LT1' for Lecture Theatre 1, or full names like 'Amphitheatre 750'.",
    },
    {
      question: "What if I can't find a specific building?",
      answer:
        "Try using the chatbot feature for more interactive assistance. You can also try alternative names or ask about nearby landmarks. If the location is still not found, please contact our support team.",
    },
    {
      question: "Does this work on mobile devices?",
      answer:
        "Yes! The OAU Campus Navigator is fully responsive and works perfectly on all devices including smartphones, tablets, and desktop computers.",
    },
    {
      question: "How accurate are the directions provided?",
      answer:
        "Our directions are based on the most current campus layout and are regularly updated. We provide visual landmarks and clear step-by-step guidance to ensure accuracy.",
    },
    {
      question: "Is there an offline version available?",
      answer:
        "Currently, the navigator requires an internet connection. However, we're working on offline capabilities for future releases to help students even without internet access.",
    },
    {
      question: "Can I suggest new features or report issues?",
      answer:
        "Absolutely! We welcome feedback from students. You can use the chatbot to report issues or send suggestions. Your input helps us improve the navigator for everyone.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // <div className="page">
    <div className="faq-container">
      <div
        className="about-card"
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <h2>Frequently Asked Questions</h2>
        <p>
          Find answers to common questions about using the OAU Campus Navigator
        </p>
      </div>

      {faqItems.map((item, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {item.question}
            <span
              className={`faq-toggle ${openIndex === index ? "rotate" : ""}`}
            >
              +
            </span>
          </button>
          <div className={`faq-answer ${openIndex === index ? "show" : ""}`}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
    // </div>
  );
};

export default FAQPage;
