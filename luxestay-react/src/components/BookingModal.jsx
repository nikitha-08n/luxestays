import React, { useState } from 'react';
import {
  X, ChevronLeft, CheckCircle2, CreditCard, Smartphone, Building2,
  MapPin, Calendar, Users, Shield, Star, Copy, Download, LayoutDashboard,
  Lock, Info, ChevronDown
} from 'lucide-react';

const STEPS = ['Trip Summary', 'Payment', 'Confirmed'];

const BookingModal = ({ onClose, navigateTo }) => {
  const [step, setStep] = useState(0);
  const [paymentTab, setPaymentTab] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');
  const [copied, setCopied] = useState(false);

  const bookingRef = 'LUX-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const formatCard = (val) => {
    return val
      .replace(/\D/g, '')
      .substring(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').substring(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2);
    return clean;
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(bookingRef).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bm-container">

        {/* Header */}
        <div className="bm-header">
          <div className="bm-header-left">
            {step > 0 && step < 2 && (
              <button className="bm-back-btn" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft size={20} />
              </button>
            )}
            <span className="bm-title">
              {step === 0 && 'Review your trip'}
              {step === 1 && 'Secure payment'}
              {step === 2 && 'Booking confirmed!'}
            </span>
          </div>
          <button className="bm-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bm-progress-bar">
          {STEPS.map((label, i) => (
            <div key={label} className={`bm-progress-step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="bm-step-circle">
                {i < step ? <CheckCircle2 size={16} /> : <span>{i + 1}</span>}
              </div>
              <span className="bm-step-label">{label}</span>
              {i < STEPS.length - 1 && <div className={`bm-step-line ${i < step ? 'done' : ''}`} />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="bm-body">

          {/* ─── STEP 1: TRIP SUMMARY ─── */}
          {step === 0 && (
            <div className="bm-slide">
              <div className="bm-property-row">
                <div
                  className="bm-property-img"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613490908592-fd5e16f310f8?auto=format&fit=crop&w=400&q=80')" }}
                />
                <div className="bm-property-meta">
                  <span className="bm-prop-type">Entire Estate · Malibu</span>
                  <h3 className="bm-prop-name">The Azure Pavilion Oceanfront Estate</h3>
                  <div className="bm-prop-rating">
                    <Star size={14} style={{ fill: 'currentColor', color: '#f59e0b' }} />
                    <strong>4.92</strong>
                    <span className="muted">· 128 reviews</span>
                  </div>
                </div>
              </div>

              <div className="bm-section-title">Your trip details</div>
              <div className="bm-detail-rows">
                <div className="bm-detail-row">
                  <div className="bm-detail-icon"><Calendar size={18} /></div>
                  <div>
                    <div className="bm-detail-label">Dates</div>
                    <div className="bm-detail-value">May 12 – 18, 2024 · 6 nights</div>
                  </div>
                </div>
                <div className="bm-detail-row">
                  <div className="bm-detail-icon"><Users size={18} /></div>
                  <div>
                    <div className="bm-detail-label">Guests</div>
                    <div className="bm-detail-value">2 guests, 1 infant</div>
                  </div>
                </div>
                <div className="bm-detail-row">
                  <div className="bm-detail-icon"><MapPin size={18} /></div>
                  <div>
                    <div className="bm-detail-label">Location</div>
                    <div className="bm-detail-value">Malibu, California, United States</div>
                  </div>
                </div>
              </div>

              <div className="bm-divider" />

              <div className="bm-section-title">Price breakdown</div>
              <div className="bm-price-rows">
                <div className="bm-price-row">
                  <span>₹1,00,000 × 6 nights</span><span>₹6,00,000</span>
                </div>
                <div className="bm-price-row">
                  <span>Cleaning fee</span><span>₹20,000</span>
                </div>
                <div className="bm-price-row">
                  <span>LuxeStay service fee</span><span>₹71,200</span>
                </div>
                <div className="bm-price-row muted-row">
                  <span>Taxes (GST 18%)</span><span>₹1,24,416</span>
                </div>
              </div>
              <div className="bm-divider" />
              <div className="bm-price-row total-row">
                <span>Total</span><span>₹8,15,616</span>
              </div>

              <div className="bm-policy-box">
                <Shield size={16} />
                <div>
                  <strong>Flexible cancellation</strong>
                  <p>Free cancellation before May 10. Cancel before May 12 for a partial refund.</p>
                </div>
              </div>

              <button className="bm-cta-btn" onClick={() => setStep(1)}>
                Continue to Payment
              </button>
              <p className="bm-footer-note"><Lock size={13} /> Your payment info is encrypted and secure</p>
            </div>
          )}

          {/* ─── STEP 2: PAYMENT ─── */}
          {step === 1 && (
            <div className="bm-slide">
              <div className="bm-pay-amount-banner">
                <span className="bm-pay-label">Amount due today</span>
                <span className="bm-pay-amount">₹8,15,616</span>
              </div>

              {/* Payment Method Tabs */}
              <div className="bm-pay-tabs">
                <button
                  className={`bm-pay-tab ${paymentTab === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentTab('card')}
                >
                  <CreditCard size={16} /> Card
                </button>
                <button
                  className={`bm-pay-tab ${paymentTab === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentTab('upi')}
                >
                  <Smartphone size={16} /> UPI
                </button>
                <button
                  className={`bm-pay-tab ${paymentTab === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setPaymentTab('netbanking')}
                >
                  <Building2 size={16} /> Net Banking
                </button>
              </div>

              {/* ── Card ── */}
              {paymentTab === 'card' && (
                <div className="bm-pay-section">
                  <div className="bm-card-preview">
                    <div className="bm-card-chip" />
                    <div className="bm-card-number-preview">
                      {cardData.number || '•••• •••• •••• ••••'}
                    </div>
                    <div className="bm-card-bottom">
                      <div>
                        <div className="bm-card-field-label">Card Holder</div>
                        <div className="bm-card-field-val">{cardData.name || 'YOUR NAME'}</div>
                      </div>
                      <div>
                        <div className="bm-card-field-label">Expires</div>
                        <div className="bm-card-field-val">{cardData.expiry || 'MM/YY'}</div>
                      </div>
                      <div className="bm-card-logo">VISA</div>
                    </div>
                  </div>

                  <div className="bm-form-group">
                    <label className="bm-label">Card Number</label>
                    <div className="bm-input-icon-wrap">
                      <input
                        className="bm-input"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={e => setCardData(d => ({ ...d, number: formatCard(e.target.value) }))}
                        maxLength={19}
                      />
                      <CreditCard size={16} className="bm-input-icon" />
                    </div>
                  </div>
                  <div className="bm-form-group">
                    <label className="bm-label">Cardholder Name</label>
                    <input
                      className="bm-input"
                      placeholder="As printed on card"
                      value={cardData.name}
                      onChange={e => setCardData(d => ({ ...d, name: e.target.value }))}
                    />
                  </div>
                  <div className="bm-form-row">
                    <div className="bm-form-group">
                      <label className="bm-label">Expiry Date</label>
                      <input
                        className="bm-input"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={e => setCardData(d => ({ ...d, expiry: formatExpiry(e.target.value) }))}
                        maxLength={5}
                      />
                    </div>
                    <div className="bm-form-group">
                      <label className="bm-label">CVV <Info size={12} className="bm-info-icon" /></label>
                      <input
                        className="bm-input"
                        placeholder="•••"
                        type="password"
                        value={cardData.cvv}
                        onChange={e => setCardData(d => ({ ...d, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="bm-form-group">
                    <label className="bm-label">Billing Address</label>
                    <input className="bm-input" placeholder="Street address" style={{ marginBottom: '0.75rem' }} />
                    <div className="bm-form-row">
                      <input className="bm-input" placeholder="City" />
                      <input className="bm-input" placeholder="PIN Code" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── UPI ── */}
              {paymentTab === 'upi' && (
                <div className="bm-pay-section">
                  <p className="bm-upi-subtitle">Enter your UPI ID or choose an app to pay</p>
                  <div className="bm-form-group">
                    <label className="bm-label">UPI ID</label>
                    <div className="bm-input-icon-wrap">
                      <input
                        className="bm-input"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                      />
                      <Smartphone size={16} className="bm-input-icon" />
                    </div>
                  </div>
                  <div className="bm-upi-divider"><span>or pay using</span></div>
                  <div className="bm-upi-apps">
                    {[
                      { name: 'Google Pay', color: '#4285f4', letter: 'G' },
                      { name: 'PhonePe', color: '#5f259f', letter: 'Ph' },
                      { name: 'Paytm', color: '#00baf2', letter: 'Pt' },
                      { name: 'BHIM', color: '#ff6600', letter: 'B' },
                    ].map(app => (
                      <button key={app.name} className="bm-upi-app-btn">
                        <div className="bm-upi-app-icon" style={{ background: app.color }}>
                          {app.letter}
                        </div>
                        <span>{app.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="bm-upi-info">
                    <Shield size={14} />
                    <span>UPI payments are processed via RBI-approved gateways. Your money is safe.</span>
                  </div>
                </div>
              )}

              {/* ── Net Banking ── */}
              {paymentTab === 'netbanking' && (
                <div className="bm-pay-section">
                  <p className="bm-upi-subtitle">Select your bank and pay securely</p>
                  <div className="bm-bank-grid">
                    {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra'].map(b => (
                      <button
                        key={b}
                        className={`bm-bank-btn ${bank === b ? 'active' : ''}`}
                        onClick={() => setBank(b)}
                      >
                        <div className="bm-bank-icon">
                          {b.split(' ')[0].charAt(0)}
                        </div>
                        <span>{b}</span>
                      </button>
                    ))}
                  </div>
                  <div className="bm-form-group" style={{ marginTop: '1.5rem' }}>
                    <label className="bm-label">Or select another bank</label>
                    <div className="bm-select-wrap">
                      <select className="bm-select" value={bank} onChange={e => setBank(e.target.value)}>
                        <option value="">Choose bank…</option>
                        {['Bank of Baroda', 'Punjab National Bank', 'Yes Bank', 'IndusInd Bank', 'Federal Bank', 'Canara Bank'].map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="bm-select-icon" />
                    </div>
                  </div>
                  <div className="bm-upi-info">
                    <Building2 size={14} />
                    <span>You will be redirected to your bank's secure login page to authorize the payment.</span>
                  </div>
                </div>
              )}

              <button className="bm-cta-btn" onClick={() => setStep(2)}>
                <Lock size={16} /> Confirm &amp; Pay ₹8,15,616
              </button>
              <p className="bm-footer-note"><Shield size={13} /> 256-bit SSL encrypted · PCI DSS compliant</p>
            </div>
          )}

          {/* ─── STEP 3: CONFIRMATION ─── */}
          {step === 2 && (
            <div className="bm-slide bm-confirm-slide">
              <div className="bm-confirm-icon-wrap">
                <div className="bm-confirm-ring" />
                <div className="bm-confirm-icon">
                  <CheckCircle2 size={48} />
                </div>
              </div>

              <h2 className="bm-confirm-heading">Booking Confirmed!</h2>
              <p className="bm-confirm-sub">
                Your stay at The Azure Pavilion has been reserved. A confirmation email has been sent to your inbox.
              </p>

              <div className="bm-booking-ref-card">
                <span className="bm-ref-label">Booking Reference</span>
                <div className="bm-ref-row">
                  <span className="bm-ref-code">{bookingRef}</span>
                  <button className="bm-copy-btn" onClick={handleCopyRef}>
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="bm-confirm-details">
                <div className="bm-confirm-detail-row">
                  <Calendar size={18} />
                  <div>
                    <div className="bm-detail-label">Check-in</div>
                    <div className="bm-detail-value">May 12, 2024 · After 3:00 PM</div>
                  </div>
                </div>
                <div className="bm-confirm-detail-row">
                  <Calendar size={18} />
                  <div>
                    <div className="bm-detail-label">Check-out</div>
                    <div className="bm-detail-value">May 18, 2024 · Before 11:00 AM</div>
                  </div>
                </div>
                <div className="bm-confirm-detail-row">
                  <MapPin size={18} />
                  <div>
                    <div className="bm-detail-label">Address</div>
                    <div className="bm-detail-value">Malibu, California, United States</div>
                  </div>
                </div>
                <div className="bm-confirm-detail-row">
                  <CreditCard size={18} />
                  <div>
                    <div className="bm-detail-label">Amount Charged</div>
                    <div className="bm-detail-value">₹8,15,616</div>
                  </div>
                </div>
              </div>

              <div className="bm-confirm-actions">
                <button
                  className="bm-cta-btn"
                  onClick={() => { onClose(); navigateTo && navigateTo('dashboard-view'); }}
                >
                  <LayoutDashboard size={16} /> Go to Dashboard
                </button>
                <button className="bm-outline-btn">
                  <Download size={16} /> Download Receipt
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingModal;
