import React, { useState } from 'react';
import { X, ChevronLeft, CreditCard, Plus, ArrowUpRight, Zap, Info, ShieldCheck, Smartphone, Landmark } from 'lucide-react';

const PaymentsSlide = ({ onClose, onBack, fastCheckoutEnabled, setFastCheckoutEnabled, onOpenAddMethod }) => {

    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container profile-sub-slide" onClick={e => e.stopPropagation()}>
                <div className="notif-slide-header">
                    <button className="notif-slide-close" onClick={onBack}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <span className="notif-category">PAYMENTS</span>
                </div>

                <div className="notif-slide-content">
                    <div className="sub-slide-intro">
                        <h1>Payments & Payouts</h1>
                        <p className="muted">Manage your payment methods and view your transaction history.</p>
                    </div>

                    <div className="autopay-banner">
                        <div className="autopay-info">
                            <div className="zap-icon-wrap"><Zap size={20} fill="#f59e0b" color="#f59e0b" /></div>
                            <div>
                                <strong>Fast Checkout & Auto Pay</strong>
                                <p>Enable one-click bookings. Your default card will be charged automatically once the host confirms.</p>
                            </div>
                        </div>
                        <div 
                            className={`custom-toggle ${fastCheckoutEnabled ? 'active' : ''}`}
                            onClick={() => setFastCheckoutEnabled(!fastCheckoutEnabled)}
                        >
                            <div className="toggle-handle"></div>
                        </div>
                    </div>

                    <div className="payment-section">
                        <h3>Your Cards</h3>
                        <div className="cards-list">
                            <div className="payment-card visa">
                                <div className="card-top">
                                    <div className="card-chip"></div>
                                    <span className="card-brand">VISA</span>
                                </div>
                                <div className="card-number">•••• •••• •••• 4421</div>
                                <div className="card-bottom">
                                    <div className="card-holder">
                                        <label>HOLDER</label>
                                        <span>J Thorne</span>
                                    </div>
                                    <div className="card-expiry">
                                        <label>EXPIRES</label>
                                        <span>12/26</span>
                                    </div>
                                </div>
                            </div>

                            <button className="add-card-btn" onClick={onOpenAddMethod}>
                                <Plus size={24} />
                                <span>Add New Method</span>
                            </button>
                        </div>
                    </div>

                    <div className="payment-section">
                        <div className="flex-between">
                            <h3>UPI & Digital Wallets</h3>
                            <span className="badge badge-green">Safe & Instant</span>
                        </div>
                        <div className="upi-grid">
                            <div className="upi-app-card">
                                <div className="upi-icon gpay">G</div>
                                <span>Google Pay</span>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="upi-app-card">
                                <div className="upi-icon phonepe">P</div>
                                <span>PhonePe</span>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="upi-app-card">
                                <div className="upi-icon paytm">Pt</div>
                                <span>Paytm</span>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="upi-app-card">
                                <div className="upi-icon amazonpay">A</div>
                                <span>Amazon Pay</span>
                                <div className="status-dot online"></div>
                            </div>
                        </div>
                    </div>

                    <div className="payment-section">
                        <h3>Net Banking</h3>
                        <div className="bank-list">
                            <div className="bank-item">
                                <div className="bank-icon"><Landmark size={18} /></div>
                                <div className="bank-info">
                                    <strong>HDFC Bank</strong>
                                    <span>Fast Verification</span>
                                </div>
                                <ChevronLeft size={16} style={{ transform: 'rotate(180deg)', opacity: 0.3 }} />
                            </div>
                            <div className="bank-item">
                                <div className="bank-icon"><Landmark size={18} /></div>
                                <div className="bank-info">
                                    <strong>ICICI Bank</strong>
                                    <span>Instant Payouts</span>
                                </div>
                                <ChevronLeft size={16} style={{ transform: 'rotate(180deg)', opacity: 0.3 }} />
                            </div>
                            <div className="bank-item">
                                <div className="bank-icon"><Landmark size={18} /></div>
                                <div className="bank-info">
                                    <strong>State Bank of India</strong>
                                    <span>Highly Secure</span>
                                </div>
                                <ChevronLeft size={16} style={{ transform: 'rotate(180deg)', opacity: 0.3 }} />
                            </div>
                        </div>
                        <button className="btn btn-outline w-100 mt-1rem" style={{ borderStyle: 'dashed' }}>
                            <Plus size={16} /> View More Banks
                        </button>
                    </div>

                    <div className="payment-section">
                        <h3>Recent Transactions</h3>
                        <div className="transaction-list">
                            <div className="transaction-item">
                                <div className="tx-icon"><ArrowUpRight size={18} /></div>
                                <div className="tx-info">
                                    <strong>The Azure Pavilion Estate</strong>
                                    <span>May 12, 2024</span>
                                </div>
                                <div className="tx-amount negative">-₹8,15,616</div>
                            </div>
                            <div className="transaction-item">
                                <div className="tx-icon"><ArrowUpRight size={18} /></div>
                                <div className="tx-info">
                                    <strong>Obsidian Penthouse (Deposit)</strong>
                                    <span>Oct 15, 2024</span>
                                </div>
                                <div className="tx-amount negative">-₹2,50,000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentsSlide;
