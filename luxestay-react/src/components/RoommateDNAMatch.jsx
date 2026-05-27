import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Users, Sparkles, Home, Target } from 'lucide-react';

const questions = [
    {
        id: 'sleep',
        question: '🌙 When do you usually sleep?',
        options: ['Before 10 PM (Early Bird)', '10 PM – 12 AM (Moderate)', 'After 12 AM (Night Owl)']
    },
    {
        id: 'noise',
        question: '🔊 How do you feel about noise at home?',
        options: ['Very sensitive — I need silence', 'Some noise is okay', 'I love music & activity']
    },
    {
        id: 'cleanliness',
        question: '🧹 Your cleanliness standard?',
        options: ['Spotless — I clean every day', 'Clean but not obsessive', 'Relaxed about tidiness']
    },
    {
        id: 'guests',
        question: '🚪 How often do you have guests?',
        options: ['Rarely — I value privacy', 'Occasionally on weekends', 'Frequently — very social']
    },
    {
        id: 'cooking',
        question: '🍳 Cooking habits?',
        options: ['Daily home cooking', 'Sometimes cook, sometimes order', 'Mostly order food online']
    },
    {
        id: 'work',
        question: '💻 Work from home frequency?',
        options: ['I work from home every day', 'Hybrid — few days a week', 'Rarely / I work at office']
    },
    {
        id: 'pets',
        question: '🐾 Pet preference?',
        options: ['I have / love pets', 'Indifferent to pets', 'Prefer a pet-free home']
    },
    {
        id: 'weekends',
        question: '🕺 Weekend vibes?',
        options: ['Stay in and relax (Netflix/Books)', 'Out and about (Shopping/Cafe)', 'Party and social events']
    }
];

const RoommateDNAMatch = ({ onClose, navigateTo }) => {
    const totalSteps = questions.length;
    const [step, setStep] = useState(0); // 0 = intro, 1-8 = questions, 9 = result
    const [answers, setAnswers] = useState({});

    const currentQ = step >= 1 && step <= totalSteps ? questions[step - 1] : null;

    const handleAnswer = (answer) => {
        setAnswers(prev => ({ ...prev, [currentQ.id]: answer }));
        if (step < totalSteps) setStep(s => s + 1);
        else setStep(totalSteps + 1);
    };

    const computeScore = () => {
        const vals = Object.values(answers);
        let score = 75;
        // Logic for score calculation
        if (answers.work === 'I work from home every day' && answers.noise === 'Very sensitive — I need silence') score += 12;
        if (answers.pets === 'I have / love pets') score += 8;
        if (answers.weekends === 'Stay in and relax (Netflix/Books)') score += 5;
        score = Math.min(score, 99);
        return score;
    };

    return (
        <div className="gallery-overlay">
            <div className="gallery-header">
                <button className="gallery-back-btn" onClick={onClose}>
                    <ChevronLeft size={24} /> <span>Back</span>
                </button>
            </div>
            <div className="gallery-scroll-container">
                <div className="gallery-content" style={{ maxWidth: 650, margin: '0 auto' }}>

                    {step === 0 && (
                        <div className="dna-intro">
                            <div className="dna-hero-icon" style={{ background: 'linear-gradient(135deg, #f43f5e, #fb7185)', color: 'white' }}>
                                <Sparkles size={32} />
                            </div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lifestyle Compatibility Finder</h1>
                            <p style={{ fontSize: '1.1rem', color: '#475569' }}>
                                Don't just find a house, find a home that matches your soul. Our 2-minute lifestyle quiz analyzes your habits to suggest the perfect properties and compatible flatmates.
                            </p>
                            
                            <div className="dna-feature-list" style={{ marginTop: '2.5rem' }}>
                                <div className="dna-feature"><div className="feature-dot"></div> 🌙 Sleep & Noise Sync</div>
                                <div className="dna-feature"><div className="feature-dot"></div> 🧹 Household Harmony</div>
                                <div className="dna-feature"><div className="feature-dot"></div> 🐾 Pet & Work Matching</div>
                                <div className="dna-feature"><div className="feature-dot"></div> 🕺 Social Vibe Alignment</div>
                            </div>

                            <button className="search-homes-btn" style={{ height: '60px', fontSize: '1.2rem', marginTop: '3rem' }} onClick={() => setStep(1)}>
                                Discover My Perfect Match →
                            </button>
                            <p className="muted" style={{ marginTop: '1rem', textAlign: 'center' }}>Takes about 2 minutes • No personal data shared</p>
                        </div>
                    )}

                    {step >= 1 && step <= totalSteps && currentQ && (
                        <div className="dna-question-card">
                            <div className="dna-progress">
                                <span style={{ fontWeight: 700, color: '#0f172a' }}>Step {step}</span> of {totalSteps}
                                <div className="dna-progress-dots">
                                    {questions.map((_, i) => (
                                        <span key={i} className={`dna-dot ${i + 1 <= step ? 'active' : ''}`}></span>
                                    ))}
                                </div>
                            </div>
                            <h2 style={{ fontSize: '1.8rem', marginTop: '1rem' }}>{currentQ.question}</h2>
                            <div className="dna-options">
                                {currentQ.options.map(opt => (
                                    <button
                                        key={opt}
                                        className={`dna-option-btn ${answers[currentQ.id] === opt ? 'selected' : ''}`}
                                        onClick={() => handleAnswer(opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {step > 1 && (
                                <button className="clear-all-btn" style={{ marginTop: '1.5rem', background: '#f1f5f9' }} onClick={() => setStep(s => s - 1)}>
                                    ← Back to Previous
                                </button>
                            )}
                        </div>
                    )}

                    {step === totalSteps + 1 && (
                        <div className="dna-result">
                            <div className="dna-result-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div className="dna-score-circle" style={{ width: '120px', height: '120px', border: '6px solid #f43f5e' }}>
                                    <div className="dna-score-number" style={{ fontSize: '2.2rem' }}>{computeScore()}%</div>
                                </div>
                                <h2 style={{ marginTop: '1.5rem', fontSize: '2rem' }}>Your Vibe Profile</h2>
                            </div>
                            
                            <div className="dna-summary-card" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                                <h4 style={{ color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                    <Target size={18} color="#f43f5e" /> Personalized Suggestions
                                </h4>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                                    We've analyzed your lifestyle. You thrive in {answers.noise === 'Very sensitive — I need silence' ? 'peaceful, quiet' : 'lively'} environments and value {answers.cleanliness === 'Spotless — I clean every day' ? 'utmost cleanliness' : 'a balanced home'}.
                                </p>
                            </div>

                            <div className="dna-trait-list" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                {Object.entries(answers).slice(0, 6).map(([key, val]) => (
                                    <div key={key} className="dna-trait-item" style={{ background: 'white', padding: '1rem', border: '1px solid #f1f5f9' }}>
                                        <Heart size={14} style={{ color: '#f43f5e', flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.85rem' }}>{val}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="dna-action-box" style={{ background: '#0f172a', padding: '2rem', borderRadius: '20px', marginTop: '2rem', color: 'white' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '12px' }}><Home size={24} /></div>
                                    <h3 style={{ margin: 0 }}>Matching Houses Found</h3>
                                </div>
                                <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    We found 12 properties that specifically match your sleep schedule and pet preferences.
                                </p>
                                <button className="btn btn-dark" style={{ width: '100%', background: '#f43f5e', border: 'none', height: '50px', fontWeight: 700 }} onClick={() => {
                                    if (navigateTo) navigateTo('search-view');
                                    onClose();
                                }}>
                                    View Matched Homes
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoommateDNAMatch;
