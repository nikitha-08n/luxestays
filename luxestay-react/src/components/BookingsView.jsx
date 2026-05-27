import React, { useState } from 'react';
import { Calendar, MapPin, Receipt, MessageCircle, Star, RefreshCw, ChevronRight, LayoutDashboard, QrCode, CheckCircle2 } from 'lucide-react';

const MOCK_BOOKINGS_DATA = [
    {
        id: 'BK-1001',
        title: 'The Azure Pavilion Estate',
        location: 'Malibu, California',
        dates: 'May 12 – 18, 2024',
        price: '₹8,15,616',
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1613490908592-fd5e16f310f8?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'BK-0982',
        title: 'Obsidian Penthouse',
        location: 'Upper West Side, NYC',
        dates: 'Oct 24 – 30, 2024',
        price: '₹12,40,000',
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'BK-0854',
        title: 'Brooklyn Heights Brownstone',
        location: 'Brooklyn, NY',
        dates: 'March 05 – 12, 2024',
        price: '₹6,20,000',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'BK-0711',
        title: 'Chelsea Garden Suite',
        location: 'Chelsea, Manhattan',
        dates: 'Jan 15 – 20, 2024',
        price: '₹4,80,000',
        status: 'cancelled',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    }
];

const RenewLeaseModal = ({ booking, onClose, onConfirm }) => {
    const [duration, setDuration] = useState('1 Year');
    
    return (
        <div className="bm-overlay" style={{ zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="auth-container" style={{ maxWidth: '400px', padding: '2.5rem', flexDirection: 'column', background: 'white', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '700' }}>Renew Lease</h2>
                <p className="muted" style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                    Extend your stay at <strong>{booking.title}</strong>
                </p>
                
                <div className="filter-group" style={{ marginBottom: '2rem', width: '100%' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', fontSize: '0.85rem', color: '#475569' }}>Select Renewal Duration</label>
                    <select 
                        className="form-input" 
                        value={duration} 
                        onChange={(e) => setDuration(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                    >
                        <option value="1 Month">1 Month</option>
                        <option value="3 Months">3 Months</option>
                        <option value="6 Months">6 Months</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2 Years">2 Years</option>
                    </select>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <button className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }} onClick={onClose}>Cancel</button>
                    <button className="btn btn-dark" style={{ flex: 1, padding: '0.75rem' }} onClick={() => onConfirm(duration)}>Confirm Renewal</button>
                </div>
            </div>
        </div>
    );
};

const BookingsView = ({ navigateTo, onContactHost }) => {
    const [tab, setTab] = useState('upcoming');
    const [bookings, setBookings] = useState(MOCK_BOOKINGS_DATA);
    const [selectedBookingForRenewal, setSelectedBookingForRenewal] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const filteredBookings = bookings.filter(b => b.status === tab);

    const handleRenew = (duration) => {
        if (!selectedBookingForRenewal) return;

        const updatedBookings = bookings.map(b => {
            if (b.id === selectedBookingForRenewal.id) {
                return {
                    ...b,
                    status: 'upcoming',
                    dates: `Renewed for ${duration} (Starting from tomorrow)`
                };
            }
            return b;
        });

        setBookings(updatedBookings);
        setSelectedBookingForRenewal(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setTab('upcoming');
    };

    return (
        <main className="view active">
            <div className="section-container">
                <div className="flex-between mb-2rem">
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>My Bookings</h1>
                        <p className="muted">Manage your upcoming trips and review past stays.</p>
                    </div>
                    <button className="btn btn-outline" onClick={() => navigateTo('dashboard-view')}>
                        <LayoutDashboard size={18} /> Dashboard
                    </button>
                </div>

                {showSuccess && (
                    <div className="success-toast" style={{ background: '#ecfdf5', color: '#065f46', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #10b981' }}>
                        <CheckCircle2 size={20} />
                        <span>Lease successfully renewed! You can find it in your upcoming stays.</span>
                    </div>
                )}

                {/* Tabs */}
                <div className="bookings-tabs">
                    <button 
                        className={`booking-tab ${tab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setTab('upcoming')}
                    >
                        Upcoming <span>{bookings.filter(b => b.status === 'upcoming').length}</span>
                    </button>
                    <button 
                        className={`booking-tab ${tab === 'completed' ? 'active' : ''}`}
                        onClick={() => setTab('completed')}
                    >
                        Completed <span>{bookings.filter(b => b.status === 'completed').length}</span>
                    </button>
                    <button 
                        className={`booking-tab ${tab === 'cancelled' ? 'active' : ''}`}
                        onClick={() => setTab('cancelled')}
                    >
                        Cancelled
                    </button>
                </div>

                {/* List */}
                <div className="bookings-list">
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map(booking => (
                            <div key={booking.id} className="booking-list-card">
                                <div 
                                    className="booking-list-img"
                                    style={{ backgroundImage: `url(${booking.image})` }}
                                >
                                    <span className={`status-badge ${booking.status}`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </div>
                                
                                <div className="booking-list-content">
                                    <div className="flex-between">
                                        <div className="booking-id">{booking.id}</div>
                                        <div className="booking-price">{booking.price}</div>
                                    </div>
                                    <h3 className="booking-title">{booking.title}</h3>
                                    <div className="booking-meta-rows">
                                        <div className="meta-row"><MapPin size={16} /> {booking.location}</div>
                                        <div className="meta-row"><Calendar size={16} /> {booking.dates}</div>
                                    </div>

                                    <div className="booking-list-actions">
                                        {booking.status === 'upcoming' && (
                                            <>
                                                <button className="btn btn-dark btn-sm" onClick={() => navigateTo('entry-pass-view')}>
                                                    <QrCode size={16} /> Get Entry Pass
                                                </button>
                                                <button className="btn btn-outline btn-sm" onClick={onContactHost}>
                                                    <MessageCircle size={16} /> Contact Host
                                                </button>
                                            </>
                                        )}
                                        {booking.status === 'completed' && (
                                            <>
                                                <button className="btn btn-outline btn-sm">
                                                    <Star size={16} /> Write Review
                                                </button>
                                                <button className="btn btn-outline btn-sm">
                                                    <Receipt size={16} /> Invoice
                                                </button>
                                                <button className="btn btn-dark btn-sm" onClick={() => setSelectedBookingForRenewal(booking)}>
                                                    <RefreshCw size={16} /> Renew Lease
                                                </button>
                                            </>
                                        )}
                                        {booking.status === 'cancelled' && (
                                            <button className="btn btn-outline btn-sm">
                                                View Refund Status
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="booking-chevron">
                                    <ChevronRight size={24} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="notif-empty">
                            <h3>No bookings found</h3>
                            <p className="muted">You don't have any {tab} bookings at the moment.</p>
                            <button className="btn btn-dark mt-1rem" onClick={() => navigateTo('search-view')}>
                                Explore Properties
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {selectedBookingForRenewal && (
                <RenewLeaseModal 
                    booking={selectedBookingForRenewal} 
                    onClose={() => setSelectedBookingForRenewal(null)} 
                    onConfirm={handleRenew} 
                />
            )}
        </main>
    );
};

export default BookingsView;
