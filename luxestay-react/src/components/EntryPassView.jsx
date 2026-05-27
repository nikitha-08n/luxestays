import React, { useState } from 'react';
import { QrCode, MapPin, Calendar, Clock, ShieldCheck, Share2, Download, ChevronLeft, Info, Key, Unlock } from 'lucide-react';

const EntryPassView = ({ navigateTo, onContactHost }) => {
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    const handleUnlock = () => {
        setIsUnlocking(true);
        setTimeout(() => {
            setIsUnlocking(false);
            setIsUnlocked(true);
            setTimeout(() => setIsUnlocked(false), 3000);
        }, 1500);
    };
    return (
        <main className="view active entry-pass-page">
            <div className="section-container">
                <button className="back-link mb-2rem" onClick={() => navigateTo('dashboard-view')}>
                    <ChevronLeft size={20} /> Back to Dashboard
                </button>

                <div className="entry-pass-layout">
                    {/* The Digital Pass */}
                    <div className="pass-card-container">
                        <div className="pass-card">
                            <div className="pass-header">
                                <div className="pass-logo">LUXESTAY</div>
                                <div className="pass-type">GUEST ENTRY PASS</div>
                            </div>
                            
                            <div className="pass-body">
                                <div className="pass-qr-wrap">
                                    <div className="qr-border">
                                        <QrCode size={180} strokeWidth={1.5} />
                                    </div>
                                    <p className="qr-hint">Scan at the main entrance gate</p>
                                </div>

                                <div className="pass-details">
                                    <div className="pass-detail-item">
                                        <label>PROPERTY</label>
                                        <strong>The Azure Pavilion Estate</strong>
                                    </div>
                                    <div className="pass-detail-row">
                                        <div className="pass-detail-item">
                                            <label>CHECK-IN</label>
                                            <strong>May 12, 2024</strong>
                                        </div>
                                        <div className="pass-detail-item text-right">
                                            <label>CHECK-OUT</label>
                                            <strong>May 18, 2024</strong>
                                        </div>
                                    </div>
                                    <div className="pass-detail-item">
                                        <label>GUESTS</label>
                                        <strong>2 Adults, 1 Infant</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="pass-footer">
                                <div className="pass-status">
                                    <ShieldCheck size={16} /> VERIFIED GUEST
                                </div>
                                <div className="pass-id">REF: LUX-8829-XQ</div>
                            </div>
                        </div>

                        <div className="pass-wallet-btns">
                            <button className="wallet-btn apple">
                                <span>Add to Apple Wallet</span>
                            </button>
                            <button className="wallet-btn google">
                                <span>Add to Google Wallet</span>
                            </button>
                        </div>

                        {/* Digital Smart Key */}
                        <div className="smart-key-container">
                            <div className="key-header">
                                <Key size={18} /> <span>Smart Digital Key</span>
                            </div>
                            <button 
                                className={`unlock-btn ${isUnlocking ? 'loading' : ''} ${isUnlocked ? 'success' : ''}`}
                                onClick={handleUnlock}
                                disabled={isUnlocking}
                            >
                                <div className="unlock-ripple"></div>
                                {isUnlocking ? (
                                    <div className="key-spinner"></div>
                                ) : isUnlocked ? (
                                    <><Unlock size={24} /> <span>Door Unlocked</span></>
                                ) : (
                                    <><Key size={24} /> <span>Tap to Unlock</span></>
                                )}
                            </button>
                            <p className="key-hint">Hold near the villa door sensor</p>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="pass-info-sidebar">
                        <div className="info-card">
                            <h3><Info size={20} /> Entry Instructions</h3>
                            <ul className="info-list">
                                <li><strong>Gate Access:</strong> Present this QR code to the security personnel at the North Gate.</li>
                                <li><strong>Smart Lock:</strong> Once inside, use the 4-digit code <b>1992</b> for the villa main door.</li>
                                <li><strong>Identity:</strong> Please keep a digital copy of your Aadhaar or Passport ready for verification.</li>
                                <li><strong>Timing:</strong> Entry is permitted after 3:00 PM on the day of check-in.</li>
                            </ul>
                        </div>

                        <div className="pass-actions-grid">
                            <button className="btn btn-outline w-100">
                                <Share2 size={18} /> Share Pass
                            </button>
                            <button className="btn btn-outline w-100">
                                <Download size={18} /> Save PDF
                            </button>
                        </div>

                        <div className="help-box mt-2rem">
                            <p>Having trouble with entry?</p>
                            <button className="link-text" onClick={onContactHost}>
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EntryPassView;
