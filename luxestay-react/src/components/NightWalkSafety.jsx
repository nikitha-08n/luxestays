import React, { useState } from 'react';
import { Sun, Moon, Lightbulb, Users, Shield, ShoppingBag, Car, AlertTriangle } from 'lucide-react';

const timeSlots = [
    { hour: 6, label: '6 AM', period: 'Early Morning', lighting: 90, crowd: 30, police: 60, shops: 20, transport: 40, safety: 85, bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
    { hour: 7, label: '7 AM', period: 'Morning', lighting: 95, crowd: 50, police: 70, shops: 40, transport: 70, safety: 92, bg: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)' },
    { hour: 8, label: '8 AM', period: 'Morning Rush', lighting: 100, crowd: 80, police: 75, shops: 60, transport: 90, safety: 95, bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' },
    { hour: 10, label: '10 AM', period: 'Late Morning', lighting: 100, crowd: 65, police: 65, shops: 90, transport: 85, safety: 95, bg: 'linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)' },
    { hour: 12, label: '12 PM', period: 'Afternoon', lighting: 100, crowd: 70, police: 60, shops: 95, transport: 80, safety: 93, bg: 'linear-gradient(135deg, #eff6ff 0%, #bfdbfe 100%)' },
    { hour: 15, label: '3 PM', period: 'Afternoon', lighting: 100, crowd: 60, police: 55, shops: 95, transport: 75, safety: 90, bg: 'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)' },
    { hour: 17, label: '5 PM', period: 'Evening', lighting: 85, crowd: 85, police: 70, shops: 90, transport: 95, safety: 88, bg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)' },
    { hour: 19, label: '7 PM', period: 'Evening', lighting: 65, crowd: 75, police: 65, shops: 70, transport: 80, safety: 78, bg: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)' },
    { hour: 21, label: '9 PM', period: 'Night', lighting: 50, crowd: 40, police: 55, shops: 30, transport: 50, safety: 62, bg: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' },
    { hour: 23, label: '11 PM', period: 'Late Night', lighting: 35, crowd: 15, police: 45, shops: 10, transport: 25, safety: 45, bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' },
    { hour: 0, label: '12 AM', period: 'Midnight', lighting: 30, crowd: 8, police: 40, shops: 5, transport: 15, safety: 38, bg: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)' },
];

const getBarColor = (val) => val >= 75 ? '#16a34a' : val >= 50 ? '#f59e0b' : val >= 25 ? '#f97316' : '#e11d48';
const getLabel = (val) => val >= 75 ? 'High' : val >= 50 ? 'Moderate' : val >= 25 ? 'Low' : 'Very Low';
const getSafetyLabel = (val) => val >= 85 ? '🟢 Very Safe' : val >= 65 ? '🟡 Generally Safe' : val >= 45 ? '🟠 Caution Advised' : '🔴 Be Alert';

const NightWalkSafety = () => {
    const [sliderIdx, setSliderIdx] = useState(4); // Default to 12 PM
    const slot = timeSlots[sliderIdx];
    const isDark = slot.hour >= 21 || slot.hour <= 5;
    const textColor = isDark ? '#e2e8f0' : '#0f172a';
    const mutedColor = isDark ? '#94a3b8' : '#64748b';

    const metrics = [
        { label: 'Street Lighting', value: slot.lighting, icon: <Lightbulb size={18} /> },
        { label: 'Crowd Density', value: slot.crowd, icon: <Users size={18} /> },
        { label: 'Police Presence', value: slot.police, icon: <Shield size={18} /> },
        { label: 'Shops Open', value: slot.shops, icon: <ShoppingBag size={18} /> },
        { label: 'Transport Available', value: slot.transport, icon: <Car size={18} /> },
    ];

    return (
        <div className="nightwalk-section">
            <h3 className="nightwalk-title">
                {isDark ? <Moon size={20} /> : <Sun size={20} />}
                Night Walk Safety Timeline
                <span className="landlord-unique-badge">UNIQUE TO LUXESTAY</span>
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Drag the slider to see how this neighborhood feels at different times of day.
            </p>

            {/* Time Slider */}
            <div className="nightwalk-slider-wrap">
                <div className="nightwalk-time-labels">
                    {timeSlots.map((ts, i) => (
                        <span key={i} className={`nightwalk-time-label ${i === sliderIdx ? 'active' : ''}`} style={i === sliderIdx ? { color: isDark ? '#fbbf24' : '#0f172a' } : {}}>
                            {ts.label}
                        </span>
                    ))}
                </div>
                <input
                    type="range"
                    min="0"
                    max={timeSlots.length - 1}
                    value={sliderIdx}
                    onChange={e => setSliderIdx(parseInt(e.target.value))}
                    className="nightwalk-slider"
                />
                <div className="nightwalk-slider-gradient"></div>
            </div>

            {/* Current Time Display */}
            <div className="nightwalk-display" style={{ background: slot.bg }}>
                <div className="nightwalk-period" style={{ color: textColor }}>
                    <div className="nightwalk-period-icon">
                        {isDark ? <Moon size={28} color="#fbbf24" /> : <Sun size={28} color="#f59e0b" />}
                    </div>
                    <div>
                        <div className="nightwalk-period-time" style={{ color: textColor }}>{slot.label}</div>
                        <div className="nightwalk-period-name" style={{ color: mutedColor }}>{slot.period}</div>
                    </div>
                    <div className="nightwalk-safety-badge" style={{ background: getBarColor(slot.safety) + '22', color: getBarColor(slot.safety) }}>
                        {getSafetyLabel(slot.safety)}
                    </div>
                </div>

                {/* Safety Score */}
                <div className="nightwalk-score">
                    <div className="nightwalk-score-number" style={{ color: getBarColor(slot.safety) }}>{slot.safety}</div>
                    <div className="nightwalk-score-label" style={{ color: mutedColor }}>Safety Score</div>
                    <div className="nightwalk-score-bar">
                        <div className="nightwalk-score-bar-fill" style={{ width: `${slot.safety}%`, background: getBarColor(slot.safety) }}></div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="nightwalk-metrics">
                    {metrics.map(m => (
                        <div key={m.label} className="nightwalk-metric" style={{ color: textColor }}>
                            <div className="nightwalk-metric-icon" style={{ color: getBarColor(m.value) }}>{m.icon}</div>
                            <div className="nightwalk-metric-info">
                                <div className="nightwalk-metric-label" style={{ color: mutedColor }}>{m.label}</div>
                                <div className="nightwalk-metric-bar">
                                    <div className="nightwalk-metric-bar-fill" style={{ width: `${m.value}%`, background: getBarColor(m.value) }}></div>
                                </div>
                                <div className="nightwalk-metric-value">{getLabel(m.value)}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {slot.safety < 50 && (
                    <div className="nightwalk-warning">
                        <AlertTriangle size={16} />
                        <span>Consider carrying a companion and sticking to well-lit main roads at this hour.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NightWalkSafety;
