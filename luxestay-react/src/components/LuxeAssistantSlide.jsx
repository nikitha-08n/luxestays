import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, ChefHat, Car, Plane, Anchor, Utensils, Music, Wine, MessageSquare, Mic, ShieldCheck, Heart } from 'lucide-react';

const LuxeAssistantSlide = ({ onClose, user }) => {
    const firstName = user?.name?.split(' ')[0] || 'Guest';
    
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            type: 'bot', 
            text: `Good morning, ${firstName}. I'm your Luxe Concierge. How can I elevate your stay today?`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const serviceCategories = [
        { icon: <ChefHat size={18} />, label: 'Private Chef', color: '#f59e0b' },
        { icon: <Car size={18} />, label: 'Chauffeur', color: '#3b82f6' },
        { icon: <Plane size={18} />, label: 'Charter', color: '#6366f1' },
        { icon: <Anchor size={18} />, label: 'Yacht', color: '#06b6d4' },
    ];

    const quickActions = [
        "Book a table at Nobu Malibu",
        "Arrange airport transfer",
        "In-villa massage for two",
        "Housekeeping request"
    ];

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userText = inputValue;
        const userMsg = {
            id: Date.now(),
            type: 'user',
            text: userText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Dynamic Bot Response Logic
        setTimeout(() => {
            let responseText = "I'll coordinate that immediately with our local partners. You'll receive a confirmation in your notifications shortly. Is there anything else you need?";
            
            const lowerText = userText.toLowerCase();
            if (lowerText.includes('chef') || lowerText.includes('food') || lowerText.includes('dinner')) {
                responseText = "Our culinary team is available. Would you like a specific cuisine or should I suggest our signature Mediterranean menu for this evening?";
            } else if (lowerText.includes('car') || lowerText.includes('chauffeur') || lowerText.includes('airport') || lowerText.includes('transfer')) {
                responseText = "I'll arrange a premium sedan for you. Should I schedule the pickup for a specific time, or would you like it on standby?";
            } else if (lowerText.includes('massage') || lowerText.includes('spa')) {
                responseText = "Excellent choice. Our in-house therapists are available. Would you prefer a Swedish or Deep Tissue massage?";
            } else if (lowerText.includes('yacht') || lowerText.includes('boat')) {
                responseText = "I'll check the availability of our private fleet. Would you like a sunset cruise or a full-day excursion?";
            } else if (lowerText.includes('housekeeping') || lowerText.includes('clean')) {
                responseText = "I've alerted the housekeeping team. They will be at your suite within the next 15 minutes. Anything else?";
            } else if (lowerText.includes('wifi') || lowerText.includes('wi-fi') || lowerText.includes('internet') || lowerText.includes('password')) {
                responseText = "The high-speed Wi-Fi password for your villa is 'LUXESTAY_ULTRA'. You can also find this on the welcome card in your suite.";
            } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
                responseText = `Hello! I'm here to make your stay extraordinary. How can I assist you today?`;
            }

            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: responseText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container concierge-slide" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="notif-slide-header concierge-header">
                    <div className="flex-center gap-05rem">
                        <div className="sparkle-icon-wrap"><Sparkles size={18} fill="#10b981" color="#10b981" /></div>
                        <span className="concierge-title">LUXE ASSISTANT</span>
                    </div>
                    <button className="notif-slide-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="concierge-body">
                    {/* Chat Messages */}
                    <div className="concierge-messages-wrap">
                        <div className="messages-container">
                            {messages.map(msg => (
                                <div key={msg.id} className={`msg-bubble-wrap ${msg.type}`}>
                                    {msg.type === 'bot' && (
                                        <div className="bot-avatar">
                                            <Sparkles size={14} color="white" />
                                        </div>
                                    )}
                                    <div className={`msg-bubble ${msg.type}`}>
                                        <p>{msg.text}</p>
                                        <span className="msg-time">{msg.time}</span>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="msg-bubble-wrap bot">
                                    <div className="bot-avatar">
                                        <Sparkles size={14} color="white" />
                                    </div>
                                    <div className="msg-bubble bot typing">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Suggestions & Categories */}
                    <div className="concierge-extras">
                        <div className="concierge-categories">
                            {serviceCategories.map(cat => (
                                <button key={cat.label} className="concierge-cat-btn" style={{ '--cat-color': cat.color }}>
                                    <div className="cat-icon">{cat.icon}</div>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="quick-suggestions">
                            <p className="suggestion-label">Quick Requests</p>
                            <div className="suggestions-scroll">
                                {quickActions.map(action => (
                                    <button 
                                        key={action} 
                                        className="suggestion-chip"
                                        onClick={() => setInputValue(action)}
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="concierge-input-area">
                    <div className="input-box-wrapper">
                        <button className="voice-btn"><Mic size={20} /></button>
                        <input 
                            type="text" 
                            placeholder="Type a request..." 
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                        />
                        <button 
                            className={`send-btn ${inputValue.trim() ? 'active' : ''}`}
                            onClick={handleSend}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="concierge-footer-meta">
                        <ShieldCheck size={12} /> Secure Concierge Line
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LuxeAssistantSlide;
