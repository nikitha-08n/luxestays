import React, { useState } from 'react';
import { X, ChevronLeft, IndianRupee, TrendingDown, TrendingUp, PieChart } from 'lucide-react';

const expenseCategories = [
    { name: 'Rent', color: '#0f172a', pct: 0.30 },
    { name: 'Food & Groceries', color: '#3b82f6', pct: 0.20 },
    { name: 'Transport', color: '#10b981', pct: 0.10 },
    { name: 'Utilities & Internet', color: '#f59e0b', pct: 0.05 },
    { name: 'Mobile & Subscriptions', color: '#8b5cf6', pct: 0.03 },
    { name: 'Savings & Emergency', color: '#e11d48', pct: 0.20 },
    { name: 'Personal & Misc', color: '#64748b', pct: 0.12 },
];

const SmartBudgetPlanner = ({ onClose, onApplyBudget }) => {
    const [salary, setSalary] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const s = parseInt(salary.replace(/,/g, ''));
        if (!s || s < 1000) return;
        const breakdown = expenseCategories.map(cat => ({
            ...cat,
            amount: Math.round(s * cat.pct / 100) * 100
        }));
        const recommendedRent = Math.round(s * 0.30 / 500) * 500;
        setResult({ salary: s, breakdown, recommendedRent });
    };

    const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

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
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
                        <h1>Smart Budget Planner</h1>
                        <p style={{ color: '#64748b' }}>Enter your monthly take-home salary and we'll calculate your ideal rent budget, along with a complete monthly expense breakdown.</p>
                    </div>

                    <div className="budget-input-section">
                        <label style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', display: 'block', marginBottom: '0.5rem' }}>
                            Monthly Take-Home Salary (₹)
                        </label>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontWeight: 700 }}>₹</span>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="e.g. 25000"
                                    value={salary}
                                    onChange={e => setSalary(e.target.value)}
                                    style={{ paddingLeft: '2.5rem' }}
                                    onKeyDown={e => e.key === 'Enter' && calculate()}
                                />
                            </div>
                            <button className="search-homes-btn" style={{ width: 'auto', padding: '1rem 1.5rem', margin: 0 }} onClick={calculate}>
                                Calculate
                            </button>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                            {[15000, 20000, 30000, 50000].map(v => (
                                <button key={v} className="tag-pill" onClick={() => { setSalary(String(v)); }} style={{ cursor: 'pointer' }}>
                                    ₹{v.toLocaleString('en-IN')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {result && (
                        <div className="budget-result">
                            <div className="budget-recommended-box">
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ideal Max Rent</div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>{fmt(result.recommendedRent)}</div>
                                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>30% of {fmt(result.salary)} salary (recommended rule)</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <TrendingDown size={40} color="#16a34a" />
                                    <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.25rem' }}>Safe Budget</div>
                                </div>
                            </div>

                            <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>📊 Monthly Breakdown</h3>
                            <div className="budget-breakdown-list">
                                {result.breakdown.map(cat => (
                                    <div key={cat.name} className="budget-row">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: 12, height: 12, borderRadius: 3, background: cat.color, flexShrink: 0 }}></div>
                                            <span style={{ fontWeight: 500 }}>{cat.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div className="budget-bar-outer">
                                                <div className="budget-bar-inner" style={{ width: `${cat.pct * 100}%`, background: cat.color }}></div>
                                            </div>
                                            <span style={{ fontWeight: 700, minWidth: 90, textAlign: 'right' }}>{fmt(cat.amount)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="budget-savings-tip">
                                <TrendingUp size={20} color="#16a34a" />
                                <span>If rent is under {fmt(result.recommendedRent)}, you save more. Every ₹1000 saved monthly = ₹12,000/year extra!</span>
                            </div>

                            <button
                                className="search-homes-btn"
                                style={{ marginTop: '1.5rem' }}
                                onClick={() => { onApplyBudget(result.recommendedRent); onClose(); }}
                            >
                                Apply ₹{result.recommendedRent.toLocaleString('en-IN')} as My Max Budget →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartBudgetPlanner;
