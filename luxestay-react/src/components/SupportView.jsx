import React, { useState, useRef, useEffect } from 'react';
import { Search, MessageCircle, PhoneCall, Mail, Book, AlertCircle, ChevronDown, X, Send } from 'lucide-react';

const SupportView = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! Welcome to LuxeStay Concierge. How can I assist you today?", sender: "bot" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    const faqs = [
        {
            question: "How do I cancel my reservation?",
            answer: "You can cancel your reservation through your Dashboard under 'My Bookings'. Cancellation policies vary by property, so please review the specific terms of your booking."
        },
        {
            question: "What is the LuxeStay Concierge service?",
            answer: "Our 24/7 Concierge service is available to all guests. We can assist with restaurant reservations, private transportation, event tickets, and specialized in-home services."
        },
        {
            question: "How do I become a verified host?",
            answer: "Navigate to the 'Rent' tab and begin your application. Our team will review your property details and arrange an in-person inspection to ensure it meets our luxury standards."
        },
        {
            question: "When will I be charged for my booking?",
            answer: "A 50% deposit is required at the time of booking to secure your dates. The remaining balance will be automatically charged 14 days prior to your check-in date."
        }
    ];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = { text: inputValue, sender: "user" };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");

        // Mock bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "Our concierge team is reviewing your request. A representative will be with you shortly.", sender: "bot" }]);
        }, 1500);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isChatOpen]);

    return (
        <main className="view active" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            
            {/* Header & Search */}
            <div style={{ textAlign: 'center', margin: '3rem 0 4rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How can we help you?</h1>
                <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                        type="text" 
                        placeholder="Search for articles, policies, or topics..." 
                        style={{ 
                            width: '100%', 
                            padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
                            fontSize: '1.1rem',
                            borderRadius: '50px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            fontFamily: 'inherit'
                        }} 
                    />
                </div>
            </div>

            {/* Quick Contact Options */}
            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                <div className="stat-card" style={{ background: 'var(--bg-white)', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer' }} onClick={() => setIsChatOpen(true)}>
                    <MessageCircle size={32} style={{ margin: '0 auto 1rem', color: 'var(--primary-dark)' }} />
                    <h3>Live Chat</h3>
                    <p className="muted" style={{ margin: '0.5rem 0 1rem' }}>Connect with our concierge team instantly.</p>
                    <span className="link-text">Start chat</span>
                </div>
                <div className="stat-card" style={{ background: 'var(--bg-white)', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer' }}>
                    <PhoneCall size={32} style={{ margin: '0 auto 1rem', color: 'var(--primary-dark)' }} />
                    <h3>Call Us</h3>
                    <p className="muted" style={{ margin: '0.5rem 0 1rem' }}>24/7 global support line.</p>
                    <a href="tel:+9118001234567" className="link-text" style={{ textDecoration: 'none' }}>+91 1800-123-4567</a>
                </div>
                <div className="stat-card" style={{ background: 'var(--bg-white)', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer' }}>
                    <Mail size={32} style={{ margin: '0 auto 1rem', color: 'var(--primary-dark)' }} />
                    <h3>Email Support</h3>
                    <p className="muted" style={{ margin: '0.5rem 0 1rem' }}>We typically reply within 2 hours.</p>
                    <span className="link-text">Send message</span>
                </div>
            </div>

            {/* Content Split */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                {/* FAQs */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Book size={24} /> Frequently Asked Questions
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, idx) => (
                            <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-white)' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {faq.question}
                                    <ChevronDown size={16} className="muted" />
                                </h4>
                                <p className="muted" style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Safety & Policies */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={24} /> Safety & Trust
                    </h2>
                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-dark)' }}>
                            <li style={{ cursor: 'pointer', textDecoration: 'underline' }}>Guest Refund Policy</li>
                            <li style={{ cursor: 'pointer', textDecoration: 'underline' }}>Host Guarantee Terms</li>
                            <li style={{ cursor: 'pointer', textDecoration: 'underline' }}>Extenuating Circumstances</li>
                            <li style={{ cursor: 'pointer', textDecoration: 'underline' }}>Trust & Safety Guidelines</li>
                            <li style={{ cursor: 'pointer', textDecoration: 'underline' }}>Community Standards</li>
                        </ul>
                    </div>
                    
                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--primary-dark)', color: 'white', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ margin: '0 0 0.5rem' }}>Emergency Support</h4>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1rem' }}>If you are in an immediate emergency, please contact local authorities first.</p>
                        <button className="btn btn-white w-100 btn-sm">Urgent Assistance</button>
                    </div>
                </div>
            </div>

            {/* Floating Live Chat Widget */}
            {isChatOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '350px',
                    height: '500px',
                    background: 'var(--bg-white)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1000,
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)'
                }}>
                    {/* Chat Header */}
                    <div style={{ background: 'var(--primary-dark)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MessageCircle size={20} />
                            <strong style={{ fontSize: '1.1rem' }}>Concierge Chat</strong>
                        </div>
                        <button className="icon-btn" style={{ color: 'white' }} onClick={() => setIsChatOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafc' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                background: msg.sender === 'user' ? 'var(--primary-dark)' : 'white',
                                color: msg.sender === 'user' ? 'white' : 'var(--text-dark)',
                                padding: '0.75rem 1rem',
                                borderRadius: msg.sender === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                fontSize: '0.95rem',
                                border: msg.sender === 'bot' ? '1px solid var(--border-color)' : 'none'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', background: 'white' }}>
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            style={{ flex: 1, padding: '0.75rem', borderRadius: '50px', border: '1px solid var(--border-color)', outline: 'none' }}
                        />
                        <button type="submit" disabled={!inputValue.trim()} style={{ background: 'var(--primary-dark)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: inputValue.trim() ? 1 : 0.5 }}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
            
        </main>
    );
};

export default SupportView;
