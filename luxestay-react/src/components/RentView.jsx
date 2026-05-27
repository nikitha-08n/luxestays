import React, { useState } from 'react';
import { ShieldCheck, Headphones, TrendingUp, ChevronDown, CheckCircle } from 'lucide-react';

const RentView = () => {
    const [propertyType, setPropertyType] = useState('Apartment');
    const [bedrooms, setBedrooms] = useState('2');
    const [isApplying, setIsApplying] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <main className="view active">
            {/* Host Hero Section */}
            <section className="hero-section host-hero animate-fade-up" style={{ height: '600px', overflow: 'hidden', position: 'relative' }}>
                <div className="rent-hero-bg"></div>
                <div className="hero-content host-hero-content animate-slide-right" style={{ zIndex: 10, marginTop: '-2rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, textShadow: '0 4px 20px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
                        Turn your property into <br/> <span style={{ color: 'var(--accent)' }}>reliable rental income.</span>
                    </h1>
                    <p className="hero-subtext" style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '3rem', opacity: 0.9, maxWidth: '600px', margin: '1.5rem auto 3rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        Join our exclusive network of premium property owners. Earn more, stress less, and let our dedicated team handle the rest.
                    </p>
                    
                    <div className="estimator-card glass-panel-dark animate-fade-up animate-delay-200" style={{ display: 'flex', gap: '3rem', alignItems: 'center', textAlign: 'left', maxWidth: '850px', margin: '0 auto', padding: '2.5rem' }}>
                        <div className="estimator-inputs" style={{ flex: 1.2, display: 'grid', gap: '1.5rem' }}>
                            <div className="input-group">
                                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>WHERE IS YOUR PROPERTY?</label>
                                <input type="text" placeholder="e.g. Manhattan, NY" style={{ width: '100%', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem', fontFamily: 'inherit', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>PROPERTY TYPE</label>
                                    <div className="custom-select" style={{ position: 'relative', marginTop: '0.5rem' }}>
                                        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} style={{ width: '100%', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-md)', appearance: 'none', fontFamily: 'inherit', background: 'rgba(255,255,255,0.05)', color: 'white' }}>
                                            <option style={{ color: 'black' }}>Apartment</option>
                                            <option style={{ color: 'black' }}>PG Building</option>
                                            <option style={{ color: 'black' }}>Independent House</option>
                                        </select>
                                        <ChevronDown size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                                    </div>
                                </div>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>BEDROOMS</label>
                                    <div className="custom-select" style={{ position: 'relative', marginTop: '0.5rem' }}>
                                        <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} style={{ width: '100%', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-md)', appearance: 'none', fontFamily: 'inherit', background: 'rgba(255,255,255,0.05)', color: 'white' }}>
                                            <option style={{ color: 'black' }}>1</option>
                                            <option style={{ color: 'black' }}>2</option>
                                            <option style={{ color: 'black' }}>3</option>
                                            <option style={{ color: 'black' }}>4+</option>
                                        </select>
                                        <ChevronDown size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="estimator-result" style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '3rem' }}>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>ESTIMATED MONTHLY EARNINGS</div>
                            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, textShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
                                ₹{propertyType === 'PG Building' ? '1,50,000' : propertyType === 'Independent House' ? '40,000' : ((parseInt(bedrooms) * 12000 + 5000)).toLocaleString('en-IN')}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'white', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '100px', width: 'fit-content' }}>
                                <TrendingUp size={16} color="var(--accent)" /> +24% higher than standard
                            </div>
                            <button 
                                className="btn btn-dark w-100" 
                                style={{ marginTop: '2rem', padding: '1.25rem', fontSize: '1.1rem', fontWeight: 600, background: 'white', color: 'var(--primary-dark)' }}
                                onClick={() => {
                                    setIsApplying(true);
                                    setTimeout(() => {
                                        document.getElementById('application-section').scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                            >
                                Get Started Today
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Host Benefits */}
            <section className="section-container" style={{ padding: '8rem 2rem', background: '#f8fafc' }}>
                <div className="section-header animate-fade-up" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-dark)' }}>Why Host with LuxeStay?</h2>
                    <p className="muted" style={{ maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.1rem', lineHeight: 1.6 }}>We provide an end-to-end premium management experience so you can enjoy the returns of your investment without the daily operational stress.</p>
                </div>
                
                <div className="trust-section animate-fade-up animate-delay-200" style={{ paddingTop: 0, paddingBottom: 0, background: 'transparent' }}>
                    <div className="trust-item stat-card-premium">
                        <div className="trust-icon" style={{ background: '#eff6ff', color: '#3b82f6', width: '80px', height: '80px', borderRadius: '20px' }}><ShieldCheck size={40} /></div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>$5M Host Protection</h3>
                        <p style={{ lineHeight: 1.6, color: '#64748b' }}>Rest easy knowing your premium property is covered against damage, theft, and liability with our comprehensive platinum insurance policy.</p>
                    </div>
                    <div className="trust-item stat-card-premium">
                        <div className="trust-icon" style={{ background: '#fef3c7', color: '#f59e0b', width: '80px', height: '80px', borderRadius: '20px' }}><TrendingUp size={40} /></div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Vetted Elite Clientele</h3>
                        <p style={{ lineHeight: 1.6, color: '#64748b' }}>We strictly verify the identity and background of every guest. Your property will only host verified professionals and high-net-worth individuals.</p>
                    </div>
                    <div className="trust-item stat-card-premium">
                        <div className="trust-icon" style={{ background: '#f0fdf4', color: '#10b981', width: '80px', height: '80px', borderRadius: '20px' }}><Headphones size={40} /></div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Dedicated Concierge</h3>
                        <p style={{ lineHeight: 1.6, color: '#64748b' }}>From meticulous cleaning and preventative maintenance to midnight guest inquiries, our dedicated 24/7 VIP team handles absolutely everything.</p>
                    </div>
                </div>
            </section>
            
            {/* CTA Section / Application Form */}
            <section id="application-section" style={{ 
                background: isApplying ? 'var(--bg-main)' : 'var(--primary-dark)', 
                color: isApplying ? 'var(--text-dark)' : 'white', 
                padding: '8rem 2rem', 
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    {!isApplying ? (
                        <div className="animate-fade-up" style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Ready to elevate your property?</h2>
                            <p style={{ opacity: 0.8, fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>Join the exclusive network of satisfied property owners who trust LuxeStay with their premium assets.</p>
                            <button className="btn btn-white btn-large" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '100px', boxShadow: '0 10px 25px rgba(255,255,255,0.2)' }} onClick={() => setIsApplying(true)}>Begin Application</button>
                        </div>
                    ) : isSubmitted ? (
                        <div className="glass-panel animate-fade-up" style={{ padding: '4rem', textAlign: 'center' }}>
                            <CheckCircle size={80} color="var(--accent)" style={{ margin: '0 auto 2rem' }} />
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>Application Received</h2>
                            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                                Thank you for your interest in LuxeStay. Our curation team will review your property details and contact you within 24 hours.
                            </p>
                            <button className="btn btn-dark" onClick={() => {setIsSubmitted(false); setIsApplying(false);}}>Return to Home</button>
                        </div>
                    ) : (
                        <div className="application-form glass-panel animate-fade-up" style={{ padding: '4rem', background: 'white' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Property Application</h2>
                                <p className="muted" style={{ fontSize: '1.1rem' }}>Please provide details for our evaluation team.</p>
                            </div>
                            
                            <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label className="premium-label">FIRST NAME</label>
                                        <input type="text" className="premium-input" required placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="premium-label">LAST NAME</label>
                                        <input type="text" className="premium-input" required placeholder="Doe" />
                                    </div>
                                </div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                                    <div>
                                        <label className="premium-label">EMAIL ADDRESS</label>
                                        <input type="email" className="premium-input" required placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label className="premium-label">PHONE NUMBER</label>
                                        <input type="tel" className="premium-input" required placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '1.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem' }}>Property Details</h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label className="premium-label">PROPERTY ADDRESS</label>
                                    <input type="text" className="premium-input" required placeholder="Street address, City, State, Zip" />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                                    <div>
                                        <label className="premium-label">PROPERTY TYPE</label>
                                        <select className="premium-input" required style={{ appearance: 'none', background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 1rem center / 1rem' }}>
                                            <option>Premium Apartment</option>
                                            <option>Luxury Penthouse</option>
                                            <option>Private Villa / Estate</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="premium-label">BEDROOMS</label>
                                        <input type="number" min="1" className="premium-input" required placeholder="e.g. 3" />
                                    </div>
                                    <div>
                                        <label className="premium-label">BATHROOMS</label>
                                        <input type="number" min="1" step="0.5" className="premium-input" required placeholder="e.g. 2.5" />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '2px solid #f1f5f9', paddingTop: '2rem' }}>
                                    <button type="button" className="btn btn-outline" style={{ padding: '1rem 2rem' }} onClick={() => setIsApplying(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-dark" style={{ padding: '1rem 2.5rem', fontWeight: 600 }}>Submit Application</button>
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

