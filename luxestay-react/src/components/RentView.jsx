import React, { useState } from 'react';
import { ShieldCheck, Headphones, TrendingUp, ChevronDown } from 'lucide-react';

const RentView = () => {
    const [propertyType, setPropertyType] = useState('Apartment');
    const [bedrooms, setBedrooms] = useState('2');
    const [isApplying, setIsApplying] = useState(false);

    return (
        <main className="view active">
            {/* Host Hero Section */}
            <section className="hero-section host-hero" style={{ height: '500px' }}>
                <div className="hero-bg" style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('/house1.png')" }}></div>
                <div className="hero-content host-hero-content">
                    <h1>Turn your property into reliable rental income.</h1>
                    <p className="hero-subtext" style={{ fontSize: '1.1rem', marginTop: '1rem', marginBottom: '2.5rem', opacity: 0.9 }}>
                        Join our network of property owners. Earn more, stress less, and let our team handle the rest.
                    </p>
                    
                    <div className="estimator-card" style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', color: 'var(--text-dark)', textAlign: 'left', maxWidth: '800px', margin: '0 auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                        <div className="estimator-inputs" style={{ flex: 1, display: 'grid', gap: '1rem' }}>
                            <div className="input-group">
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>WHERE IS YOUR PROPERTY?</label>
                                <input type="text" placeholder="e.g. Manhattan, NY" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.25rem', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>PROPERTY TYPE</label>
                                    <div className="custom-select" style={{ position: 'relative', marginTop: '0.25rem' }}>
                                        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', appearance: 'none', fontFamily: 'inherit', background: 'transparent' }}>
                                            <option>Apartment</option>
                                            <option>PG Building</option>
                                            <option>Independent House</option>
                                        </select>
                                        <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
                                    </div>
                                </div>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>BEDROOMS</label>
                                    <div className="custom-select" style={{ position: 'relative', marginTop: '0.25rem' }}>
                                        <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', appearance: 'none', fontFamily: 'inherit', background: 'transparent' }}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4+</option>
                                        </select>
                                        <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="estimator-result" style={{ flex: 1, borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ESTIMATED MONTHLY EARNINGS</div>
                            <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary-dark)', lineHeight: 1 }}>
                                ₹{propertyType === 'PG Building' ? '1,50,000' : propertyType === 'Independent House' ? '40,000' : ((parseInt(bedrooms) * 12000 + 5000)).toLocaleString('en-IN')}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--accent)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <TrendingUp size={14} /> +24% higher than standard rentals
                            </div>
                            <button 
                                className="btn btn-dark w-100 mt-1rem" 
                                style={{ marginTop: '1.5rem' }}
                                onClick={() => {
                                    setIsApplying(true);
                                    setTimeout(() => {
                                        document.getElementById('application-section').scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Host Benefits */}
            <section className="section-container" style={{ padding: '6rem 2rem' }}>
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2>Why Host with Us?</h2>
                    <p className="muted" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>We provide an end-to-end management experience so you can enjoy the returns of your investment without the daily operational stress.</p>
                </div>
                
                <div className="trust-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <div className="trust-item">
                        <div className="trust-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}><ShieldCheck size={32} /></div>
                        <h3>$5M Host Protection</h3>
                        <p>Rest easy knowing your premium property is covered against damage, theft, and liability with our comprehensive insurance policy.</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}><TrendingUp size={32} /></div>
                        <h3>Vetted Clientele</h3>
                        <p>We strictly verify the identity and background of every guest. Your property will only host professionals and high-net-worth individuals.</p>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon" style={{ background: '#f0fdf4', color: '#10b981' }}><Headphones size={32} /></div>
                        <h3>Dedicated Concierge</h3>
                        <p>From cleaning and maintenance to midnight guest inquiries, our dedicated 24/7 team handles everything on your behalf.</p>
                    </div>
                </div>
            </section>
            
            {/* CTA Section / Application Form */}
            <section id="application-section" style={{ background: isApplying ? 'var(--bg-light)' : 'var(--primary-dark)', color: isApplying ? 'var(--text-dark)' : 'white', padding: '5rem 2rem', transition: 'all 0.3s ease' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {!isApplying ? (
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>Ready to list your property?</h2>
                            <p style={{ opacity: 0.8, marginBottom: '2.5rem' }}>Join thousands of satisfied property owners who trust us with their assets.</p>
                            <button className="btn btn-white btn-large" onClick={() => setIsApplying(true)}>Begin Application</button>
                        </div>
                    ) : (
                        <div className="application-form" style={{ background: 'var(--bg-white)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)' }}>
                            <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Property Application</h2>
                            <p className="muted" style={{ textAlign: 'center', marginBottom: '3rem' }}>Please provide some details about your property to help us evaluate its fit for our network.</p>
                            
                            <form onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully! Our team will contact you shortly.'); setIsApplying(false); }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>FIRST NAME</label>
                                        <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>LAST NAME</label>
                                        <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                                    </div>
                                </div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>EMAIL ADDRESS</label>
                                        <input type="email" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>PHONE NUMBER</label>
                                        <input type="tel" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                                    </div>
                                </div>

                                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Property Details</h3>
                                
                                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>PROPERTY ADDRESS</label>
                                    <input type="text" required placeholder="Street address, City, State, Zip" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>PROPERTY TYPE</label>
                                        <select required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem', background: 'transparent' }}>
                                            <option>Apartment</option>
                                            <option>Penthouse</option>
                                            <option>House / Villa</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>BEDROOMS</label>
                                        <input type="number" min="1" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>BATHROOMS</label>
                                        <input type="number" min="1" step="0.5" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                    <button type="button" className="btn btn-outline" onClick={() => setIsApplying(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-dark">Submit Application</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default RentView;
