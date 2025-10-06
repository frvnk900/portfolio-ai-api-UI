import React, { useState, useEffect, useRef } from 'react';
import './styles/messagebubble.css';

const MessageList = ({ newMessage = null, isStreaming = false, streamContent = '' }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('https://portfolio-ai-api-nabe.onrender.com/chat/messages');
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error('Error loading messages', error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (newMessage) {
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [newMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamContent]);

  return (
    <div className="chat-container">
      <div className="messages-scroll-container" ref={scrollContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message-bubble ${message.role}`}>
            <div className="message-content-wrapper">
              <div className="message-header">
                <span className="message-sender">
                  {message.role === 'assistant' ? 'Frank AI' : 'You'}
                </span>
              </div>
              <div className="message-content">
                <div className="message-text">
                  {message.content || message}
                </div>
              </div>
             
            </div>
          </div>
        ))}
         <br /><br /><br /><br />

        {isStreaming && streamContent && (
          <div className="message-bubble assistant streaming">
            <div className="message-content-wrapper">
              <div className="message-header">
                <span className="message-sender">Frank AI</span>
              </div>
              <div className="message-content streaming">
                <div className="message-text">
                  {streamContent}
                  <span className="streaming-cursor">|</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
