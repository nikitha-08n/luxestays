import React, { useState, useEffect } from 'react';
import { Plus, Settings, TrendingUp, Star, Users, ArrowLeft, UploadCloud, Image as ImageIcon, MapPin, DollarSign, Calendar } from 'lucide-react';
import { formatPrice } from '../data/mockData';

const ListingsView = ({ navigateTo }) => {
    // State for listings array
    const [listings, setListings] = useState([
        {
            id: 101,
            title: "The Azure Pavilion",
            location: "Malibu, CA",
            image: "https://images.unsplash.com/photo-1613490908592-fd5e16f310f8?auto=format&fit=crop&w=300&q=80",
            status: "Active",
            statusColor: "badge-green",
            price: 100000,
            priceType: "/ night",
            rating: 4.92,
            bookings: 14,
            earnings: 1400000
        },
        {
            id: 102,
            title: "Gramercy Loft",
            location: "New York, NY",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
            status: "Pending Review",
            statusColor: "badge-light",
            price: 68000,
            priceType: "/ night",
            rating: 0,
            bookings: 0,
            earnings: 0
        }
    ]);

    // State for Add Property view toggle
    const [isAddingProperty, setIsAddingProperty] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredListing, setHoveredListing] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeStat, setActiveStat] = useState(null);
    
    // Form submission handler
    const handleAddPropertySubmit = (e) => {
        e.preventDefault();
        
        // Extract basic data from form
        const form = e.target;
        const title = form.title.value;
        const location = `${form.city.value}, ${form.state.value}`;
        const price = parseInt(form.price.value);
        
        // Create new listing object
        const newListing = {
            id: Date.now(),
            title: title,
            location: location,
            image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=300&q=80", // Placeholder
            status: "Pending Review",
            statusColor: "badge-light",
            price: price,
            priceType: "/ night",
            rating: 0,
            bookings: 0,
            earnings: 0
        };

        // Add to state
        setListings([newListing, ...listings]);
        
        // Reset view and alert
        setIsAddingProperty(false);
        alert('Property submitted for review successfully!');
    };

    const toggleStatus = (id) => {
        setListings(prev => prev.map(item => {
            if (item.id === id) {
                const isActive = item.status === 'Active';
                return {
                    ...item,
                    status: isActive ? 'Paused' : 'Active',
                    statusColor: isActive ? 'badge-light' : 'badge-green'
                };
            }
            return item;
        }));
    };

    const filteredListings = listings.filter(item => {
        const matchesFilter = activeFilter === 'All' || item.status === activeFilter;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             item.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const Sparkline = ({ color }) => (
        <svg width="60" height="20" viewBox="0 0 60 20" style={{ opacity: 0.7 }}>
            <path 
                d="M0 15 Q 10 5, 20 12 T 40 8 T 60 15" 
                fill="none" 
                stroke={color} 
                strokeWidth="2.5" 
                strokeLinecap="round"
                className="sparkline-path"
            />
        </svg>
    );

    if (isAddingProperty) {
        return (
            <main className="view active animate-fade-up" style={{ padding: '3rem 2rem', maxWidth: '850px', margin: '0 auto' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setIsAddingProperty(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', borderRadius: '100px', padding: '0.5rem 1.25rem' }}>
                        <ArrowLeft size={16} /> Back to Portfolio
                    </button>
                    <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 700, color: 'var(--primary-dark)' }}>Add New Property</h1>
                    <p className="muted" style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Provide details to list your property on the LuxeStay network.</p>
                </div>

                <div className="glass-panel" style={{ background: 'white', padding: '3rem' }}>
                    <form onSubmit={handleAddPropertySubmit}>
                        
                        {/* Section: Basic Info */}
                        <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '2rem', fontSize: '1.25rem', color: 'var(--primary-dark)' }}>Basic Information</h3>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <label className="premium-label">PROPERTY TITLE</label>
                            <input name="title" type="text" className="premium-input" required placeholder="e.g. Skyline Penthouse" />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label className="premium-label">DESCRIPTION</label>
                            <textarea name="description" className="premium-input" required rows="4" placeholder="Describe what makes your property unique..."></textarea>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                            <div>
                                <label className="premium-label">PROPERTY TYPE</label>
                                <select name="type" className="premium-input" style={{ appearance: 'none', background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 1rem center / 1rem' }}>
                                    <option>Apartment</option>
                                    <option>Penthouse</option>
                                    <option>Villa / Estate</option>
                                    <option>Townhouse</option>
                                </select>
                            </div>
                            <div>
                                <label className="premium-label">NIGHTLY PRICE (₹)</label>
                                <input name="price" type="number" className="premium-input" required placeholder="e.g. 100000" />
                            </div>
                        </div>

                        {/* Section: Location */}
                        <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '2rem', fontSize: '1.25rem', color: 'var(--primary-dark)' }}>Location</h3>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <label className="premium-label">STREET ADDRESS</label>
                            <input name="address" type="text" className="premium-input" required placeholder="123 Luxury Ave" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                            <div>
                                <label className="premium-label">CITY</label>
                                <input name="city" type="text" className="premium-input" required placeholder="New York" />
                            </div>
                            <div>
                                <label className="premium-label">STATE</label>
                                <input name="state" type="text" className="premium-input" required placeholder="NY" />
                            </div>
                            <div>
                                <label className="premium-label">ZIP CODE</label>
                                <input name="zip" type="text" className="premium-input" required placeholder="10001" />
                            </div>
                        </div>

                        {/* Section: Amenities */}
                        <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '2rem', fontSize: '1.25rem', color: 'var(--primary-dark)' }}>Premium Amenities</h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                            <label className="checkbox-label"><input type="checkbox" /> <span>High-Speed WiFi</span></label>
                            <label className="checkbox-label"><input type="checkbox" /> <span>Private Pool</span></label>
                            <label className="checkbox-label"><input type="checkbox" /> <span>Home Gym</span></label>
                            <label className="checkbox-label"><input type="checkbox" /> <span>Valet Parking</span></label>
                            <label className="checkbox-label"><input type="checkbox" /> <span>Smart Home System</span></label>
                            <label className="checkbox-label"><input type="checkbox" /> <span>24/7 Security</span></label>
                        </div>

                        {/* Section: Media */}
                        <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '2rem', fontSize: '1.25rem', color: 'var(--primary-dark)' }}>High-Quality Media</h3>
                        
                        <div style={{ 
                            border: '2px dashed var(--border-color)', 
                            borderRadius: 'var(--radius-lg)', 
                            padding: '4rem 2rem', 
                            textAlign: 'center', 
                            marginBottom: '3rem',
                            background: '#f8fafc',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }} className="hover-lift">
                            <UploadCloud size={48} style={{ margin: '0 auto 1.5rem', color: 'var(--accent)' }} />
                            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 600 }}>Drag & drop high-resolution photos here</h4>
                            <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>Minimum 1920x1080px required. Up to 20 images.</p>
                            
                            <input 
                                type="file" 
                                id="property-images" 
                                multiple 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                            />
                            <label htmlFor="property-images" className="btn btn-outline" style={{ marginTop: '2rem', display: 'inline-block', cursor: 'pointer', borderRadius: '100px', padding: '0.75rem 2rem' }}>
                                Browse Files
                            </label>
                        </div>

                        {/* Form Actions */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '2px solid #f1f5f9', paddingTop: '2rem' }}>
                            <button type="button" className="btn btn-outline" style={{ padding: '1rem 2rem', borderRadius: '100px' }} onClick={() => setIsAddingProperty(false)}>Cancel</button>
                            <button type="submit" className="btn btn-dark" style={{ padding: '1rem 2.5rem', borderRadius: '100px', fontWeight: 600 }}>Publish Listing</button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="view active" style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <div className="section-header flex-between animate-fade-up" style={{ marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>Your Portfolio</h1>
                    <p className="muted" style={{ fontSize: '1.1rem' }}>Manage your premium properties and track performance.</p>
                </div>
                <button className="btn btn-dark animate-slide-right" style={{ padding: '1rem 2rem', borderRadius: '100px', fontSize: '1rem', fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} onClick={() => setIsAddingProperty(true)}>
                    <Plus size={20} /> Add New Property
                </button>
            </div>

            {/* Host Stats */}
            <div className="stats-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                {[
                    { id: 'earnings', label: 'TOTAL EARNINGS (MTD)', value: '₹14,00,000', sub: '+12% from last month', icon: <TrendingUp size={16} />, color: 'text-green', delay: '100' },
                    { id: 'rating', label: 'OVERALL RATING', value: '4.92', sub: 'Superhost Status', icon: <Star size={16} />, color: 'muted', delay: '200' },
                    { id: 'guests', label: 'UPCOMING GUESTS', value: '14', sub: 'Next check-in tomorrow', icon: <Users size={16} />, color: 'muted', delay: '300' }
                ].map((stat, i) => (
                    <div 
                        key={stat.id}
                        onClick={() => setActiveStat(activeStat === stat.id ? null : stat.id)}
                        className={`stat-card-premium animate-fade-up animate-delay-${stat.delay} ${activeStat === stat.id ? 'active' : ''}`} 
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <div className="stat-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>{stat.label}</div>
                            <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '50%', color: stat.id === 'earnings' ? 'var(--accent)' : 'var(--primary-dark)' }}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="stat-value text-dark" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{stat.value}</div>
                        <div className={`stat-sub ${stat.color}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            {stat.sub}
                        </div>
                        
                        {activeStat === stat.id && (
                            <div className="animate-fade-up" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                                <p style={{ fontSize: '0.9rem', margin: 0, color: '#64748b', lineHeight: 1.5 }}>
                                    {stat.id === 'earnings' ? 'Average daily revenue is up by ₹4,200 this week. Consider adjusting weekend rates.' : 
                                     stat.id === 'rating' ? 'Based on 48 verified reviews. You are in the top 5% of all luxury hosts.' : 
                                     '7 properties are fully booked for the upcoming weekend. 2 maintenance requests pending.'}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Listings Table / Grid */}
            <div className="glass-panel animate-fade-up animate-delay-400" style={{ background: 'white', overflow: 'hidden' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', background: '#f8fafc' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Manage Listings</h3>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>{filteredListings.length} properties found</p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1, justifyContent: 'flex-end', minWidth: '350px' }}>
                        <div style={{ position: 'relative', flex: 1, maxWidth: '350px' }}>
                            <Settings size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input 
                                type="text" 
                                placeholder="Search property name or location..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="premium-input"
                                style={{ padding: '0.75rem 1rem 0.75rem 3rem', background: 'white' }}
                            />
                        </div>
                        
                        <div className="filter-tabs" style={{ display: 'flex', gap: '0.25rem', background: '#e2e8f0', padding: '0.3rem', borderRadius: '100px' }}>
                        {['All', 'Active', 'Pending Review', 'Paused'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    border: 'none',
                                    borderRadius: '100px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    backgroundColor: activeFilter === filter ? 'white' : 'transparent',
                                    color: activeFilter === filter ? 'var(--primary-dark)' : '#64748b',
                                    boxShadow: activeFilter === filter ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
                
                <div style={{ padding: '1rem' }}>
                    {filteredListings.length === 0 ? (
                        <div className="animate-fade-up" style={{ padding: '6rem 3rem', textAlign: 'center' }}>
                            <ImageIcon size={64} style={{ margin: '0 auto 1.5rem', color: '#cbd5e1' }} />
                            <h4 style={{ color: '#64748b', marginBottom: '1rem', fontSize: '1.25rem' }}>No {activeFilter !== 'All' ? activeFilter.toLowerCase() : ''} properties found.</h4>
                            <p className="muted" style={{ fontSize: '1rem' }}>Try changing your filter or add a new property to your portfolio.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {filteredListings.map((listing, idx) => (
                                <div 
                                    key={listing.id} 
                                    className={`property-row-premium animate-fade-up`}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                    onMouseEnter={() => setHoveredListing(listing.id)}
                                    onMouseLeave={() => setHoveredListing(null)}
                                >
                                    <div className="property-img-wrap">
                                        <img src={listing.image} alt={listing.title} />
                                        {listing.status === 'Active' && <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', width: '10px', height: '10px', background: 'var(--accent)', borderRadius: '50%', border: '2px solid white', boxShadow: '0 0 0 2px rgba(16,185,129,0.2)' }}></div>}
                                    </div>
                                    
                                    <div>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700 }}>{listing.title}</h4>
                                        <div className="muted" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {listing.location}</div>
                                    </div>

                                    <div>
                                        <span className={`badge ${listing.statusColor}`} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', borderRadius: '100px' }}>{listing.status}</span>
                                    </div>

                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{formatPrice(listing.price)} <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{listing.priceType}</span></div>
                                        {listing.rating > 0 ? (
                                            <div style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontWeight: 600 }}><Star size={14} fill="currentColor" /> {listing.rating} <span style={{ color: '#94a3b8', fontWeight: 500 }}>(14)</span></div>
                                        ) : (
                                            <div className="muted" style={{ fontSize: '0.85rem' }}>No reviews yet</div>
                                        )}
                                    </div>

                                    <div>
                                        <div className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: 600 }}>Earnings</div>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {formatPrice(listing.earnings)}
                                            {listing.status === 'Active' && <Sparkline color="#10b981" />}
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            {hoveredListing === listing.id && (
                                                <button 
                                                    className="btn btn-outline btn-sm animate-fade-up" 
                                                    onClick={() => toggleStatus(listing.id)}
                                                    style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', borderRadius: '100px', animationDuration: '0.2s' }}
                                                >
                                                    {listing.status === 'Active' ? 'Pause' : 'Resume'}
                                                </button>
                                            )}
                                            <button className="icon-btn" style={{ background: hoveredListing === listing.id ? '#f1f5f9' : 'transparent', padding: '0.5rem' }}><Settings size={20} color={hoveredListing === listing.id ? 'var(--primary-dark)' : '#94a3b8'} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ListingsView;
