import React, { useState, useRef, useEffect } from "react";
import { askGemini } from "./geminiService"; // ✅ Gemini API
import locations from "./Location"; // ✅ Local dataset

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      text: "👋 Hello! I'm your OAU Campus Assistant. Ask me about halls, lecture theatres, or anything about OAU!",
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatAreaRef = useRef(null);

  // ✅ Core function to check dataset + Gemini
  const getResponse = async (message) => {
    const lowerMsg = message.toLowerCase();

    // Step 1: Look for matching location in dataset
    const match = locations.find(
      (loc) =>
        lowerMsg.includes(loc.name.toLowerCase()) ||
        loc.aliases?.some((alias) => lowerMsg.includes(alias.toLowerCase()))
    );

    if (match) {
      return `${match.name} — ${match.description}`;
    }

    // Step 2: Fallback → Gemini API
    try {
      return await askGemini(message);
    } catch (error) {
      console.error("Gemini error:", error);
      return "⚠️ Sorry, I couldn't fetch a response right now. Try again later.";
    }
  };

  // ✅ Send user message + bot response
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = { text: inputMessage, isUser: true };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    const botReply = await getResponse(inputMessage);

    setMessages((prev) => [...prev, { text: botReply, isUser: false }]);
    setIsTyping(false);
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
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>OAU Campus Assistant</h2>
        <p>Ask me about any location or anything on campus!</p>
      </div>

      <div className="chat-area" ref={chatAreaRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.isUser ? "user" : "bot"}`}
          >
            <div className="message-bubble">{msg.text}</div>
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
          placeholder="Type your question..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
