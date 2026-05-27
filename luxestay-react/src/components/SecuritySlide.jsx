import React, { useState } from 'react';
import { X, ChevronLeft, ShieldCheck, Key, Smartphone, History, Trash2, Monitor, Tablet } from 'lucide-react';

const SecuritySlide = ({ onClose, onBack, onOpenUpdatePassword }) => {
    const [tfa, setTfa] = useState(true);

    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container profile-sub-slide" onClick={e => e.stopPropagation()}>
                <div className="notif-slide-header">
                    <button className="notif-slide-close" onClick={onBack}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <span className="notif-category">SECURITY</span>
                </div>

                <div className="notif-slide-content">
                    <div className="sub-slide-intro">
                        <h1>Login & Security</h1>
                        <p className="muted">Manage your credentials and keep your account protected.</p>
                    </div>

                    <div className="security-status-card">
                        <div className="status-icon-wrap">
                            <ShieldCheck size={32} color="#10b981" />
                        </div>
                        <div className="status-info">
                            <h3>Account Protected</h3>
                            <p>Your security settings are up to date and your account is secure.</p>
                        </div>
                    </div>

                    <div className="desc-section mt-2rem">
                        <h3><Key size={18} /> Password</h3>
                        <div className="flex-between">
                            <div>
                                <p className="mb-05rem"><strong>Last changed</strong></p>
                                <span className="muted">6 months ago</span>
                            </div>
                            <button className="btn btn-outline btn-sm" onClick={onOpenUpdatePassword}>Update Password</button>
                        </div>
                    </div>

                    <div className="desc-section">
                        <h3><Smartphone size={18} /> Two-factor authentication</h3>
                        <div className="flex-between">
                            <div style={{ maxWidth: '70%' }}>
                                <p className="mb-05rem"><strong>Status: {tfa ? 'Enabled' : 'Disabled'}</strong></p>
                                <span className="muted">Add an extra layer of security to your account by requiring a code from your phone.</span>
                            </div>
                            <div 
                                className={`custom-toggle ${tfa ? 'active' : ''}`}
                                onClick={() => setTfa(!tfa)}
                            >
                                <div className="toggle-handle"></div>
                            </div>
                        </div>
                    </div>

                    <div className="desc-section">
                        <h3><History size={18} /> Login History</h3>
                        <div className="session-list">
                            <div className="session-item">
                                <div className="session-icon"><Monitor size={18} /></div>
                                <div className="session-info">
                                    <strong>Windows Chrome · Mumbai, India</strong>
                                    <span>April 27, 2024 at 2:15 PM · Current Session</span>
                                </div>
                            </div>
                            <div className="session-item">
                                <div className="session-icon"><Tablet size={18} /></div>
                                <div className="session-info">
                                    <strong>iPad Safari · London, UK</strong>
                                    <span>March 12, 2024 at 11:42 AM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sub-slide-actions mt-3rem">
                        <button className="logout-btn" style={{ background: '#fff1f2', color: '#e11d48' }}>
                            <Trash2 size={18} /> Deactivate Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySlide;
