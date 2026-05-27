import React, { useState } from 'react';
import { ChevronLeft, TrendingDown, Zap, Shield, Clock, Star, Trophy, ArrowRight } from 'lucide-react';

const scenarios = [
    {
        id: 1,
        landlordSays: "The rent is fixed at the listed price. I don't negotiate.",
        options: [
            { text: "I'm ready to sign a 12-month lease upfront for a discount", score: 25, tip: "Long lease commitment is the #1 negotiation lever — landlords love guaranteed income." },
            { text: "Okay, I'll pay the full price", score: 0, tip: "Never accept the first price! Most landlords expect some negotiation." },
            { text: "I've seen 3 similar properties nearby for 15% less", score: 20, tip: "Market comparison is powerful. Always research nearby prices before negotiating." }
        ]
    },
    {
        id: 2,
        landlordSays: "This is a premium area, the price is justified.",
        options: [
            { text: "I agree it's premium, but I can pay 3 months advance to offset risk", score: 22, tip: "Advance payment reduces landlord risk — they'll often give 5-10% off for this." },
            { text: "The building is 8+ years old — maintenance costs will be higher", score: 18, tip: "Pointing out age-related maintenance is a fair reason to ask for lower rent." },
            { text: "Can you include utilities (water, maintenance) in the rent?", score: 15, tip: "Bundling utilities is a hidden discount — saves ₹1,000-3,000/month!" }
        ]
    },
    {
        id: 3,
        landlordSays: "I already have 5 people interested in this property.",
        options: [
            { text: "I can move in this weekend — immediate occupancy saves you vacancy days", score: 20, tip: "Every vacant day costs landlords money. Urgency is a strong card!" },
            { text: "I'm a working professional with verified income — zero risk tenant", score: 18, tip: "Landlords value reliable tenants. Highlight your stability." },
            { text: "I'll take care of minor repairs myself and won't bother you often", score: 15, tip: "Low-maintenance tenants are gold. This shows maturity." }
        ]
    },
    {
        id: 4,
        landlordSays: "The security deposit is 2 months rent — that's standard.",
        options: [
            { text: "Can we do 1 month deposit + post-dated cheques for assurance?", score: 20, tip: "Post-dated cheques give landlords security without locking your cash." },
            { text: "I'll agree to 2 months deposit if you reduce monthly rent by ₹1,000", score: 22, tip: "Trading deposit for rent reduction saves you more over a year!" },
            { text: "Fine, 2 months is okay", score: 5, tip: "Always negotiate the deposit — it's one of the easiest things to reduce." }
        ]
    },
    {
        id: 5,
        landlordSays: "This is my final offer. Take it or leave it.",
        options: [
            { text: "I respect that. Can you at least include a fresh paint job before move-in?", score: 18, tip: "If rent won't budge, negotiate non-monetary perks — painting, cleaning, new fixtures." },
            { text: "Let me think about it for a day — I have one more viewing tomorrow", score: 20, tip: "Walking away (politely) is the most powerful move. They'll often call back with a lower offer." },
            { text: "Deal! Let's finalize it right now", score: 8, tip: "Always sleep on it. Rushed decisions lead to overpaying." }
        ]
    }
];

