import React, { useState } from 'react';
import { X, Send, MessageCircle, Info, Calendar, Wifi, Clock, Star, ShieldCheck } from 'lucide-react';

const ContactHostSlide = ({ onClose, hostName = "Sarah Jenkins" }) => {
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        if (!message.trim()) return;
        setSent(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container contact-host-slide" onClick={e => e.stopPropagation()}>
                <div className="notif-slide-header">
                    <button className="notif-slide-close" onClick={onClose}>
                        <X size={20} /> Close
                    </button>
                    <span className="notif-category">CONTACT HOST</span>
                </div>

                <div className="notif-slide-content">
                    {sent ? (
                        <div className="sent-success-state">
                            <div className="success-icon-anim">
                                <MessageCircle size={48} />
                            </div>
                            <h2>Message Sent!</h2>
                            <p className="muted">Sarah usually responds within an hour. You'll get a notification when she replies.</p>
                        </div>
                    ) : (
                        <>
                            <div className="host-profile-brief">
                                <div className="host-avatar-large">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Host" />
                                </div>
                                <div className="host-meta">
                                    <h3>{hostName}</h3>
                                    <div className="host-stats">
                                        <span><Star size={14} style={{ fill: 'currentColor' }} /> 4.98 Rating</span>
                                        <span>· 5 years hosting</span>
                                    </div>
                                    <div className="verified-badge">
                                        <ShieldCheck size={14} /> Identity Verified
                                    </div>
                                </div>
                            </div>

                            <div className="message-section">
                                <label className="bm-label">Your Message</label>
                                <textarea 
                                    className="bm-input contact-textarea" 
                                    placeholder={`Hi ${hostName.split(' ')[0]}, I had a question about...`}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    rows={6}
                                />
                            </div>

                            <div className="quick-questions">
                                <p className="small-label">Common Questions</p>
                                <div className="quick-btns">
                                    <button className="quick-btn" onClick={() => setMessage("Hi! What's the Wifi password?")}>
                                        <Wifi size={14} /> Wifi Password
                                    </button>
                                    <button className="quick-btn" onClick={() => setMessage("Hi! Can I request an early check-in?")}>
                                        <Clock size={14} /> Early Check-in
                                    </button>
                                    <button className="quick-btn" onClick={() => setMessage("Hi! Where can I find extra towels?")}>
                                        <Info size={14} /> Extra Amenities
                                    </button>
                                </div>
                            </div>

                            <div className="notif-slide-actions-footer">
                                <button className="btn btn-dark w-100" onClick={handleSend} disabled={!message.trim()}>
                                    <Send size={18} /> Send Message
                                </button>
                                <p className="host-response-note">Typically responds in 1 hour</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactHostSlide;
