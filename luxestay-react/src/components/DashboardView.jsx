import React from 'react';
import { useWishlist } from '../context/WishlistContext';

const DashboardView = ({ navigateTo, onContactHost, user }) => {
    const { wishlist } = useWishlist();
    const firstName = user?.name?.split(' ')[0] || 'Guest';

    return (
        <main className="view active">
            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <nav className="dash-nav">
                        <a href="#" className="dash-link active" onClick={e => e.preventDefault()}>Dashboard</a>
                        <a href="#" className="dash-link" onClick={e => { e.preventDefault(); navigateTo('bookings-view'); }}>My Bookings</a>
                        <a href="#" className="dash-link" onClick={e => { e.preventDefault(); navigateTo('wishlist-view'); }}>My Wishlist</a>
                        <a href="#" className="dash-link" onClick={e => { e.preventDefault(); navigateTo('notifications-view'); }}>Messages</a>
                        <a href="#" className="dash-link" onClick={e => e.preventDefault()}>Settings</a>
                    </nav>
                </aside>
                
                <div className="dashboard-content">
                    <div className="welcome-header">
                        <h2>Welcome back, {firstName}</h2>
                        <p>Here's what's happening with your luxury retreats today.</p>
                    </div>
                    
                    <div className="stats-cards">
                        <div className="stat-card bg-dark">
                            <div className="stat-label">UPCOMING TRIPS</div>
                            <div className="stat-value">2 Planned</div>
                            <div className="stat-sub">Next trip in 12 days</div>
                        </div>
                        <div className="stat-card bg-light-blue" style={{ cursor: 'pointer' }} onClick={() => navigateTo('wishlist-view')}>
                            <div className="stat-label">MY WISHLIST</div>
                            <div className="stat-value">{wishlist.length} Saved</div>
                            <div className="stat-avatars">
                                {wishlist.slice(0, 3).map((p, i) => (
                                    <div key={i} className="mini-avatar" style={{backgroundImage: `url(${p.gallery?.[0]?.url || p.image})`, backgroundSize: 'cover'}}></div>
                                ))}
                                {wishlist.length > 3 && <div className="mini-avatar text">+{wishlist.length - 3}</div>}
                                {wishlist.length === 0 && <div className="mini-avatar text" style={{ fontSize: '0.7rem' }}>Empty</div>}
                            </div>
                        </div>
                        <div className="stat-card bg-light-green">
                            <div className="stat-label">LUXE REWARDS</div>
                            <div className="stat-value">Gold Tier</div>
                            <div className="stat-sub text-green">Earned 2,400 points this month</div>
                        </div>
                    </div>
                    
                    <div className="dashboard-grid">
                        <div className="current-booking-section">
                            <div className="section-header flex-between">
                                <h3>Current Booking</h3>
                                <a href="#" className="link-text" onClick={e => e.preventDefault()}>View All</a>
                            </div>
                            <div className="current-booking-card">
                                <div className="booking-image">
                                    <span className="badge badge-white"><div className="dot-green"></div> CONFIRMED</span>
                                </div>
                                <div className="booking-details">
                                    <div className="flex-between">
                                        <div>
                                            <h4>The Obsidian Penthouse</h4>
                                            <p className="muted">Upper West Side, New York</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="muted label-text">CHECK-IN DATE</div>
                                            <div>Oct 24, 2024</div>
                                        </div>
                                    </div>
                                    <div className="booking-actions">
                                        <button className="btn btn-dark" onClick={() => navigateTo('entry-pass-view')}>Get Entry Pass</button>
                                        <button className="btn btn-outline" onClick={onContactHost}>Contact Host</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="messages-section">
                            <div className="section-header flex-between">
                                <h3>Messages</h3>
                                <a href="#" className="link-text text-green" onClick={e => e.preventDefault()}>Inbox</a>
                            </div>
                            <div className="message-list">
                                <div className="message-item">
                                    <div className="msg-avatar" style={{backgroundImage: "url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80')", backgroundSize: 'cover'}}></div>
                                    <div className="msg-content">
                                        <div className="msg-header">
                                            <h4>Marcus Thorne</h4>
                                            <span className="time">10:45 AM</span>
                                        </div>
                                        <p>Of course! The wine cellar is fully sto...</p>
                                    </div>
                                </div>
                                <div className="message-item unread">
                                    <div className="msg-avatar" style={{backgroundImage: "url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80')", backgroundSize: 'cover'}}></div>
                                    <div className="msg-content">
                                        <div className="msg-header">
                                            <h4>Elena Rossi</h4>
                                            <span className="time">Yesterday</span>
                                        </div>
                                        <p>Your booking at Villa Serena is con...</p>
                                    </div>
                                    <div className="unread-dot"></div>
                                </div>
                                <div className="message-item">
                                    <div className="msg-avatar" style={{backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80')", backgroundSize: 'cover'}}></div>
                                    <div className="msg-content">
                                        <div className="msg-header">
                                            <h4>LuxeStay Concierge</h4>
                                            <span className="time">Oct 19</span>
                                        </div>
                                        <p>How can we assist you with your upco...</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="quick-links mt-2rem">
                                <h3>Quick Links</h3>
                                <div className="grid-2">
                                    <button className="btn btn-outline w-100">Support</button>
                                    <button className="btn btn-outline w-100">Invoices</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardView;
