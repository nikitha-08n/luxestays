import React, { useState, useMemo } from 'react';
import {
    Heart, MapPin, Star, Trash2, Search, SlidersHorizontal,
    LayoutGrid, LayoutList, Share2, Download, TrendingUp,
    Home, Building2, Users, CheckCircle2, Clock, ArrowRight,
    X, Bookmark, Sparkles
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const SORT_OPTIONS = ['Recently Saved', 'Price: Low to High', 'Price: High to Low', 'Rating'];

const categoryMeta = {
    'PG (Boys)':          { icon: <Users size={14} />,    color: '#3b82f6' },
    'PG (Girls)':         { icon: <Users size={14} />,    color: '#ec4899' },
    'Individual House':   { icon: <Home size={14} />,     color: '#f59e0b' },
    'Family Flat':        { icon: <Building2 size={14} />, color: '#10b981' },
    'Shared Apartment':   { icon: <Users size={14} />,    color: '#8b5cf6' },
};

const WishlistView = ({ navigateTo }) => {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState('Recently Saved');
    const [layout, setLayout] = useState('grid'); // 'grid' | 'list'
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [removingId, setRemovingId] = useState(null);

    // Derived category list
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(wishlist.map(p => p.category).filter(Boolean))];
        return cats;
    }, [wishlist]);

    // Filter + sort
    const displayed = useMemo(() => {
        let items = [...wishlist];
        if (query.trim()) {
            const q = query.toLowerCase();
            items = items.filter(p =>
                p.title?.toLowerCase().includes(q) ||
                p.location?.toLowerCase().includes(q)
            );
        }
        if (selectedCategory !== 'All') {
            items = items.filter(p => p.category === selectedCategory);
        }
        switch (sortBy) {
            case 'Price: Low to High':  items.sort((a, b) => a.price - b.price); break;
            case 'Price: High to Low':  items.sort((a, b) => b.price - a.price); break;
            case 'Rating':              items.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
            default:
                items.sort((a, b) => new Date(b.savedAt || 0) - new Date(a.savedAt || 0));
        }
        return items;
    }, [wishlist, query, sortBy, selectedCategory]);

    const avgPrice = wishlist.length
        ? Math.round(wishlist.reduce((s, p) => s + (p.price || 0), 0) / wishlist.length)
        : 0;

    const handleRemove = (id) => {
        setRemovingId(id);
        setTimeout(() => {
            removeFromWishlist(id);
            setRemovingId(null);
        }, 320);
    };

    const handleClear = () => {
        if (window.confirm('Clear your entire wishlist?')) clearWishlist();
    };

    return (
        <main className="view active wishlist-view">

            {/* ── Hero Banner ── */}
            <div className="wishlist-hero">
                <div className="wishlist-hero-inner">
                    <div className="wishlist-hero-left">
                        <div className="wishlist-hero-icon">
                            <Heart size={32} strokeWidth={1.5} fill="white" color="white" />
                        </div>
                        <div>
                            <h1 className="wishlist-hero-title">My Wishlist</h1>
                            <p className="wishlist-hero-sub">
                                {wishlist.length === 0
                                    ? 'Start saving homes you love'
                                    : `${wishlist.length} saved propert${wishlist.length === 1 ? 'y' : 'ies'}`}
                            </p>
                        </div>
                    </div>
                    {wishlist.length > 0 && (
                        <div className="wishlist-stats-row">
                            <div className="wishlist-stat">
                                <span className="wishlist-stat-value">{wishlist.length}</span>
                                <span className="wishlist-stat-label">Saved</span>
                            </div>
                            <div className="wishlist-stat-divider" />
                            <div className="wishlist-stat">
                                <span className="wishlist-stat-value">₹{avgPrice.toLocaleString('en-IN')}</span>
                                <span className="wishlist-stat-label">Avg Price</span>
                            </div>
                            <div className="wishlist-stat-divider" />
                            <div className="wishlist-stat">
                                <span className="wishlist-stat-value">
                                    {wishlist.filter(p => p.rating >= 4.5).length}
                                </span>
                                <span className="wishlist-stat-label">Top Rated</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="wishlist-body">

                {wishlist.length > 0 ? (
                    <>
                        {/* ── Controls Bar ── */}
                        <div className="wishlist-controls">
                            <div className="wishlist-search-wrap">
                                <Search size={16} className="wishlist-search-icon" />
                                <input
                                    className="wishlist-search-input"
                                    placeholder="Search saved homes…"
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                />
                                {query && (
                                    <button className="wishlist-search-clear" onClick={() => setQuery('')}>
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            <div className="wishlist-controls-right">
                                <select
                                    className="wishlist-sort-select"
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                >
                                    {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                                </select>

                                <div className="wishlist-layout-toggle">
                                    <button
                                        className={`wl-layout-btn${layout === 'grid' ? ' active' : ''}`}
                                        onClick={() => setLayout('grid')}
                                        title="Grid view"
                                    >
                                        <LayoutGrid size={16} />
                                    </button>
                                    <button
                                        className={`wl-layout-btn${layout === 'list' ? ' active' : ''}`}
                                        onClick={() => setLayout('list')}
                                        title="List view"
                                    >
                                        <LayoutList size={16} />
                                    </button>
                                </div>

                                <button className="btn btn-outline btn-sm wishlist-clear-btn" onClick={handleClear}>
                                    <Trash2 size={14} /> Clear All
                                </button>
                            </div>
                        </div>

                        {/* ── Category Tabs ── */}
                        <div className="wishlist-category-tabs">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`wl-cat-tab${selectedCategory === cat ? ' active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat !== 'All' && categoryMeta[cat]?.icon}
                                    {cat}
                                    <span className="wl-cat-count">
                                        {cat === 'All' ? wishlist.length : wishlist.filter(p => p.category === cat).length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* ── Result count ── */}
                        <div className="wishlist-result-bar">
                            <span className="muted" style={{ fontSize: '0.9rem' }}>
                                {displayed.length === 0
                                    ? 'No homes match your search'
                                    : `Showing ${displayed.length} of ${wishlist.length} saved homes`}
                            </span>
                        </div>

                        {/* ── Cards ── */}
                        {displayed.length === 0 ? (
                            <div className="wishlist-no-match">
                                <Search size={48} opacity={0.15} />
                                <p>No results for "<strong>{query}</strong>"</p>
                                <button className="btn btn-outline btn-sm" onClick={() => { setQuery(''); setSelectedCategory('All'); }}>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className={layout === 'grid' ? 'wishlist-grid' : 'wishlist-list'}>
                                {displayed.map(home => (
                                    layout === 'grid'
                                        ? <WishlistGridCard key={home.id} home={home} onRemove={handleRemove} onView={() => navigateTo('details-view', home)} removing={removingId === home.id} />
                                        : <WishlistListCard key={home.id} home={home} onRemove={handleRemove} onView={() => navigateTo('details-view', home)} removing={removingId === home.id} />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <WishlistEmpty navigateTo={navigateTo} />
                )}
            </div>
        </main>
    );
};

/* ── Grid Card ── */
const WishlistGridCard = ({ home, onRemove, onView, removing }) => {
    const img = home.gallery?.[0]?.url || home.image;
    const catMeta = categoryMeta[home.category] || {};

    return (
        <div className={`wl-card${removing ? ' wl-removing' : ''}`}>
            <div className="wl-card-img-wrap" onClick={onView}>
                <img src={img} alt={home.title} className="wl-card-img" />
                <div className="wl-card-overlay" />
                <div className="wl-card-price-badge">
                    ₹{(home.price || 0).toLocaleString('en-IN')}<span>/mo</span>
                </div>
                {home.rating && (
                    <div className="wl-card-rating-badge">
                        <Star size={12} fill="currentColor" /> {home.rating}
                    </div>
                )}
            </div>
            <button className="wl-remove-btn" onClick={() => onRemove(home.id)} title="Remove from wishlist">
                <Heart size={16} strokeWidth={1.5} fill="#ef4444" color="#ef4444" />
            </button>

            <div className="wl-card-body">
                {home.category && (
                    <div className="wl-category-tag" style={{ color: catMeta.color || '#64748b' }}>
                        {catMeta.icon} {home.category}
                    </div>
                )}
                <h3 className="wl-card-title" onClick={onView}>{home.title}</h3>
                <div className="wl-card-location">
                    <MapPin size={13} /> {home.location}
                </div>

                {home.amenities?.length > 0 && (
                    <div className="wl-amenities">
                        {home.amenities.slice(0, 4).map(a => (
                            <span key={a} className="wl-amenity-chip">{a}</span>
                        ))}
                    </div>
                )}

                <div className="wl-card-footer">
                    <button className="btn btn-dark btn-sm wl-view-btn" onClick={onView}>
                        View Details <ArrowRight size={14} />
                    </button>
                    <button className="wl-icon-action" onClick={() => onRemove(home.id)} title="Remove">
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── List Card ── */
const WishlistListCard = ({ home, onRemove, onView, removing }) => {
    const img = home.gallery?.[0]?.url || home.image;
    const catMeta = categoryMeta[home.category] || {};

    return (
        <div className={`wl-list-card${removing ? ' wl-removing' : ''}`}>
            <div className="wl-list-img" style={{ backgroundImage: `url(${img})` }} onClick={onView} />
            <div className="wl-list-body">
                {home.category && (
                    <div className="wl-category-tag" style={{ color: catMeta.color || '#64748b', marginBottom: '0.25rem' }}>
                        {catMeta.icon} {home.category}
                    </div>
                )}
                <h3 className="wl-list-title" onClick={onView}>{home.title}</h3>
                <div className="wl-card-location">
                    <MapPin size={13} /> {home.location}
                </div>
                {home.amenities?.length > 0 && (
                    <div className="wl-amenities" style={{ marginTop: '0.5rem' }}>
                        {home.amenities.slice(0, 5).map(a => (
                            <span key={a} className="wl-amenity-chip">{a}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="wl-list-right">
                <div className="wl-list-price">
                    ₹{(home.price || 0).toLocaleString('en-IN')}
                    <span>/mo</span>
                </div>
                {home.rating && (
                    <div className="wl-list-rating">
                        <Star size={13} fill="currentColor" /> {home.rating}
                    </div>
                )}
                <button className="btn btn-dark btn-sm" style={{ marginTop: 'auto' }} onClick={onView}>
                    View <ArrowRight size={13} />
                </button>
                <button className="wl-icon-action" style={{ marginTop: '0.5rem' }} onClick={() => onRemove(home.id)} title="Remove">
                    <Trash2 size={15} />
                </button>
            </div>
        </div>
    );
};

/* ── Empty State ── */
const WishlistEmpty = ({ navigateTo }) => (
    <div className="wishlist-empty">
        <div className="wishlist-empty-hearts">
            <Heart size={80} strokeWidth={1} opacity={0.06} className="wl-bg-heart wl-h1" />
            <Heart size={48} strokeWidth={1} opacity={0.08} className="wl-bg-heart wl-h2" fill="currentColor" />
            <div className="wishlist-empty-icon">
                <Heart size={40} strokeWidth={1.5} color="#ef4444" fill="#ef4444" />
            </div>
        </div>
        <h2 className="wishlist-empty-title">Your wishlist is empty</h2>
        <p className="wishlist-empty-sub">
            Tap the <Heart size={14} fill="#ef4444" color="#ef4444" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> on any property to save it here for later.
        </p>
        <div className="wishlist-empty-tips">
            <div className="wl-tip"><CheckCircle2 size={16} color="#10b981" /> Browse 1,200+ verified properties</div>
            <div className="wl-tip"><CheckCircle2 size={16} color="#10b981" /> Compare prices across locations</div>
            <div className="wl-tip"><CheckCircle2 size={16} color="#10b981" /> Wishlist syncs across sessions</div>
        </div>
        <button className="btn btn-dark btn-large wishlist-explore-btn" onClick={() => navigateTo('search-view')}>
            <Search size={20} /> Explore Properties
        </button>
    </div>
);

export default WishlistView;
