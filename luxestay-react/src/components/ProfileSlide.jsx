import React from 'react';
import { X, User, Settings, CreditCard, Shield, Globe, LogOut, ChevronRight, Gem } from 'lucide-react';

const ProfileSlide = ({ onClose, navigateTo, onOpenPersonalInfo, onOpenPayments, onOpenSecurity, onOpenLanguageRegion, currentDisplay, user, onLogout }) => {
    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container profile-slide" onClick={e => e.stopPropagation()}>
                <div className="notif-slide-header">
                    <button className="notif-slide-close" onClick={onClose}>
                        <X size={20} /> Close
                    </button>
                    <span className="notif-category">ACCOUNT</span>
                </div>

                <div className="notif-slide-content">
                    <div className="profile-header">
                        <div className="profile-avatar-xl">
                            <img src={user.photo} alt="Profile" />
                        </div>
                        <h2>{user.name}</h2>
                        <p className="muted">{user.email}</p>
                        <div className="membership-badge">
                            <Gem size={14} /> {user.membership}
                        </div>
                    </div>

                    <div className="profile-menu">
                        <button className="profile-menu-item" onClick={onOpenPersonalInfo}>
                            <div className="menu-icon-wrap"><User size={20} /></div>
                            <div className="menu-text">
                                <strong>Personal Info</strong>
                                <span>Manage your name and details</span>
                            </div>
                            <ChevronRight size={18} />
                        </button>
                        
                        <button className="profile-menu-item" onClick={onOpenSecurity}>
                            <div className="menu-icon-wrap"><Shield size={20} /></div>
                            <div className="menu-text">
                                <strong>Login & Security</strong>
                                <span>Password and 2FA settings</span>
                            </div>
                            <ChevronRight size={18} />
                        </button>

                        <button className="profile-menu-item" onClick={onOpenPayments}>
                            <div className="menu-icon-wrap"><CreditCard size={20} /></div>
                            <div className="menu-text">
                                <strong>Payments & Payouts</strong>
                                <span>Transactions and card info</span>
                            </div>
                            <ChevronRight size={18} />
                        </button>

                        <button className="profile-menu-item" onClick={() => { onClose(); navigateTo('notifications-view'); }}>
                            <div className="menu-icon-wrap"><Settings size={20} /></div>
                            <div className="menu-text">
                                <strong>Notifications</strong>
                                <span>Email and push preferences</span>
                            </div>
                            <ChevronRight size={18} />
                        </button>

                        <button className="profile-menu-item" onClick={onOpenLanguageRegion}>
                            <div className="menu-icon-wrap"><Globe size={20} /></div>
                            <div className="menu-text">
                                <strong>Language & Region</strong>
                                <span>{currentDisplay || 'English (IN) · INR (₹)'}</span>
                            </div>
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="profile-footer">
                        <button className="logout-btn" onClick={() => { onClose(); onLogout(); }}>
                            <LogOut size={18} /> Log out
                        </button>
                        <p className="version-tag">Version 2.4.1 (Stable)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSlide;
