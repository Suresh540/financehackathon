import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import axios from 'axios';
import './Spinner.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  }
  const toggleChatVisibility = () => setIsChatVisible(!isChatVisible);

  const apiUrl = process.env.REACT_APP_API_URL;
  let url = apiUrl + "/chat/{0}";

  const fetchData = async () => {
    try {
      let ul = apiUrl + '/files';
      const response = await axios.post(ul, {
        headers: {
          'Accept': 'application/json',
        }
      });
      setFiles(response.data.files);
    } catch (error) {
      console.error(error);
    }
  };

  setTimeout(() => {
    fetchData();
  }, 1000);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text:'Qns: '+ input, sender: 'user' }]);
      setLoading(true);
      setInput('');
      // Simulate a response
      setTimeout(async () => {
        try{
        url = url.replaceAll("{0}", selectedOption) + "?message=" + input.replaceAll(' ', '%20');
        const response = await axios.post(url);
        setMessages((prevMessages) => [...prevMessages, { text:'Bot: '+ response.data.response, sender: 'bot' }]);
        setLoading(false);
        }
        catch(e){
          setLoading(false);
          console.log(e);
        }
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      {/* Show/Hide button outside the chat container */}

      <button className="toggle-chat-button" onClick={toggleChatVisibility}>
        {isChatVisible ? '❌' : '📧'}
      </button>
      {/* Chat container */}
      {isChatVisible && (
        <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
          <div className="chat-header" onClick={toggleMinimize}>
            <span>{isMinimized ? 'Open Chat' : 'Chat'}</span>
            <button className="minimize-button">
              {isMinimized ? '▲' : '▼'}
            </button>

          </div>
          {!isMinimized && (
            <div className="chat-window">
              <div className="messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.sender}`}
                    style={{ textAlign: 'left' }}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="input-container">
                <select value={selectedOption} onChange={handleChange}>
                  <option value="" disabled>
                    Select an option
                  </option>
                  {files.map((option) => (
                    <option key={option} value={option}>
                      {option}
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
                {loading ? (
                  <div className="overlay">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <button onClick={sendMessage}>Send</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;