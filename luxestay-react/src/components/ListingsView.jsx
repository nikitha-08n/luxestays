import React, { useState } from 'react';
import { Plus, Settings, TrendingUp, Star, Users, ArrowLeft, UploadCloud, Image as ImageIcon } from 'lucide-react';
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
    const [showAnalytics, setShowAnalytics] = useState(null);
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
                strokeWidth="2" 
                strokeLinecap="round"
            />
        </svg>
    );

    if (isAddingProperty) {
        return (
            <main className="view active" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setIsAddingProperty(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <ArrowLeft size={16} /> Back to Portfolio
                    </button>
                    <h1 style={{ fontSize: '2rem', margin: 0 }}>Add New Property</h1>
                    <p className="muted">Provide details to list your property on the LuxeStay network.</p>
                </div>

                <div style={{ background: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <form onSubmit={handleAddPropertySubmit}>
                        
                        {/* Section: Basic Info */}
                        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Basic Information</h3>
                        
                        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>PROPERTY TITLE</label>
                            <input name="title" type="text" required placeholder="e.g. Skyline Penthouse" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                        </div>

                        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>DESCRIPTION</label>
                            <textarea name="description" required rows="4" placeholder="Describe what makes your property unique..." style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem', fontFamily: 'inherit' }}></textarea>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div className="input-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>PROPERTY TYPE</label>
                                <select name="type" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem', background: 'transparent' }}>
                                    <option>Apartment</option>
                                    <option>Penthouse</option>
                                    <option>Villa / Estate</option>
                                    <option>Townhouse</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>NIGHTLY PRICE (₹)</label>
                                <input name="price" type="number" required placeholder="e.g. 100000" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                            </div>
                        </div>

                        {/* Section: Location */}
                        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Location</h3>
                        
                        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>STREET ADDRESS</label>
                            <input name="address" type="text" required placeholder="123 Luxury Ave" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div className="input-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>CITY</label>
                                <input name="city" type="text" required placeholder="New York" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                            </div>
                            <div className="input-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>STATE</label>
                                <input name="state" type="text" required placeholder="NY" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                            </div>
                            <div className="input-group">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>ZIP CODE</label>
                                <input name="zip" type="text" required placeholder="10001" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }} />
                            </div>
                        </div>

                        {/* Section: Amenities */}
                        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Premium Amenities</h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> <span>High-Speed WiFi</span></label>
                            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> <span>Private Pool</span></label>
                            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> <span>Home Gym</span></label>
                            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> <span>Valet Parking</span></label>
                            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> <span>Smart Home System</span></label>
                            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" /> <span>24/7 Security</span></label>
                        </div>

                        {/* Section: Media */}
                        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>High-Quality Media</h3>
                        
                        <div style={{ 
                            border: '2px dashed var(--border-color)', 
                            borderRadius: 'var(--radius-md)', 
                            padding: '3rem', 
                            textAlign: 'center', 
                            marginBottom: '2.5rem',
                            background: '#f8fafc'
                        }}>
                            <UploadCloud size={40} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
                            <h4 style={{ margin: '0 0 0.5rem 0' }}>Drag & drop high-resolution photos here</h4>
                            <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>Minimum 1920x1080px required. Up to 20 images.</p>
                            
                            <input 
                                type="file" 
                                id="property-images" 
                                multiple 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                            />
                            <label htmlFor="property-images" className="btn btn-outline btn-sm" style={{ marginTop: '1.5rem', display: 'inline-block', cursor: 'pointer' }}>
                                Browse Files
                            </label>
                        </div>

                        {/* Form Actions */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <button type="button" className="btn btn-outline" onClick={() => setIsAddingProperty(false)}>Cancel</button>
                            <button type="submit" className="btn btn-dark">Publish Listing</button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="view active" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-header flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Portfolio</h1>
                    <p className="muted">Manage your premium properties and track performance.</p>
                </div>
                <button className="btn btn-dark" onClick={() => setIsAddingProperty(true)}>
                    <Plus size={18} /> Add New Property
                </button>
            </div>

            {/* Host Stats */}
            <div className="stats-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {[
                    { id: 'earnings', label: 'TOTAL EARNINGS (MTD)', value: '₹14,00,000', sub: '+12% from last month', icon: <TrendingUp size={14} />, color: 'text-green' },
                    { id: 'rating', label: 'OVERALL RATING', value: '4.92', sub: 'Superhost Status', icon: <Star size={14} />, color: 'muted' },
                    { id: 'guests', label: 'UPCOMING GUESTS', value: '14', sub: 'Next check-in tomorrow', icon: <Users size={14} />, color: 'muted' }
                ].map(stat => (
                    <div 
                        key={stat.id}
                        onClick={() => setActiveStat(activeStat === stat.id ? null : stat.id)}
                        className={`stat-card ${activeStat === stat.id ? 'active' : ''}`} 
                        style={{ 
                            background: 'var(--bg-white)', 
                            border: activeStat === stat.id ? '2px solid var(--accent-color, #3b82f6)' : '1px solid var(--border-color)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            transform: activeStat === stat.id ? 'translateY(-4px)' : 'none',
                            boxShadow: activeStat === stat.id ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                    >
                        <div className="stat-label" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{stat.label}</div>
                        <div className="stat-value text-dark" style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>{stat.value}</div>
                        <div className={`stat-sub ${stat.color}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                            {stat.icon} {stat.sub}
                        </div>
                        
                        {activeStat === stat.id && (
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', animation: 'fadeIn 0.3s ease' }}>
                                <p style={{ fontSize: '0.8rem', margin: 0, color: '#64748b' }}>
                                    {stat.id === 'earnings' ? 'Average daily revenue is up by ₹4,200 this week.' : 
                                     stat.id === 'rating' ? 'Based on 48 reviews. You are in the top 5% of hosts.' : 
                                     '7 properties are fully booked for the upcoming weekend.'}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Listings Table / Grid */}
            <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden', transition: 'all 0.3s ease' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div>
                        <h3 style={{ margin: 0 }}>Manage Listings</h3>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>{filteredListings.length} properties found</p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1, justifyContent: 'flex-end', minWidth: '300px' }}>
                        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                            <Settings size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input 
                                type="text" 
                                placeholder="Search property name..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ 
                                    width: '100%', 
                                    padding: '0.6rem 1rem 0.6rem 2.5rem', 
                                    border: '1px solid #e2e8f0', 
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.85rem'
                                }} 
                            />
                        </div>
                        
                        <div className="filter-tabs" style={{ display: 'flex', gap: '0.25rem', background: '#f1f5f9', padding: '0.2rem', borderRadius: 'var(--radius-md)' }}>
                        {['All', 'Active', 'Pending Review', 'Paused'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                style={{
                                    padding: '0.4rem 1rem',
                                    border: 'none',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    backgroundColor: activeFilter === filter ? 'white' : 'transparent',
                                    color: activeFilter === filter ? 'var(--text-dark)' : 'var(--text-muted)',
                                    boxShadow: activeFilter === filter ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
                
                <div style={{ padding: '0.5rem' }}>
                    {filteredListings.length === 0 ? (
                        <div style={{ padding: '5rem 3rem', textAlign: 'center' }}>
                            <ImageIcon size={48} style={{ margin: '0 auto 1.5rem', color: 'var(--border-color)' }} />
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>No {activeFilter !== 'All' ? activeFilter.toLowerCase() : ''} properties found.</h4>
                            <p className="muted" style={{ fontSize: '0.9rem' }}>Try changing your filter or add a new property to your portfolio.</p>
                        </div>
                    ) : (
                        filteredListings.map(listing => (
                            <div 
                                key={listing.id} 
                                onMouseEnter={() => setHoveredListing(listing.id)}
                                onMouseLeave={() => setHoveredListing(null)}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    padding: '1.25rem', 
                                    borderBottom: '1px solid #f1f5f9', 
                                    gap: '1.5rem',
                                    backgroundColor: hoveredListing === listing.id ? '#f8fafc' : 'transparent',
                                    transition: 'background-color 0.2s ease',
                                    position: 'relative'
                                }}
                            >
                                <img src={listing.image} alt={listing.title} style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                                
                                <div style={{ flex: 2 }}>
                                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{listing.title}</h4>
                                    <div className="muted" style={{ fontSize: '0.85rem' }}>{listing.location}</div>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <span className={`badge ${listing.statusColor}`}>{listing.status}</span>
                                </div>

                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    <div style={{ fontWeight: 600 }}>{formatPrice(listing.price)} {listing.priceType}</div>
                                    {listing.rating > 0 ? (
                                        <div className="muted" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}><Star size={12} className="star-icon" /> {listing.rating}</div>
                                    ) : (
                                        <div className="muted" style={{ fontSize: '0.85rem' }}>No reviews yet</div>
                                    )}
                                </div>

                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    <div className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>Earnings</div>
                                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        {formatPrice(listing.earnings)}
                                        {listing.status === 'Active' && <Sparkline color="#10b981" />}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        {hoveredListing === listing.id && (
                                            <button 
                                                className="btn btn-outline btn-sm" 
                                                onClick={() => toggleStatus(listing.id)}
                                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                                            >
                                                {listing.status === 'Active' ? 'Pause' : 'Resume'}
                                            </button>
                                        )}
                                        <button className="icon-btn" style={{ background: 'transparent', padding: '0.5rem' }}><Settings size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
};

export default ListingsView;
