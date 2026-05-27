import React, { useState } from 'react';
import { ChevronLeft, MapPin, Briefcase, Dumbbell, ShoppingCart, Users, Coffee, Target, Navigation } from 'lucide-react';

const locationOptions = [
    "Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Powai",
    "Bandra", "GK II", "Cyber City", "Salt Lake", "Viman Nagar",
    "Anna Nagar", "Gachibowli", "Banjara Hills", "Malleshwaram", "Jayanagar",
    "Sector 62 Noida", "Park Street Kolkata", "Aundh Pune", "Fort Mumbai"
];

const categories = [
    { id: 'office', label: 'Office / College', icon: Briefcase, emoji: '🏢', color: '#3b82f6' },
    { id: 'gym', label: 'Gym / Fitness', icon: Dumbbell, emoji: '🏋️', color: '#e11d48' },
    { id: 'grocery', label: 'Grocery Store', icon: ShoppingCart, emoji: '🛒', color: '#16a34a' },
    { id: 'friends', label: 'Friends / Family', icon: Users, emoji: '👥', color: '#8b5cf6' },
    { id: 'hangout', label: 'Hangout Spot', icon: Coffee, emoji: '☕', color: '#f59e0b' },
];

// Simulated distance/time data
const getCommuteData = (from, to) => {
    if (!from || !to) return null;
    // Generate deterministic but varied data based on string hash
    const hash = (from + to).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const sameArea = from.toLowerCase().includes(to.toLowerCase().substring(0, 4));
    const base = sameArea ? 5 : 15 + (hash % 35);
    return {
        time: base,
        distance: (base * 0.8).toFixed(1),
        mode: base <= 10 ? 'Walking' : base <= 25 ? 'Auto/Metro' : 'Bus/Cab'
    };
};

const LifeFitScore = ({ property, onClose }) => {
    const [destinations, setDestinations] = useState({});
    const [showResult, setShowResult] = useState(false);

    const propertyArea = property?.location?.split(',')[0]?.trim() || 'Koramangala';

    const updateDest = (catId, value) => {
        setDestinations(prev => ({ ...prev, [catId]: value }));
        setShowResult(false);
    };

    const filledCount = Object.values(destinations).filter(Boolean).length;

    const computeScore = () => {
        const filled = categories.filter(c => destinations[c.id]);
        if (filled.length === 0) return { score: 0, breakdown: [] };

        const breakdown = filled.map(cat => {
            const commute = getCommuteData(propertyArea, destinations[cat.id]);
            const convenience = commute.time <= 10 ? 100 : commute.time <= 20 ? 80 : commute.time <= 30 ? 60 : commute.time <= 45 ? 40 : 20;
            return { ...cat, commute, convenience };
        });

        const avgScore = Math.round(breakdown.reduce((s, b) => s + b.convenience, 0) / breakdown.length);
        return { score: avgScore, breakdown };
    };

    const handleCalculate = () => setShowResult(true);
    const result = showResult ? computeScore() : null;
    const scoreColor = result?.score >= 75 ? '#16a34a' : result?.score >= 50 ? '#f59e0b' : '#e11d48';
    const scoreLabel = result?.score >= 75 ? 'Excellent Fit!' : result?.score >= 50 ? 'Good Fit' : 'Consider Other Options';

    return (
        <div className="gallery-overlay">
            <div className="gallery-header">
                <button className="gallery-back-btn" onClick={onClose}>
                    <ChevronLeft size={24} /> <span>Back</span>
                </button>
            </div>
            <div className="gallery-scroll-container">
                <div className="gallery-content" style={{ maxWidth: 650, margin: '0 auto' }}>
                    <div className="lifefit-intro">
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎯</div>
                        <h1>Life Fit Score</h1>
                        <p style={{ color: '#64748b' }}>
                            Enter where you go daily — we'll calculate how well <strong>{property?.title || 'this property'}</strong> fits YOUR lifestyle.
                        </p>
                        <div className="lifefit-property-badge">
                            <MapPin size={14} /> {propertyArea}
                        </div>
                    </div>

                    <div className="lifefit-inputs">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            return (
                                <div key={cat.id} className="lifefit-input-row">
                                    <div className="lifefit-input-label">
                                        <div className="lifefit-icon" style={{ background: cat.color + '18', color: cat.color }}>
                                            <Icon size={18} />
                                        </div>
                                        <span>{cat.label}</span>
                                    </div>
                                    <select
                                        className="form-input lifefit-select"
                                        value={destinations[cat.id] || ''}
                                        onChange={e => updateDest(cat.id, e.target.value)}
                                    >
                                        <option value="">Select area...</option>
                                        {locationOptions.map(loc => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        })}
                    </div>

                    {filledCount >= 2 && !showResult && (
                        <button className="search-homes-btn" onClick={handleCalculate}>
                            <Target size={18} /> Calculate Life Fit Score
                        </button>
                    )}
                    {filledCount < 2 && (
                        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', marginTop: '1rem' }}>
                            Fill at least 2 destinations to calculate your score
                        </p>
                    )}

                    {result && (
                        <div className="lifefit-result">
                            <div className="lifefit-score-ring" style={{ '--fit-color': scoreColor }}>
                                <div className="lifefit-score-number">{result.score}</div>
                                <div className="lifefit-score-label">/ 100</div>
                            </div>
                            <h2 style={{ color: scoreColor }}>{scoreLabel}</h2>

                            <div className="lifefit-breakdown">
                                <h3>📍 Commute Breakdown</h3>
                                {result.breakdown.map(item => (
                                    <div key={item.id} className="lifefit-breakdown-row">
                                        <div className="lifefit-br-left">
                                            <span className="lifefit-br-emoji">{item.emoji}</span>
                                            <div>
                                                <div className="lifefit-br-dest">{destinations[item.id]}</div>
                                                <div className="lifefit-br-cat">{item.label}</div>
                                            </div>
                                        </div>
                                        <div className="lifefit-br-right">
                                            <div className="lifefit-br-time">{item.commute.time} min</div>
                                            <div className="lifefit-br-mode">
                                                <Navigation size={12} /> {item.commute.mode} · {item.commute.distance} km
                                            </div>
                                            <div className="lifefit-br-bar">
                                                <div className="lifefit-br-bar-fill" style={{ width: `${item.convenience}%`, background: item.convenience >= 70 ? '#16a34a' : item.convenience >= 40 ? '#f59e0b' : '#e11d48' }}></div>
                                            </div>
                                        </div>
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

export default LifeFitScore;
