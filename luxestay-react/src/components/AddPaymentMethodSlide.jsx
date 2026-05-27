import React, { useState } from 'react';
import { X, ChevronLeft, CreditCard, Lock, CheckCircle2 } from 'lucide-react';

const AddPaymentMethodSlide = ({ onClose, onBack, user }) => {
    const [cardData, setCardData] = useState({
        number: '',
        holder: '',
        expiry: '',
        cvv: ''
    });
    // ... rest of state ...
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(onBack, 2000);
        }, 1500);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Simple formatting for card number
        let formattedValue = value;
        if (name === 'number') {
            formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        setCardData(prev => ({ ...prev, [name]: formattedValue }));
    };

    if (success) {
        return (
            <div className="notif-slide-overlay" onClick={onClose}>
                <div className="notif-slide-container profile-sub-slide success-state" onClick={e => e.stopPropagation()}>
                    <div className="success-content">
                        <CheckCircle2 size={64} color="#10b981" />
                        <h2>Card Added</h2>
                        <p className="muted">Your new payment method has been successfully saved to your vault.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container profile-sub-slide" onClick={e => e.stopPropagation()}>
                <div className="notif-slide-header">
                    <button className="notif-slide-close" onClick={onBack}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <span className="notif-category">ADD METHOD</span>
                </div>

                <div className="notif-slide-content">
                    <div className="sub-slide-intro">
                        <h1>Add New Card</h1>
                        <p className="muted">Enter your card details to enable faster checkouts.</p>
                    </div>

                    <div className="card-preview-wrap">
                        <div className="payment-card mastercard">
                            <div className="card-top">
                                <div className="card-chip"></div>
                                <span className="card-brand">Mastercard</span>
                            </div>
                            <div className="card-number">{cardData.number || '•••• •••• •••• ••••'}</div>
                            <div className="card-bottom">
                                <div className="card-holder">
                                    <label>HOLDER</label>
                                    <span>{cardData.holder || user?.name || 'YOUR NAME'}</span>
                                </div>
                                <div className="card-expiry">
                                    <label>EXPIRES</label>
                                    <span>{cardData.expiry || 'MM/YY'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Cardholder Name</label>
                        <input 
                            type="text" 
                            name="holder"
                            placeholder={`e.g. ${user?.name || 'Jonathan Thorne'}`}
                            className="form-input" 
                            value={cardData.holder}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Card Number</label>
                        <input 
                            type="text" 
                            name="number"
                            placeholder="0000 0000 0000 0000"
                            className="form-input" 
                            maxLength="19"
                            value={cardData.number}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <label>Expiry Date</label>
                            <input 
                                type="text" 
                                name="expiry"
                                placeholder="MM/YY"
                                className="form-input" 
                                maxLength="5"
                                value={cardData.expiry}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group flex-1">
                            <label>CVV</label>
                            <input 
                                type="password" 
                                name="cvv"
                                placeholder="•••"
                                className="form-input" 
                                maxLength="3"
                                value={cardData.cvv}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="sub-slide-actions mt-2rem">
                        <button 
                            className={`btn btn-dark w-100 ${loading ? 'loading' : ''}`}
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Card'}
                        </button>
                    </div>

                    <div className="security-guarantee">
                        <Lock size={14} />
                        <span>Your data is encrypted and secure.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPaymentMethodSlide;
