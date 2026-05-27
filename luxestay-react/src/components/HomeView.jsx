import React from 'react';
import { Search, Home, Waves, Tent, Building2, ArrowRight, ShieldCheck, Headphones, Lock } from 'lucide-react';
import PropertyCard from './PropertyCard';
import RoommateDNAMatch from './RoommateDNAMatch';
import { properties } from '../data/mockData';

const HomeView = ({ navigateTo }) => {
    const [showDNAQuiz, setShowDNAQuiz] = React.useState(false);
    const featuredProps = properties.filter(p => p.featured);

    return (
        <main className="view active">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg"></div>
                <div className="hero-content">
                    <h1>Quality Living, Made Easy</h1>
                    <div className="search-bar">
                        <div className="search-field">
                            <label>LOCATION</label>
                            <input type="text" placeholder="Where to?" />
                        </div>
                        <div className="search-divider"></div>
                        <div className="search-field">
                            <label>DATE</label>
                            <input type="text" placeholder="Add dates" />
                        </div>
                        <div className="search-divider"></div>
                        <div className="search-field">
                            <label>GUESTS</label>
                            <input type="text" placeholder="Add guests" />
                        </div>
                        <button className="btn btn-dark btn-search" onClick={() => navigateTo('search-view')}>
                            <Search size={18} /> Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Roommate DNA Banner - NEW */}
            <section className="dna-home-banner section-container">
                <div className="dna-banner-card">
                    <div className="dna-banner-content">
                        <div className="dna-badge">RECOMMENDED FIRST</div>
                        <h2>Find Your Perfect Lifestyle Match 🧬</h2>
                        <p>Before you browse, take our 2-minute lifestyle quiz. We'll suggest homes and compatible flatmates based on your unique living habits.</p>
                        <button className="btn btn-dark" onClick={() => setShowDNAQuiz(true)}>
                            Take the Quiz
                        </button>
                    </div>
                    <div className="dna-banner-visual">
                        <div className="dna-float-icon">🧬</div>
                    </div>
                </div>
            </section>

            {/* Collections Section */}
            <section className="section-container">
                <div className="section-header">
                    <h6>COLLECTIONS</h6>
                    <h2>Browse by Style</h2>
                </div>
                <div className="collections-grid">
                    <div className="collection-card" onClick={() => navigateTo('search-view')}>
                        <Home size={32} />
                        <span>Modern</span>
                    </div>
                    <div className="collection-card" onClick={() => navigateTo('search-view')}>
                        <Waves size={32} />
                        <span>Coastal</span>
                    </div>
                    <div className="collection-card" onClick={() => navigateTo('search-view')}>
                        <Tent size={32} />
                        <span>Cabin</span>
                    </div>
                    <div className="collection-card" onClick={() => navigateTo('search-view')}>
                        <Building2 size={32} />
                        <span>Mansion</span>
                    </div>
                </div>
            </section>

            {showDNAQuiz && <RoommateDNAMatch onClose={() => setShowDNAQuiz(false)} navigateTo={navigateTo} />}

            {/* Featured Properties */}
            <section className="section-container">
                <div className="section-header flex-between">
                    <h2>Featured Properties</h2>
                    <a href="#" className="view-all" onClick={(e) => { e.preventDefault(); navigateTo('search-view'); }}>
                        View All <ArrowRight size={18} />
                    </a>
                </div>
                <div className="properties-grid">
                    {featuredProps.map(prop => (
                        <PropertyCard key={prop.id} property={prop} onClick={() => navigateTo('details-view', prop)} />
                    ))}
                </div>
            </section>

            {/* Trust Features */}
            <section className="trust-section section-container">
                <div className="trust-item">
                    <div className="trust-icon"><ShieldCheck size={32} /></div>
                    <h3>Verified Listings</h3>
                    <p>Every property in our collection is hand-inspected by our team for quality and authenticity.</p>
                </div>
                <div className="trust-item">
                    <div className="trust-icon"><Headphones size={32} /></div>
                    <h3>24/7 Support</h3>
                    <p>Our dedicated concierge team is available around the clock to assist with your stay.</p>
                </div>
                <div className="trust-item">
                    <div className="trust-icon"><Lock size={32} /></div>
                    <h3>Secure Payments</h3>
                    <p>State-of-the-art encryption ensures your transactions and data are always protected.</p>
                </div>
            </section>
        </main>
    );
};

export default HomeView;
