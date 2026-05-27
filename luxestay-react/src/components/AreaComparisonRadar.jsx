import React from 'react';
import { X, ChevronLeft, Zap, Wind, Navigation, Coffee, Shield } from 'lucide-react';

const AreaComparisonRadar = ({ onClose, property }) => {
    // Simulated data for radar chart
    const stats = [
        { label: 'Vibe', value: 85, icon: <Wind size={16} />, color: '#8b5cf6' },
        { label: 'Connectivity', value: 70, icon: <Navigation size={16} />, color: '#3b82f6' },
        { label: 'Affordability', value: 45, icon: <Zap size={16} />, color: '#f59e0b' },
        { label: 'Café Density', value: 92, icon: <Coffee size={16} />, color: '#10b981' },
        { label: 'Safety', value: 88, icon: <Shield size={16} />, color: '#ef4444' },
    ];

    const radius = 100;
    const center = 150;
    
    // Calculate points for the polygon
    const points = stats.map((s, i) => {
        const angle = (i * 2 * Math.PI) / stats.length - Math.PI / 2;
        const r = (s.value / 100) * radius;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle)
        };
    });

    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <div className="gallery-overlay">
            <div className="gallery-header">
                <button className="gallery-back-btn" onClick={onClose}>
                    <ChevronLeft size={24} /> <span>Back</span>
                </button>
            </div>
            <div className="gallery-scroll-container">
                <div className="gallery-content" style={{ maxWidth: 620, margin: '0 auto' }}>
                    <div className="budget-header">
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎡</div>
                        <h1>Area Personality Radar</h1>
                        <p style={{ color: '#64748b' }}>How does {property.location.split(',')[0]} stack up? Our radar analyzes 12,000+ data points to give you the real vibe.</p>
                    </div>

                    <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                            <svg width="300" height="300" viewBox="0 0 300 300">
                                {/* Grid Circles */}
                                {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
                                    <circle 
                                        key={scale}
                                        cx={center} 
                                        cy={center} 
                                        r={radius * scale} 
                                        fill="none" 
                                        stroke="#f1f5f9" 
                                        strokeWidth="1"
                                    />
                                ))}
                                
                                {/* Axis Lines */}
                                {stats.map((_, i) => {
                                    const angle = (i * 2 * Math.PI) / stats.length - Math.PI / 2;
                                    return (
                                        <line 
                                            key={i}
                                            x1={center} 
                                            y1={center} 
                                            x2={center + radius * Math.cos(angle)} 
                                            y2={center + radius * Math.sin(angle)} 
                                            stroke="#f1f5f9" 
                                            strokeWidth="1"
                                        />
                                    );
                                })}

                                {/* Data Polygon */}
                                <polygon 
                                    points={polygonPoints} 
                                    fill="rgba(139, 92, 246, 0.2)" 
                                    stroke="#8b5cf6" 
                                    strokeWidth="3"
                                    strokeLinejoin="round"
                                />

                                {/* Data Points */}
                                {points.map((p, i) => (
                                    <circle 
                                        key={i}
                                        cx={p.x} 
                                        cy={p.y} 
                                        r="4" 
                                        fill="#8b5cf6"
                                    />
                                ))}
                            </svg>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {stats.map(s => (
                                <div key={s.label} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '0.5rem', background: 'white', borderRadius: '8px', color: s.color, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                        {s.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{s.label}</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{s.value}%</div>
                                    </div>
                                    <div style={{ width: '40px', height: '40px', position: 'relative' }}>
                                        <svg width="40" height="40" viewBox="0 0 40 40">
                                            <circle cx="20" cy="20" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                            <circle 
                                                cx="20" 
                                                cy="20" 
                                                r="15" 
                                                fill="none" 
                                                stroke={s.color} 
                                                strokeWidth="3" 
                                                strokeDasharray={`${s.value * 0.94} 100`} 
                                                strokeLinecap="round"
                                                transform="rotate(-90 20 20)"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', background: '#f0fdf4', padding: '1.5rem', borderRadius: '16px', border: '1px solid #dcfce7' }}>
                        <h3 style={{ color: '#166534', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Navigation size={20} /> Neighborhood Verdict
                        </h3>
                        <p style={{ color: '#15803d', lineHeight: 1.6 }}>
                            This area is a <strong>Café Lover's Paradise</strong>. While affordability is lower than average, the high safety and connectivity scores make it a premium choice for young professionals who value a "walkable" lifestyle.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreaComparisonRadar;
