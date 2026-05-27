import React from 'react';
import { X, MapPin, Shield, Info, Cigarette, Users, Home, Clock, Coffee } from 'lucide-react';

const PropertyDescriptionSlide = ({ onClose, propertyName = "The Azure Pavilion Estate" }) => {
    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container desc-slide" onClick={e => e.stopPropagation()}>
                <div className="notif-slide-header">
                    <button className="notif-slide-close" onClick={onClose}>
                        <X size={20} /> Close
                    </button>
                    <span className="notif-category">ABOUT THIS HOME</span>
                </div>

                <div className="notif-slide-content">
                    <h2 className="desc-main-title">{propertyName}</h2>
                    
                    <div className="desc-section">
                        <h3>The Space</h3>
                        <p>Experience coastal luxury in this architecturally significant oceanfront estate. The Azure Pavilion offers a seamless blend of indoor and outdoor living with 30-foot retracting glass walls that frame the Pacific Ocean. Designed for the discerning traveler, every detail from the artisan-crafted furniture to the temperature-controlled wine cellar has been curated to provide an unparalleled stay.</p>
                        <p>The main suite features a floating fireplace, a private terrace with an infinity-edge hot tub, and a spa-inspired bathroom with a rain shower and a deep soaking tub carved from a single block of marble.</p>
                    </div>

                    <div className="desc-section">
                        <h3><MapPin size={18} /> The Neighborhood</h3>
                        <p>Located in the exclusive carbon beach area of Malibu, often referred to as "Billionaire's Beach." You'll be steps away from the finest dining in Southern California, including Nobu and Soho House.</p>
                        <ul className="desc-list">
                            <li><strong>Nobu Malibu:</strong> 5 mins walk</li>
                            <li><strong>Malibu Pier:</strong> 10 mins walk</li>
                            <li><strong>Santa Monica:</strong> 15 mins drive</li>
                        </ul>
                    </div>

                    <div className="desc-section">
                        <h3><Shield size={18} /> House Rules</h3>
                        <div className="rules-grid">
                            <div className="rule-item">
                                <Clock size={16} /> 
                                <div>
                                    <strong>Check-in</strong>
                                    <span>After 3:00 PM</span>
                                </div>
                            </div>
                            <div className="rule-item">
                                <Clock size={16} /> 
                                <div>
                                    <strong>Checkout</strong>
                                    <span>11:00 AM</span>
                                </div>
                            </div>
                            <div className="rule-item">
                                <Cigarette size={16} style={{ textDecoration: 'line-through', opacity: 0.5 }} /> 
                                <div>
                                    <strong>No Smoking</strong>
                                    <span>Inside or on terraces</span>
                                </div>
                            </div>
                            <div className="rule-item">
                                <Users size={16} /> 
                                <div>
                                    <strong>No Parties</strong>
                                    <span>Strict noise ordinances</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="desc-section">
                        <h3><Home size={18} /> Safety & Property</h3>
                        <ul className="desc-list">
                            <li>Carbon monoxide alarm installed</li>
                            <li>Smoke alarm installed</li>
                            <li>Fire extinguisher in the kitchen</li>
                            <li>Security cameras on exterior only</li>
                        </ul>
                    </div>

                    <div className="desc-footer-note">
                        <p>By booking this property, you agree to follow the house rules and respect the neighborhood quiet hours (10:00 PM - 8:00 AM).</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDescriptionSlide;
