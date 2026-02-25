import { useState, useRef, useEffect } from 'react';
import { IoSend, IoSparklesSharp, IoPersonOutline } from 'react-icons/io5';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateAIResponse } from './services/ai';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'ai',
      text: "Hi there! I'm **MaxAI**, your advanced reasoning assistant. What complex problem can I help you solve today?",
      createdAt: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      createdAt: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Fetch response from Gemini AI directly
    try {
      const aiResponseText = await generateAIResponse(userMessage.text);

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: aiResponseText,
        createdAt: Date.now()
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: "**Error:** Failed to connect to MaxAI services.",
        createdAt: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="app-container">
      <div className="glow-bg"></div>

      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo-icon">
            <IoSparklesSharp />
          </div>
          <h1 className="logo-text">MaxAI</h1>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="main-content">
        <div className="chat-container">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h2>How can I help you today?</h2>
              <p>Ask anything, from simple questions to complex programming problems.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.role === 'user' ? 'message-user' : 'message-ai'}`}>
                <div className={`avatar ${msg.role === 'user' ? 'avatar-user' : 'avatar-ai'}`}>
                  {msg.role === 'user' ? <IoPersonOutline /> : <IoSparklesSharp size={20} />}
                </div>
                <div className="message-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="message-wrapper message-ai">
              <div className="avatar avatar-ai">
                <IoSparklesSharp size={20} />
              </div>
              <div className="message-content">
                <div className="loading-indicator">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area-wrapper">
          <form className="input-container" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              className="main-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask MaxAI to solve a complex problem..."
              rows={1}
            />
            <button
              type="submit"
              className="send-button"
              disabled={!input.trim() || isLoading}
            >
              <IoSend />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
