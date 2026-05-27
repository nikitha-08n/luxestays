import React, { useState } from 'react';
import { X, ChevronLeft, Globe, MapPin, Check, Search } from 'lucide-react';

const LanguageRegionSlide = ({ onClose, onBack, currentLang, setCurrentLang, currentRegion, setCurrentRegion }) => {
    const languages = [
        { id: 'en-in', name: 'English (India)', native: 'English' },
        { id: 'hi-in', name: 'Hindi', native: 'हिन्दी' },
        { id: 'bn-in', name: 'Bengali', native: 'বাংলা' },
        { id: 'te-in', name: 'Telugu', native: 'తెలుగు' },
        { id: 'ta-in', name: 'Tamil', native: 'தமிழ்' },
        { id: 'mr-in', name: 'Marathi', native: 'मराठी' },
        { id: 'gu-in', name: 'Gujarati', native: 'ગુજરાતી' },
        { id: 'kn-in', name: 'Kannada', native: 'ಕನ್ನಡ' },
    ];

    const regions = [
        { id: 'IN', name: 'India', currency: 'INR (₹)' },
        { id: 'US', name: 'United States', currency: 'USD ($)' },
        { id: 'UK', name: 'United Kingdom', currency: 'GBP (£)' },
        { id: 'AE', name: 'United Arab Emirates', currency: 'AED (د.إ)' },
        { id: 'SG', name: 'Singapore', currency: 'SGD ($)' },
    ];

    const [activeTab, setActiveTab] = useState('language');

    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container profile-sub-slide" onClick={e => e.stopPropagation()}>
                <div className="notif-slide-header">
                    <button className="notif-slide-close" onClick={onBack}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <span className="notif-category">SETTINGS</span>
                </div>

                <div className="notif-slide-content">
                    <div className="sub-slide-intro">
                        <h1>Language & Region</h1>
                        <p className="muted">Choose your preferred language and regional settings.</p>
                    </div>

                    <div className="settings-tabs">
                        <button 
                            className={`settings-tab ${activeTab === 'language' ? 'active' : ''}`}
                            onClick={() => setActiveTab('language')}
                        >
                            Language
                        </button>
                        <button 
                            className={`settings-tab ${activeTab === 'region' ? 'active' : ''}`}
                            onClick={() => setActiveTab('region')}
                        >
                            Region & Currency
                        </button>
                    </div>

                    <div className="settings-list-container">
                        {activeTab === 'language' ? (
                            <div className="settings-options-list">
                                {languages.map(lang => (
                                    <button 
                                        key={lang.id} 
                                        className={`settings-option-item ${currentLang === lang.id ? 'selected' : ''}`}
                                        onClick={() => setCurrentLang(lang.id)}
                                    >
                                        <div className="option-info">
                                            <span className="option-name">{lang.name}</span>
                                            <span className="option-sub">{lang.native}</span>
                                        </div>
                                        {currentLang === lang.id && <Check size={18} className="check-icon" />}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="settings-options-list">
                                {regions.map(reg => (
                                    <button 
                                        key={reg.id} 
                                        className={`settings-option-item ${currentRegion === reg.id ? 'selected' : ''}`}
                                        onClick={() => setCurrentRegion(reg.id)}
                                    >
                                        <div className="option-info">
                                            <span className="option-name">{reg.name}</span>
                                            <span className="option-sub">{reg.currency}</span>
                                        </div>
                                        {currentRegion === reg.id && <Check size={18} className="check-icon" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="settings-footer-info">
                        <p>Prices and details will be updated based on your selected currency and region.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanguageRegionSlide;
