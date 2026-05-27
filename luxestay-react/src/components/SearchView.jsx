import React, { useState } from 'react';
import { MapPin, Calendar, Users, Wifi, Waves, Dumbbell, Car, Snowflake, Search, Calculator, BarChart3 } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { properties } from '../data/mockData';
import SmartBudgetPlanner from './SmartBudgetPlanner';
import AreaComparisonRadar from './AreaComparisonRadar';

const SearchView = ({ navigateTo }) => {
    // --- Pending filter state (what user is selecting) ---
    const [maxPrice, setMaxPrice] = useState(50000);
    const [selectedCategory, setSelectedCategory] = useState('All Types');
    const [selectedAtmosphere, setSelectedAtmosphere] = useState(null);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [showBudgetPlanner, setShowBudgetPlanner] = useState(false);
    const [showRadarCompare, setShowRadarCompare] = useState(false);
    const [compareList, setCompareList] = useState([]);
    const [showComparison, setShowComparison] = useState(false);
    const [isMapView, setIsMapView] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState('Any Duration');
    const [selectedTenantType, setSelectedTenantType] = useState('Students & Professionals');

    // --- Active filters (applied only when Search Homes is clicked) ---
    const [activeFilters, setActiveFilters] = useState({
        price: 50000,
        category: 'All Types',
        atmosphere: null,
        amenities: [],
        duration: 'Any Duration',
        tenantType: 'Students & Professionals'
    });

    const atmospheres = [
        {
            title: 'Family Friendly',
            tag: 'SAFE & HOMELY',
            desc: 'Secure independent houses and family apartments with nearby markets and schools.',
            insight: 'Top-rated schools within 2km radius. 12% annual property appreciation.',
            score: '98% Safety',
            badge: 'HIGH DEMAND',
            image: '/atmosphere_family_bg_1778297862967.png',
            color: '#10b981',
            stats: { safety: 98, noise: 20, transit: 70, community: 95 }
        },
        {
            title: 'Student Hub',
            tag: 'ACTIVE & AFFORDABLE',
            desc: 'Vibrant co-living spaces and budget rooms near top colleges and cafes.',
            insight: 'Walking distance to 15+ popular cafes. High-speed 5G connectivity.',
            score: '₹5k Avg Saving',
            badge: 'FAST MOVING',
            image: '/atmosphere_student_bg_1778297947795.png',
            color: '#3b82f6',
            stats: { safety: 85, noise: 75, transit: 90, community: 80 }
        },
        {
            title: 'Quiet Residential',
            tag: 'PEACEFUL & CLEAN',
            desc: 'Premium villas and gated communities for those who value silence and greenery.',
            insight: 'Noise levels below 40dB. 24/7 dedicated security patrols.',
            score: '5-Star Greenery',
            badge: 'PREMIUM CHOICE',
            image: '/atmosphere_quiet_bg_1778298169621.png',
            color: '#8b5cf6',
            stats: { safety: 95, noise: 10, transit: 50, community: 88 }
        },
        {
            title: 'Tech Hub',
            tag: 'CONVENIENT',
            desc: 'Modern studio apartments and flats located right next to major IT parks.',
            insight: 'Save 45 mins on daily commute. Zero-traffic walking zones.',
            score: '0 min Commute',
            badge: 'SUPER CONNECTED',
            image: '/atmosphere_tech_bg_1778298234104.png',
            color: '#f43f5e',
            stats: { safety: 90, noise: 60, transit: 98, community: 75 }
        }
    ];

    const currentAtmosphere = atmospheres.find(a => a.title === selectedAtmosphere) || atmospheres[0];

    // --- Filter logic: runs only against activeFilters ---
    const filteredProperties = properties.filter(prop => {
        const matchesPrice = prop.price <= activeFilters.price;
        const matchesCategory = activeFilters.category === 'All Types' || prop.category === activeFilters.category;
        const matchesAtmosphere = !activeFilters.atmosphere || prop.atmosphere === activeFilters.atmosphere;
        const matchesAmenities = activeFilters.amenities.length === 0 || 
            activeFilters.amenities.every(amenity => prop.amenities.includes(amenity));
        const matchesDuration = activeFilters.duration === 'Any Duration' || 
            prop.allowedDuration.includes(activeFilters.duration);
        const matchesTenant = activeFilters.tenantType === 'Students & Professionals' || 
            prop.targetTenant === activeFilters.tenantType;

        return matchesPrice && matchesCategory && matchesAtmosphere && matchesAmenities && matchesDuration && matchesTenant;
    });

    // --- Suggestion Logic: Add match scores for 'Lifestyle Finder' ---
    const propertiesWithScores = filteredProperties.map(prop => {
        // Deterministic 'random' score for prototype based on ID
        const matchScore = 85 + (prop.id % 15); 
        return { ...prop, lifestyleMatch: matchScore };
    });

    // Sort by match score if needed, or just display
    const finalProperties = propertiesWithScores;

    // --- Handlers ---
    const handleSearch = () => {
        setActiveFilters({
            price: maxPrice,
            category: selectedCategory,
            atmosphere: selectedAtmosphere,
            amenities: [...selectedAmenities],
            duration: selectedDuration,
            tenantType: selectedTenantType
        });
        setVisibleCount(12);
        // Scroll to results
        document.getElementById('search-results-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleAmenity = (amenity) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        );
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 12, filteredProperties.length));
    };

    const handleAtmosphereClick = (title) => {
        setSelectedAtmosphere(prev => prev === title ? null : title);
    };

    const toggleCompare = (property) => {
        setCompareList(prev => {
            if (prev.find(p => p.id === property.id)) {
                return prev.filter(p => p.id !== property.id);
            }
            if (prev.length >= 3) return prev; // Max 3
            return [...prev, property];
        });
    };

    return (
        <main className="view active">
            {/* Search Header Bar */}
            <div className="search-header-bar">
                <div className="filter-pill"><MapPin size={16} /> Indian Cities</div>
                <div className="filter-pill">
                    <Calendar size={16} />
                    <select 
                        value={selectedDuration} 
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            fontSize: 'inherit', 
                            fontWeight: 'inherit', 
                            color: 'inherit',
                            cursor: 'pointer',
                            outline: 'none',
                            padding: '0'
                        }}
                    >
                        <option value="Any Duration">Any Duration</option>
                        <option value="1 Month">1 Month</option>
                        <option value="3 Months">3 Months</option>
                        <option value="6 Months">6 Months</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2 Years">2 Years</option>
                    </select>
                </div>
                <div className="filter-pill">
                    <Users size={16} />
                    <select 
                        value={selectedTenantType} 
                        onChange={(e) => setSelectedTenantType(e.target.value)}
                        style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            fontSize: 'inherit', 
                            fontWeight: 'inherit', 
                            color: 'inherit',
                            cursor: 'pointer',
                            outline: 'none',
                            padding: '0'
                        }}
                    >
                        <option value="Students & Professionals">Students & Professionals</option>
                        <option value="Bachelor (Boys)">Bachelor (Boys)</option>
                        <option value="Bachelor (Girls)">Bachelor (Girls)</option>
                        <option value="Family Only">Family Only</option>
                        <option value="Company Lease">Company Lease</option>
                    </select>
                </div>
                <div className="spacer"></div>
                <div className="showing-text" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span>Showing <strong>{filteredProperties.length}</strong> properties</span>
                    <button 
                        onClick={() => setIsMapView(!isMapView)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.4rem 1rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--border-color)',
                            backgroundColor: isMapView ? '#1e293b' : 'white',
                            color: isMapView ? 'white' : '#1e293b',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isMapView ? 'List View' : 'Map View'}
                    </button>
                    {activeFilters.amenities.length > 0 && (
                        <span style={{ color: '#64748b', fontWeight: 500 }}>
                            · {activeFilters.amenities.join(', ')}
                        </span>
                    )}
                </div>
            </div>

            <div className="search-layout">
                {/* Sidebar Filters */}
                <aside className="search-sidebar">
                    <div className="filter-group">
                        <h4>Housing Type</h4>
                        <select
                            className="form-input"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{ width: '100%', marginBottom: '0.5rem' }}
                        >
                            <option value="All Types">All Types</option>
                            <option value="PG (Boys)">PG (Only for Boys)</option>
                            <option value="PG (Girls)">PG (Only for Girls)</option>
                            <option value="Individual House">Individual House</option>
                            <option value="Family Flat">Family Apartment</option>
                            <option value="Shared Apartment">Group Flat (Sharing)</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <h4>Max Price: ₹{maxPrice.toLocaleString('en-IN')}</h4>
                        {/* UNIQUE FEATURE 5: Smart Budget Planner */}
                        <button
                            className="budget-planner-trigger"
                            onClick={() => setShowBudgetPlanner(true)}
                        >
                            <Calculator size={14} /> Use Smart Budget Planner
                        </button>
                        <div className="price-slider">
                            <input
                                type="range"
                                min="5000"
                                max="100000"
                                step="500"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                className="slider"
                            />
                        </div>
                        <div className="price-inputs muted" style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span>₹5k</span><span>₹100k+</span>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4>Environment</h4>
                        <label className="checkbox-label"><input type="checkbox" /> <span>Ultra Quiet</span></label>
                        <label className="checkbox-label"><input type="checkbox" /> <span>High Safety Rating</span></label>
                        <label className="checkbox-label"><input type="checkbox" /> <span>5-Star Cleanliness</span></label>
                    </div>

                    <div className="filter-group">
                        <h4>Nearby</h4>
                        <label className="checkbox-label"><input type="checkbox" /> <span>Shops (&lt; 500m)</span></label>
                        <label className="checkbox-label"><input type="checkbox" /> <span>Medical Center</span></label>
                        <label className="checkbox-label"><input type="checkbox" /> <span>Transit Hub</span></label>
                    </div>

                    <div className="filter-group">
                        <h4>Crowd Type</h4>
                        <label className="checkbox-label"><input type="checkbox" /> <span>Family Friendly</span></label>
                        <label className="checkbox-label"><input type="checkbox" /> <span>Student Hub</span></label>
                        <label className="checkbox-label"><input type="checkbox" /> <span>Professional Area</span></label>
                    </div>

                    <div className="filter-group">
                        <h4>Amenities <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>(click to select)</span></h4>
                        <div className="amenities-tags">
                            {[
                                { key: 'Wifi', icon: <Wifi size={14} /> },
                                { key: 'Pool', icon: <Waves size={14} /> },
                                { key: 'Gym', icon: <Dumbbell size={14} /> },
                                { key: 'Parking', icon: <Car size={14} /> },
                                { key: 'AC', icon: <Snowflake size={14} /> }
                            ].map(({ key, icon }) => (
                                <div
                                    key={key}
                                    className={`tag-pill${selectedAmenities.includes(key) ? ' active' : ''}`}
                                    onClick={() => toggleAmenity(key)}
                                    title={`Filter by ${key}`}
                                >
                                    {icon} {key}
                                </div>
                            ))}
                        </div>
                        {selectedAmenities.length > 0 && (
                            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
                                ✓ {selectedAmenities.length} amenity filter{selectedAmenities.length > 1 ? 's' : ''} selected
                            </div>
                        )}
                    </div>

                    {/* Search Homes Button — directly after Amenities */}
                    <div className="filter-group">
                        <button className="search-homes-btn" onClick={handleSearch}>
                            <Search size={18} /> Search Homes
                        </button>
                        {activeFilters.category !== 'All Types' || activeFilters.amenities.length > 0 || activeFilters.atmosphere ? (
                            <button
                                className="clear-all-btn"
                                onClick={() => {
                                    setSelectedCategory('All Types');
                                    setSelectedAtmosphere(null);
                                    setSelectedAmenities([]);
                                    setMaxPrice(50000);
                                    setSelectedDuration('Any Duration');
                                    setSelectedTenantType('Students & Professionals');
                                    setActiveFilters({ 
                                        price: 50000, 
                                        category: 'All Types', 
                                        atmosphere: null, 
                                        amenities: [],
                                        duration: 'Any Duration',
                                        tenantType: 'Students & Professionals'
                                    });
                                    setVisibleCount(12);
                                }}
                            >
                                ✕ Clear All Filters
                            </button>
                        ) : null}
                    </div>
                    <div className="filter-group">
                        <button className="radar-compare-trigger" onClick={() => setShowRadarCompare(true)}>
                            <BarChart3 size={14} /> Compare Areas Radar
                        </button>
                    </div>
                </aside>

                {/* Results Section */}
                <div className="search-results" id="search-results-section">
                    {/* Compact Vibe Selector */}
                    <div className="vibe-selector-compact" style={{ 
                        background: 'var(--bg-white)', 
                        padding: '1.25rem', 
                        borderRadius: 'var(--radius-lg)', 
                        marginBottom: '1.5rem',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Explore Area Vibes</h3>
                                <p className="muted" style={{ fontSize: '0.8rem', margin: '0.25rem 0 0 0' }}>Find a neighborhood that matches your lifestyle</p>
                            </div>
                            <div className="mood-switcher" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                                {atmospheres.map(a => (
                                    <button 
                                        key={a.title} 
                                        className={`mood-tab ${selectedAtmosphere === a.title ? 'active' : ''}`}
                                        onClick={() => handleAtmosphereClick(a.title)}
                                        style={{ 
                                            padding: '0.5rem 1rem',
                                            borderRadius: '2rem',
                                            border: '1px solid ' + (selectedAtmosphere === a.title ? a.color : 'var(--border-color)'),
                                            backgroundColor: selectedAtmosphere === a.title ? a.color + '10' : 'transparent',
                                            color: selectedAtmosphere === a.title ? a.color : 'var(--text-muted)',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {a.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedAtmosphere && (
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 2fr', 
                                gap: '1.5rem', 
                                animation: 'fadeIn 0.3s ease',
                                paddingTop: '1rem',
                                borderTop: '1px solid #f1f5f9'
                            }}>
                                <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '100px' }}>
                                    <img src={currentAtmosphere.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${currentAtmosphere.color}aa, transparent)` }}></div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: currentAtmosphere.color, textTransform: 'uppercase' }}>{currentAtmosphere.tag}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>· {currentAtmosphere.insight}</span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', margin: 0, color: '#1e293b', lineHeight: 1.4 }}>{currentAtmosphere.desc}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Active Filter Summary */}
                    {(activeFilters.category !== 'All Types' || activeFilters.amenities.length > 0 || activeFilters.atmosphere) && (
                        <div className="active-filter-bar">
                            <span>🔍 Filtering by: </span>
                            {activeFilters.category !== 'All Types' && <span className="active-filter-chip">{activeFilters.category}</span>}
                            {activeFilters.atmosphere && <span className="active-filter-chip">{activeFilters.atmosphere}</span>}
                            {activeFilters.amenities.map(a => <span key={a} className="active-filter-chip">{a}</span>)}
                            <span style={{ color: '#64748b', marginLeft: '0.5rem' }}>· {filteredProperties.length} results</span>
                        </div>
                    )}

                    {/* Property Grid or Map View */}
                    {isMapView ? (
                        <div className="map-view-container" style={{ 
                            position: 'relative', 
                            background: '#f8fafc', 
                            borderRadius: 'var(--radius-lg)', 
                            overflow: 'hidden',
                            height: '700px',
                            border: '1px solid var(--border-color)',
                            animation: 'fadeIn 0.4s ease'
                        }}>
                            <img src="/property_map_view_1778469197421.png" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                            <div className="map-overlay-info" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '220px' }}>
                                <h4 style={{ margin: '0 0 0.25rem 0' }}>Explore Neighborhoods</h4>
                                <p className="muted" style={{ fontSize: '0.75rem', margin: 0 }}>Click on pins to view properties in that specific locality.</p>
                                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.65rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>₹10k-₹25k</span>
                                    <span style={{ fontSize: '0.65rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>₹25k-₹50k</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="properties-grid">
                            {finalProperties.length === 0 ? (
                                <div className="no-results-msg">
                                    <p>😕 No properties found matching your criteria.</p>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Try adjusting your filters and click Search Homes again.</p>
                                </div>
                            ) : (
                                finalProperties.slice(0, visibleCount).map(prop => (
                                    <div key={prop.id} style={{ position: 'relative' }}>
                                        <PropertyCard 
                                            property={prop} 
                                            matchScore={prop.lifestyleMatch}
                                            onClick={() => navigateTo('details-view', prop)} 
                                        />
                                        <button 
                                            onClick={() => toggleCompare(prop)}
                                            style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                right: '1rem',
                                                zIndex: 10,
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '2rem',
                                                border: 'none',
                                                backgroundColor: compareList.find(p => p.id === prop.id) ? '#3b82f6' : 'rgba(255,255,255,0.9)',
                                                color: compareList.find(p => p.id === prop.id) ? 'white' : '#1e293b',
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            {compareList.find(p => p.id === prop.id) ? '✓ COMPARING' : '+ COMPARE'}
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {visibleCount < filteredProperties.length ? (
                        <div className="load-more-container">
                            <button className="btn btn-dark" onClick={handleLoadMore}>Load More Properties</button>
                        </div>
                    ) : filteredProperties.length > 0 ? (
                        <div className="load-more-container">
                            <p className="muted">You've seen all {filteredProperties.length} results.</p>
                        </div>
                    ) : null}
                </div>
            </div>

            {showBudgetPlanner && (
                <SmartBudgetPlanner
                    onClose={() => setShowBudgetPlanner(false)}
                    onApplyBudget={(budget) => { setMaxPrice(budget); }}
                />
            )}

            {showRadarCompare && (
                <AreaComparisonRadar onClose={() => setShowRadarCompare(false)} />
            )}

            {/* Comparison Floating Bar */}
            {compareList.length > 0 && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#1e293b',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent)' }}>
                            {compareList.map((p, idx) => (
                                <img 
                                    key={p.id} 
                                    src={p.image} 
                                    style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%', 
                                        border: '2px solid #1e293b',
                                        marginLeft: idx === 0 ? 0 : '-15px',
                                        objectFit: 'cover'
                                    }} 
                                />
                            ))}
                        </div>
                        <span style={{ fontWeight: 600 }}>{compareList.length} Selected to Compare</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                            onClick={() => setCompareList([])}
                            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                            Clear
                        </button>
                        <button 
                            onClick={() => setShowRadarCompare(true)}
                            style={{ 
                                backgroundColor: '#3b82f6', 
                                color: 'white', 
                                border: 'none', 
                                padding: '0.6rem 1.5rem', 
                                borderRadius: '2rem', 
                                fontWeight: 700, 
                                cursor: 'pointer' 
                            }}
                        >
                            Compare Details
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default SearchView;
