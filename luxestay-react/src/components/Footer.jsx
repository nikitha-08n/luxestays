import React from 'react';

const IconFacebook = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
);
const IconInstagram = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
);
const IconTwitter = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);
const IconLinkedin = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
);

const Footer = ({ navigateTo }) => {
    return (
        <footer className="premium-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand-section">
                        <div className="footer-logo">
                            <span className="logo-text">LuxeStay</span>
                        </div>
                        <p className="footer-tagline">
                            Redefining the modern living experience for students and professionals across India's vibrant cities.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon"><IconFacebook /></a>
                            <a href="#" className="social-icon"><IconInstagram /></a>
                            <a href="#" className="social-icon"><IconTwitter /></a>
                            <a href="#" className="social-icon"><IconLinkedin /></a>
                        </div>
                    </div>

                    <div className="footer-nav-grid">
                        <div className="footer-nav-col">
                            <h4>Platform</h4>
                            <ul>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('search-view'); }}>Search Homes</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('listings-view'); }}>List Property</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('dashboard-view'); }}>Dashboard</a></li>
                            </ul>
                        </div>
                        <div className="footer-nav-col">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('support-view'); }}>Help Center</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('notifications-view'); }}>Safety Info</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('support-view'); }}>Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="footer-nav-col">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('privacy-policy'); }}>Privacy Policy</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('terms-of-service'); }}>Terms of Service</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('cookie-policy'); }}>Cookie Policy</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('sitemap'); }}>Sitemap</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        © 2024 LuxeStay Properties Pvt Ltd. All rights reserved.
                    </div>
                    <div className="footer-location">
                        <span className="india-flag">🇮🇳</span> Made with love in Bangalore
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
