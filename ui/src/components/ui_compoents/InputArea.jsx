import React, { useState, useRef, useEffect } from 'react';
import './styles/ChatPost.css';

const ChatPost = ({ onMessageSent, isStreaming = false }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    if (message.length > 10000) {
      setError('Message is too long. Please keep it under 10,000 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://portfolio-ai-api-frank.onrender.com/chat/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      
      setMessage('');
      
      if (onMessageSent) {
        onMessageSent({
          user: message.trim(),
          assistant: data.response,
          timestamp: new Date().toISOString()
        });
      }

    } catch (err) {
      setError(err.message || 'Unable to send message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearError = () => {
    setError('');
  };

  const clearMessage = () => {
    setMessage('');
    setError('');
    textareaRef.current?.focus();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    autoResize();
  }, [message]);

  return (
    <div className="chat-input-container">
      {/* Animated Error Toast */}
      {error && (
        <div className="error-toast">
          <div className="error-orb">
            <div className="error-glow"></div>
            <span className="material-icons error-icon">warning</span>
          </div>
          <div className="error-content">
            <span className="error-message">{error}</span>
          </div>
          <button 
            onClick={clearError} 
            className="error-close" 
            aria-label="Close error"
          >
            <span className="material-icons">close</span>
            <div className="close-glow"></div>
          </button>
          <div className="error-particles">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="error-particle" />
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${message ? 'has-text' : ''}`}>
          {/* Input Background Effects */}
          <div className="input-background">
            <div className="input-wave"></div>
            <div className="input-glow"></div>
          </div>
          
          <div className="text-input-container">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                clearError();
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type your message..."
              disabled={loading}
              className="message-textarea"
              rows="1"
              maxLength="10000"
            />
            
            {/* Clear Button with Animation */}
            {message && (
              <button
                type="button"
                onClick={clearMessage}
                className="clear-input-btn"
                disabled={loading}
                aria-label="Clear message"
              >
                <span className="material-icons">close</span>
                <div className="clear-ripple"></div>
              </button>
            )}
          </div>

          {/* Send Button with Enhanced Animation */}
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="send-message-btn"
            aria-label="Send message"
          >
            <div className="send-btn-background">
              <div className="send-glow"></div>
            </div>
            
            {loading ? (
              <div className="send-spinner">
                <div className="spinner-orb">
                  <div className="spinner-track"></div>
                  <div className="spinner-fill"></div>
                </div>
                <span className="material-icons send-icon">auto_mode</span>
              </div>
            ) : (
              <>
                <span className="material-icons send-icon">send</span>
                <div className="send-ripple"></div>
              </>
            )}
         
            <div className="send-particles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="send-particle" />
              ))}
            </div>
          </button>
        </div>

     
        <div className="input-meta">
          <div className="char-counter-container">
            <span className="char-counter">
              {message.length}/10,000
            </span>
            <div 
              className="char-progress"
              style={{ width: `${(message.length / 10000) * 100}%` }}
            ></div>
          </div>
          
 
        </div>

 
      </form>

       
      <div className="background-particles">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="background-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatPost;