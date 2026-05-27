import React from 'react';
import { Heart, Bell } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const Navbar = ({ activeView, navigateTo, onOpenProfile, user, isLoggedIn }) => {
    const { wishlist } = useWishlist();

    return (
        <nav className="navbar">
            <div className="nav-brand" onClick={() => navigateTo('home-view')}>
                <strong>LUXESTAY</strong>
            </div>
            <div className="nav-links">
                <a 
                    href="#" 
                    className={`nav-link ${activeView === 'search-view' ? 'active' : ''}`} 
                    onClick={(e) => { e.preventDefault(); navigateTo('search-view'); }}
                >
                    Properties
                </a>
                <a 
                    href="#" 
                    className={`nav-link ${activeView === 'rent-view' ? 'active' : ''}`} 
                    onClick={(e) => { e.preventDefault(); navigateTo('rent-view'); }}
                >
                    Rent
                </a>
                <a 
                    href="#" 
                    className={`nav-link ${activeView === 'listings-view' ? 'active' : ''}`} 
                    onClick={(e) => { e.preventDefault(); navigateTo('listings-view'); }}
                >
                    Listings
                </a>
                <a 
                    href="#" 
                    className={`nav-link ${activeView === 'support-view' ? 'active' : ''}`} 
                    onClick={(e) => { e.preventDefault(); navigateTo('support-view'); }}
                >
                    Support
                </a>
            </div>
            <div className="nav-actions">
                {/* Wishlist heart with count badge */}
                <button
                    className={`icon-btn wishlist-nav-btn${activeView === 'wishlist-view' ? ' active' : ''}`}
                    onClick={() => navigateTo('wishlist-view')}
                    title="My Wishlist"
                    id="nav-wishlist-btn"
                >
                    <Heart
                        size={20}
                        strokeWidth={1.5}
                        fill={wishlist.length > 0 ? '#ef4444' : 'none'}
                        color={wishlist.length > 0 ? '#ef4444' : 'currentColor'}
                    />
                    {wishlist.length > 0 && (
                        <span className="wishlist-nav-count">{wishlist.length > 99 ? '99+' : wishlist.length}</span>
                    )}
                </button>

                <button 
                    className={`icon-btn notification-btn ${activeView === 'notifications-view' ? 'active' : ''}`}
                    onClick={() => navigateTo('notifications-view')}
                >
                    <Bell size={20} />
                    <span className="badge"></span>
                </button>
                
                {isLoggedIn ? (
                    <div className="nav-user" onClick={onOpenProfile}>
                        <div className="nav-profile-name">{user.name.split(' ')[0]}</div>
                        <div className="nav-profile-pic">
                            <img src={user.photo} alt="Profile" />
                        </div>
                    </div>
                ) : (
                    <button className="btn btn-dark" onClick={onOpenProfile}>
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