const RentNegotiationSimulator = ({ property, onClose }) => {
    const [step, setStep] = useState(0); // 0=intro, 1-5=rounds, 6=result
    const [totalScore, setTotalScore] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showTip, setShowTip] = useState(null);
    const [animateScore, setAnimateScore] = useState(false);

    const currentScenario = step >= 1 && step <= 5 ? scenarios[step - 1] : null;

    const handleSelect = (option) => {
        setShowTip(option);
        setSelectedOptions(prev => [...prev, option]);
        setTotalScore(prev => prev + option.score);

        setTimeout(() => {
            setShowTip(null);
            if (step < 5) setStep(s => s + 1);
            else {
                setStep(6);
                setTimeout(() => setAnimateScore(true), 300);
            }
        }, 2500);
    };

    const finalScore = totalScore;
    const maxScore = 109; // sum of all best options
    const percentage = Math.round((finalScore / maxScore) * 100);
    const grade = percentage >= 85 ? 'A+' : percentage >= 70 ? 'A' : percentage >= 55 ? 'B+' : percentage >= 40 ? 'B' : percentage >= 25 ? 'C' : 'D';
    const gradeColor = percentage >= 70 ? '#16a34a' : percentage >= 40 ? '#f59e0b' : '#e11d48';
    const monthlySavings = Math.round((percentage / 100) * (property?.price || 15000) * 0.15 / 500) * 500;

    return (
        <div className="gallery-overlay">
            <div className="gallery-header">
                <button className="gallery-back-btn" onClick={onClose}>
                    <ChevronLeft size={24} /> <span>Back</span>
                </button>
            </div>
            <div className="gallery-scroll-container">
                <div className="gallery-content" style={{ maxWidth: 680, margin: '0 auto' }}>

                    {step === 0 && (
                        <div className="negot-intro">
                            <div className="negot-hero-icon">🔮</div>
                            <h1>Rent Negotiation Simulator</h1>
                            <p className="negot-subtitle">Practice negotiating like a pro! Face 5 real landlord scenarios and learn strategies that can save you thousands.</p>
                            <div className="negot-stats-preview">
                                <div className="negot-stat-item">
                                    <Zap size={20} color="#f59e0b" />
                                    <span>5 Real Scenarios</span>
                                </div>
                                <div className="negot-stat-item">
                                    <Shield size={20} color="#3b82f6" />
                                    <span>Pro Tips Each Round</span>
                                </div>
                                <div className="negot-stat-item">
                                    <TrendingDown size={20} color="#16a34a" />
                                    <span>Estimated Savings</span>
                                </div>
                            </div>
                            <button className="search-homes-btn" onClick={() => setStep(1)}>
                                Start Negotiation →
                            </button>
                        </div>
                    )}

                    {step >= 1 && step <= 5 && currentScenario && (
                        <div className="negot-round">
                            <div className="negot-round-header">
                                <span className="negot-round-badge">ROUND {step} OF 5</span>
                                <div className="negot-progress-bar">
                                    <div className="negot-progress-fill" style={{ width: `${(step / 5) * 100}%` }}></div>
                                </div>
                                <div className="negot-score-mini">
                                    <Trophy size={14} color="#f59e0b" />
                                    <span>Score: {totalScore}</span>
                                </div>
                            </div>

                            <div className="negot-landlord-bubble">
                                <div className="negot-landlord-avatar">🏠</div>
                                <div className="negot-landlord-text">
                                    <span className="negot-landlord-name">Landlord says:</span>
                                    <p>"{currentScenario.landlordSays}"</p>
                                </div>
                            </div>

                            <h3 className="negot-choose-label">Choose your response:</h3>

                            <div className="negot-options">
                                {currentScenario.options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        className={`negot-option-btn ${showTip?.text === opt.text ? (opt.score >= 18 ? 'great' : opt.score >= 10 ? 'ok' : 'weak') : ''}`}
                                        onClick={() => !showTip && handleSelect(opt)}
                                        disabled={!!showTip}
                                    >
                                        <span className="negot-opt-text">{opt.text}</span>
                                        {showTip?.text === opt.text && (
                                            <span className="negot-opt-score">+{opt.score} pts</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {showTip && (
                                <div className={`negot-tip-box ${showTip.score >= 18 ? 'great' : showTip.score >= 10 ? 'ok' : 'weak'}`}>
                                    <Star size={16} />
                                    <span>{showTip.tip}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 6 && (
                        <div className="negot-result">
                            <div className={`negot-grade-circle ${animateScore ? 'animate' : ''}`} style={{ '--grade-color': gradeColor }}>
                                <div className="negot-grade-letter">{grade}</div>
                                <div className="negot-grade-label">Negotiator</div>
                            </div>

                            <h2>Your Negotiation Power</h2>
                            <p className="negot-result-subtitle">{percentage}% effectiveness — {percentage >= 70 ? "You're a natural negotiator!" : percentage >= 40 ? "Good start! Practice more to save big." : "Keep learning — every rupee counts!"}</p>

                            <div className="negot-savings-card">
                                <div className="negot-savings-header">
                                    <TrendingDown size={24} color="#16a34a" />
                                    <span>Estimated Savings</span>
                                </div>
                                <div className="negot-savings-grid">
                                    <div className="negot-savings-item">
                                        <div className="negot-savings-amount">₹{monthlySavings.toLocaleString('en-IN')}</div>
                                        <div className="negot-savings-period">per month</div>
                                    </div>
                                    <div className="negot-savings-item highlight">
                                        <div className="negot-savings-amount">₹{(monthlySavings * 12).toLocaleString('en-IN')}</div>
                                        <div className="negot-savings-period">per year</div>
                                    </div>
                                </div>
                            </div>

                            <div className="negot-tips-recap">
                                <h3>📚 Key Takeaways</h3>
                                {selectedOptions.map((opt, idx) => (
                                    <div key={idx} className="negot-recap-item">
                                        <div className={`negot-recap-dot ${opt.score >= 18 ? 'great' : opt.score >= 10 ? 'ok' : 'weak'}`}></div>
                                        <span>{opt.tip}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="search-homes-btn" style={{ marginTop: '1.5rem' }} onClick={onClose}>
                                Back to Property
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RentNegotiationSimulator;
