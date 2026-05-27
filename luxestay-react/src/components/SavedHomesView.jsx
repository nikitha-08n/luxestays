import React, { useState } from 'react';
import { Heart, MapPin, Star, Trash2, LayoutDashboard, Search, ChevronRight } from 'lucide-react';

const INITIAL_SAVED = [
    {
        id: 1,
        title: 'The Azure Pavilion Estate',
        location: 'Malibu, California',
        price: '₹1,12,000',
        rating: 4.98,
        image: 'https://images.unsplash.com/photo-1613490908592-fd5e16f310f8?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 2,
        title: 'Obsidian Penthouse',
        location: 'Upper West Side, NYC',
        price: '₹1,55,000',
        rating: 4.95,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 3,
        title: 'Villa Serena',
        location: 'Lake Como, Italy',
        price: '₹2,40,000',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
    }
];

const SavedHomesView = ({ navigateTo }) => {
    const [savedList, setSavedList] = useState(INITIAL_SAVED);

    const unsave = (id) => {
        setSavedList(savedList.filter(item => item.id !== id));
    };

    return (
        <main className="view active">
            <div className="section-container">
                <div className="flex-between mb-3rem">
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Saved Homes</h1>
                        <p className="muted">Your curated collection of luxury retreats and penthouses.</p>
                    </div>
                    <div className="flex-center gap-1rem">
                        {savedList.length > 0 && (
                            <button className="btn btn-outline" onClick={() => setSavedList([])}>
                                Clear All
                            </button>
                        )}
                        <button className="btn btn-dark" onClick={() => navigateTo('dashboard-view')}>
                            <LayoutDashboard size={18} /> Dashboard
                        </button>
                    </div>
                </div>

                {savedList.length > 0 ? (
                    <div className="saved-grid">
                        {savedList.map(home => (
                            <div key={home.id} className="saved-card">
                                <div className="saved-card-img-wrap">
                                    <div 
                                        className="saved-card-img" 
                                        style={{ backgroundImage: `url(${home.image})` }}
                                        onClick={() => navigateTo('details-view')}
                                    ></div>
                                    <button className="unsave-btn" onClick={() => unsave(home.id)}>
                                        <Heart size={20} fill="#ef4444" color="#ef4444" />
                                    </button>
                                </div>
                                
                                <div className="saved-card-body">
                                    <div className="flex-between mb-05rem">
                                        <span className="saved-card-location"><MapPin size={14} /> {home.location}</span>
                                        <span className="saved-card-rating"><Star size={14} fill="currentColor" /> {home.rating}</span>
                                    </div>
                                    <h3 className="saved-card-title">{home.title}</h3>
                                    <div className="saved-card-price">
                                        <strong>{home.price}</strong> <span>/ night</span>
                                    </div>
                                    
                                    <div className="saved-card-actions">
                                        <button className="btn btn-dark w-100" onClick={() => navigateTo('details-view')}>
                                            Check Availability
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="notif-empty" style={{ padding: '5rem 2rem' }}>
                        <div className="saved-empty-icon">
                            <Heart size={64} opacity={0.1} />
                        </div>
                        <h2>Your wishlist is empty</h2>
                        <p className="muted mb-2rem">Start exploring our handpicked collection to find your next dream stay.</p>
                        <button className="btn btn-dark" onClick={() => navigateTo('search-view')}>
                            <Search size={18} /> Explore Properties
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default SavedHomesView;
