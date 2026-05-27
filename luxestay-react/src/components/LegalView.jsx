import React from 'react';
import { ChevronLeft, ShieldCheck, FileText, Cookie, Map as MapIcon } from 'lucide-react';

const LegalView = ({ type, navigateTo }) => {
    const getContent = () => {
        switch (type) {
            case 'privacy-policy':
                return {
                    title: 'Privacy Policy',
                    icon: <ShieldCheck size={32} />,
                    content: (
                        <>
                            <p>Last updated: May 8, 2024</p>
                            <h3>1. Information We Collect</h3>
                            <p>We collect information you provide directly to us when you create an account, search for properties, or communicate with hosts. This includes your name, email address, phone number, and government-issued identification for verification.</p>
                            <h3>2. How We Use Your Information</h3>
                            <p>We use the information to facilitate property bookings, verify identity, process payments, and improve our services. We may also send you marketing communications if you have opted in.</p>
                            <h3>3. Data Security</h3>
                            <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
                            <h3>4. Your Rights</h3>
                            <p>You have the right to access, correct, or delete your personal data. You can manage your preferences in your account settings.</p>
                        </>
                    )
                };
            case 'terms-of-service':
                return {
                    title: 'Terms of Service',
                    icon: <FileText size={32} />,
                    content: (
                        <>
                            <p>Last updated: May 8, 2024</p>
                            <h3>1. Acceptance of Terms</h3>
                            <p>By using LuxeStay, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
                            <h3>2. User Responsibilities</h3>
                            <p>Users must provide accurate information and are responsible for maintaining the confidentiality of their accounts. Any illegal or unauthorized use of the platform is strictly prohibited.</p>
                            <h3>3. Booking & Payments</h3>
                            <p>Bookings are confirmed only after payment is processed. Cancellation policies are set by hosts and must be adhered to.</p>
                            <h3>4. Limitation of Liability</h3>
                            <p>LuxeStay is a marketplace and does not own the properties listed. We are not liable for disputes between tenants and landlords.</p>
                        </>
                    )
                };
            case 'cookie-policy':
                return {
                    title: 'Cookie Policy',
                    icon: <Cookie size={32} />,
                    content: (
                        <>
                            <p>Last updated: May 8, 2024</p>
                            <p>LuxeStay uses cookies to improve your browsing experience and personalize content. By using our site, you consent to our use of cookies.</p>
                            <h3>What are cookies?</h3>
                            <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and understand how you interact with our platform.</p>
                            <h3>Types of cookies we use</h3>
                            <ul>
                                <li><strong>Essential Cookies:</strong> Required for the site to function (e.g., login sessions).</li>
                                <li><strong>Analytical Cookies:</strong> Help us track traffic and user behavior.</li>
                                <li><strong>Marketing Cookies:</strong> Used to show you relevant ads.</li>
                            </ul>
                        </>
                    )
                };
            case 'sitemap':
                return {
                    title: 'Sitemap',
                    icon: <MapIcon size={32} />,
                    content: (
                        <div className="sitemap-grid">
                            <div className="sitemap-col">
                                <h4>Main Pages</h4>
                                <ul>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home-view'); }}>Home</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('search-view'); }}>Search Homes</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('listings-view'); }}>List Your Property</a></li>
                                </ul>
                            </div>
                            <div className="sitemap-col">
                                <h4>User Account</h4>
                                <ul>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('dashboard-view'); }}>Dashboard</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('bookings-view'); }}>My Bookings</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('saved-homes-view'); }}>Saved Homes</a></li>
                                </ul>
                            </div>
                            <div className="sitemap-col">
                                <h4>Legal</h4>
                                <ul>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('privacy-policy'); }}>Privacy Policy</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('terms-of-service'); }}>Terms of Service</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('cookie-policy'); }}>Cookie Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    )
                };
            default:
                return { title: 'Legal', icon: null, content: <p>Select a policy from the footer.</p> };
        }
    };

    const data = getContent();

    return (
        <div className="legal-view-container">
            <div className="legal-header">
                <button className="back-btn-minimal" onClick={() => navigateTo('home-view')}>
                    <ChevronLeft size={20} /> Back to Home
                </button>
                <div className="legal-title-wrap">
                    {data.icon}
                    <h1>{data.title}</h1>
                </div>
            </div>
            <div className="legal-body">
                <div className="legal-card">
                    {data.content}
                </div>
            </div>
        </div>
    );
};

export default LegalView;
