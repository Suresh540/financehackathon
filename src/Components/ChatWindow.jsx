import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import axios from 'axios';


const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  let url = apiUrl + "/chat/MK231582 -1";

  

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate a response
      setTimeout(async () => {
        url += "?message=" + input
        const response = await axios.post(url);
        console.log(response);
        setMessages((prevMessages) => [...prevMessages, { text: 'This is a response.', sender: 'bot' }]);
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header" onClick={toggleMinimize}>
        <span>{isMinimized ? 'Open Chat' : 'Chat'}</span>
        <button className="minimize-button">{isMinimized ? '▲' : '▼'}</button>
      </div>
      {!isMinimized && (
        <div className="chat-window">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <select value={selectedOption} onChange={handleChange}>
              <option value="" disabled>Select an option</option>
              {options.map(option => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '5px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatWindow;