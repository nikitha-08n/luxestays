import React, { useState } from 'react';
import { X, CheckCircle2, Circle, Camera, AlertTriangle, FileText, ChevronLeft } from 'lucide-react';

const rooms = [
    { id: 'main_room', name: 'Main Room / Bedroom', items: ['Walls (no cracks/stains)', 'Flooring (no damage)', 'Windows & Locks', 'Fans / Light fixtures', 'Door lock & key'] },
    { id: 'kitchen', name: 'Kitchen Area', items: ['Stove / Gas connection', 'Sink & taps', 'Storage shelves', 'Tiles & walls', 'Exhaust / Ventilation'] },
    { id: 'bathroom', name: 'Bathroom', items: ['Flush & cistern', 'Taps & shower', 'Geyser (if provided)', 'Tiles & drainage', 'Door & latch'] },
    { id: 'common', name: 'Common Area / Entrance', items: ['Main door lock', 'Staircase / Lift', 'Corridor lights', 'Parking spot (if any)', 'Mailbox / Intercom'] }
];

const MoveInChecklist = ({ property, onClose }) => {
    const [checks, setChecks] = useState({});
    const [damages, setDamages] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const toggle = (roomId, item) => {
        const key = `${roomId}__${item}`;
        setChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const markDamage = (roomId, item) => {
        const key = `${roomId}__${item}`;
        setDamages(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const totalItems = rooms.reduce((sum, r) => sum + r.items.length, 0);
    const checkedCount = Object.values(checks).filter(Boolean).length;
    const damageCount = Object.values(damages).filter(Boolean).length;
    const progress = Math.round((checkedCount / totalItems) * 100);

    if (submitted) {
        return (
            <div className="gallery-overlay">
                <div className="gallery-content" style={{ maxWidth: 600, margin: '4rem auto', textAlign: 'center', padding: '3rem 2rem' }}>
                    <div className="checklist-success-icon">✅</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Move-In Report Saved!</h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                        Your digital inspection report has been saved.<br />
                        <strong>{checkedCount}/{totalItems}</strong> items inspected · <strong style={{ color: damageCount > 0 ? '#e11d48' : '#16a34a' }}>{damageCount} damage{damageCount !== 1 ? 's' : ''} noted</strong>
                    </p>
                    <div className="checklist-report-box">
                        <FileText size={20} style={{ color: '#0f172a' }} />
                        <span>This report protects you from being charged for pre-existing damage when you move out.</span>
                    </div>
                    <button className="search-homes-btn" style={{ marginTop: '2rem' }} onClick={onClose}>Back to Property</button>
                </div>
            </div>
        );
    }

    return (
        <div className="gallery-overlay">
            <div className="gallery-header">
                <button className="gallery-back-btn" onClick={onClose}>
                    <ChevronLeft size={24} /> <span>Back to details</span>
                </button>
            </div>
            <div className="gallery-scroll-container">
                <div className="gallery-content">
                    <div className="checklist-header">
                        <h1>🏠 Move-In Checklist</h1>
                        <p style={{ color: '#64748b', marginBottom: '1rem' }}>Inspect every room and note any pre-existing damage to protect yourself.</p>
                        <div className="checklist-progress-bar">
                            <div className="checklist-progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                            <span>{checkedCount}/{totalItems} items checked</span>
                            <span style={{ color: damageCount > 0 ? '#e11d48' : '#64748b' }}>{damageCount} damage{damageCount !== 1 ? 's' : ''} flagged</span>
                        </div>
                    </div>

                    {rooms.map(room => (
                        <div key={room.id} className="checklist-room-section">
                            <h3 className="checklist-room-title">{room.name}</h3>
                            {room.items.map(item => {
                                const key = `${room.id}__${item}`;
                                const isChecked = checks[key];
                                const isDamaged = damages[key];
                                return (
                                    <div key={item} className={`checklist-item ${isDamaged ? 'damaged' : isChecked ? 'ok' : ''}`}>
                                        <div className="checklist-item-left" onClick={() => toggle(room.id, item)}>
                                            {isChecked ? <CheckCircle2 size={22} color="#16a34a" /> : <Circle size={22} color="#cbd5e1" />}
                                            <span>{item}</span>
                                        </div>
                                        <button
                                            className={`damage-btn ${isDamaged ? 'active' : ''}`}
                                            onClick={() => markDamage(room.id, item)}
                                            title="Flag as damaged"
                                        >
                                            <AlertTriangle size={16} /> {isDamaged ? 'Damaged' : 'Flag'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    <div className="checklist-footer">
                        <div className="checklist-report-box">
                            <Camera size={20} />
                            <span>Tip: Take photos of any damage and share with your landlord immediately.</span>
                        </div>
                        <button className="search-homes-btn" style={{ marginTop: '1.5rem' }} onClick={() => setSubmitted(true)}>
                            Save Move-In Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoveInChecklist;
