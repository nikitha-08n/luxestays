import React, { useState } from 'react';
import { Star, Zap, Wallet, Wrench, Heart, ClipboardList, Award, ChevronRight } from 'lucide-react';

const ratingDimensions = [
    { id: 'response', label: 'Response Speed', icon: Zap, emoji: '⚡', desc: 'How quickly does the landlord respond to calls/messages?' },
    { id: 'deposit', label: 'Deposit Fairness', icon: Wallet, emoji: '💰', desc: 'Fair deposit terms? Returns deposit on time?' },
    { id: 'maintenance', label: 'Maintenance Speed', icon: Wrench, emoji: '🔧', desc: 'How fast are repairs and issues resolved?' },
    { id: 'behavior', label: 'Behavior & Respect', icon: Heart, emoji: '🤝', desc: 'Respectful of privacy? Professional dealings?' },
    { id: 'transparency', label: 'Transparency', icon: ClipboardList, emoji: '📋', desc: 'No hidden charges? Clear about rules upfront?' },
];

// Simulated existing ratings (would come from backend)
const existingRatings = {
    response: { avg: 4.2, count: 34 },
    deposit: { avg: 3.8, count: 28 },
    maintenance: { avg: 3.5, count: 31 },
    behavior: { avg: 4.5, count: 38 },
    transparency: { avg: 4.0, count: 25 },
};

const getLetterGrade = (avg) => {
    if (avg >= 4.5) return { grade: 'A+', color: '#16a34a', bg: '#dcfce7', label: 'Outstanding' };
    if (avg >= 4.0) return { grade: 'A', color: '#22c55e', bg: '#dcfce7', label: 'Excellent' };
    if (avg >= 3.5) return { grade: 'B+', color: '#84cc16', bg: '#f0fdf4', label: 'Very Good' };
    if (avg >= 3.0) return { grade: 'B', color: '#f59e0b', bg: '#fef9c3', label: 'Good' };
    if (avg >= 2.5) return { grade: 'C', color: '#f97316', bg: '#fff7ed', label: 'Average' };
    if (avg >= 2.0) return { grade: 'D', color: '#e11d48', bg: '#ffe4e6', label: 'Below Average' };
    return { grade: 'F', color: '#dc2626', bg: '#fef2f2', label: 'Poor' };
};

const LandlordReportCard = () => {
    const [userRatings, setUserRatings] = useState({});
    const [hoveredStars, setHoveredStars] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const overallAvg = Object.values(existingRatings).reduce((s, r) => s + r.avg, 0) / Object.values(existingRatings).length;
    const gradeInfo = getLetterGrade(overallAvg);
    const totalReviews = Math.max(...Object.values(existingRatings).map(r => r.count));

    const handleStarClick = (dimId, star) => {
        setUserRatings(prev => ({ ...prev, [dimId]: star }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setShowForm(false);
    };

    const filledCount = Object.values(userRatings).length;

    return (
        <div className="landlord-card-section">
            <h3 className="landlord-card-title">
                <Award size={20} /> Landlord Report Card
                <span className="landlord-unique-badge">UNIQUE TO LUXESTAY</span>
            </h3>

            {/* Grade Display */}
            <div className="landlord-grade-display">
                <div className="landlord-grade-circle" style={{ background: gradeInfo.bg, color: gradeInfo.color }}>
                    <div className="landlord-grade-letter">{gradeInfo.grade}</div>
                </div>
                <div className="landlord-grade-info">
                    <div className="landlord-grade-label" style={{ color: gradeInfo.color }}>{gradeInfo.label}</div>
                    <div className="landlord-grade-meta">Based on {totalReviews} tenant reviews</div>
                    <div className="landlord-grade-avg">Overall: {overallAvg.toFixed(1)} / 5.0</div>
                </div>
            </div>

            {/* Dimension Ratings */}
            <div className="landlord-dims">
                {ratingDimensions.map(dim => {
                    const data = existingRatings[dim.id];
                    const pct = (data.avg / 5) * 100;
                    const dimGrade = getLetterGrade(data.avg);
                    return (
                        <div key={dim.id} className="landlord-dim-row">
                            <div className="landlord-dim-left">
                                <span className="landlord-dim-emoji">{dim.emoji}</span>
                                <div>
                                    <div className="landlord-dim-label">{dim.label}</div>
                                    <div className="landlord-dim-stars">
                                        {[1,2,3,4,5].map(s => (
                                            <span key={s} className={`landlord-star ${s <= Math.round(data.avg) ? 'filled' : ''}`}>★</span>
                                        ))}
                                        <span className="landlord-dim-avg">{data.avg.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="landlord-dim-right">
                                <div className="landlord-dim-bar">
                                    <div className="landlord-dim-bar-fill" style={{ width: `${pct}%`, background: dimGrade.color }}></div>
                                </div>
                                <span className="landlord-dim-grade" style={{ color: dimGrade.color }}>{dimGrade.grade}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Rate This Landlord */}
            {!submitted && !showForm && (
                <button className="landlord-rate-btn" onClick={() => setShowForm(true)}>
                    <Star size={16} /> Rate This Landlord <ChevronRight size={16} />
                </button>
            )}

            {showForm && !submitted && (
                <div className="landlord-form">
                    <h4>Rate Your Experience</h4>
                    {ratingDimensions.map(dim => (
                        <div key={dim.id} className="landlord-form-row">
                            <span>{dim.emoji} {dim.label}</span>
                            <div className="landlord-form-stars">
                                {[1,2,3,4,5].map(s => (
                                    <span
                                        key={s}
                                        className={`landlord-form-star ${s <= (hoveredStars[dim.id] || userRatings[dim.id] || 0) ? 'active' : ''}`}
                                        onClick={() => handleStarClick(dim.id, s)}
                                        onMouseEnter={() => setHoveredStars(prev => ({...prev, [dim.id]: s}))}
                                        onMouseLeave={() => setHoveredStars(prev => ({...prev, [dim.id]: 0}))}
                                    >★</span>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        className="search-homes-btn"
                        style={{ marginTop: '1rem' }}
                        disabled={filledCount < 3}
                        onClick={handleSubmit}
                    >
                        Submit Rating ({filledCount}/5 rated)
                    </button>
                </div>
            )}

            {submitted && (
                <div className="landlord-submitted">
                    <span>✅ Thank you! Your rating has been submitted and helps future tenants.</span>
                </div>
            )}
        </div>
    );
};

export default LandlordReportCard;
