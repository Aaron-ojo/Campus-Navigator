import React, { useState, useRef, useEffect } from "react";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your OAU Campus Assistant. I can help you find lecture theatres, buildings, and provide directions around campus. What are you looking for today?",
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatAreaRef = useRef(null);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("lt") || message.includes("lecture theatre")) {
      return "I can help you find lecture theatres! Popular ones include LT1, LT2, LT3, and the Amphitheatre 750. Which specific lecture theatre are you looking for?";
    }

    if (message.includes("library")) {
      return "The Hezekiah Oluwasanmi Library is located at the center of campus. It's easily accessible from most faculties and has clear signage. Would you like specific directions from your current location?";
    }

    if (message.includes("moremi") || message.includes("hall")) {
      return "Are you looking for Moremi Hall or another residential hall? I can provide directions to any of the campus halls including Angola, Mozambique, and others.";
    }

    if (message.includes("faculty") || message.includes("department")) {
      return "Which faculty are you trying to locate? We have faculties for Arts, Science, Engineering, Social Sciences, and many more. Each has its own building complex.";
    }

    if (message.includes("help") || message.includes("lost")) {
      return "Don't worry! I'm here to help you navigate campus. Tell me where you're trying to go, and I'll provide clear directions with landmarks to guide you.";
    }

    const generalResponses = [
      "That's a great question! Let me help you find the best route to that location.",
      "I'd be happy to assist you with campus navigation. Could you provide more details about where you're headed?",
      "Campus navigation made easy! What specific location or building are you looking for?",
      "I'm here to help you get around OAU campus efficiently. What destination do you have in mind?",
    ];

    return generalResponses[
      Math.floor(Math.random() * generalResponses.length)
    ];
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = { text: inputMessage, isUser: true };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="page">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h2>OAU Campus Assistant</h2>
          <p>Ask me anything about campus locations and directions!</p>
        </div>

        <div className="chat-area" ref={chatAreaRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.isUser ? "user" : "bot"}`}
            >
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message bot">
              <div className="message-bubble">Typing...</div>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your question here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
