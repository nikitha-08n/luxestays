import React, { useState } from 'react';
import { Bell, MessageSquare, Calendar, Tag, CheckCircle2, Clock, Trash2, MoreVertical, Filter } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        type: 'booking',
        title: 'Booking Confirmed!',
        description: 'Your stay at The Azure Pavilion has been successfully reserved for May 12-18.',
        time: '2 hours ago',
        unread: true,
        icon: <CheckCircle2 size={20} className="text-green" />,
    },
    {
        id: 2,
        type: 'message',
        title: 'New Message from Sarah',
        description: 'Hey! I\'ve just shared the check-in instructions with you. Let me know if...',
        time: '5 hours ago',
        unread: true,
        icon: <MessageSquare size={20} style={{ color: '#3b82f6' }} />,
    },
    {
        id: 3,
        type: 'offer',
        title: 'Price Drop Alert',
        description: 'A property in your "Malibu Favorites" list just dropped its price by ₹25,000.',
        time: '1 day ago',
        unread: false,
        icon: <Tag size={20} style={{ color: '#f59e0b' }} />,
    },
    {
        id: 4,
        type: 'system',
        title: 'Identity Verified',
        description: 'Your profile verification is complete. You can now book "Verified Only" properties.',
        time: '2 days ago',
        unread: false,
        icon: <Bell size={20} style={{ color: '#6366f1' }} />,
    },
    {
        id: 5,
        type: 'booking',
        title: 'Past Stay Feedback',
        description: 'How was your stay at The Mountain Retreat? Share your experience with others.',
        time: '1 week ago',
        unread: false,
        icon: <Calendar size={20} style={{ color: '#ec4899' }} />,
    },
];

const NotificationsView = () => {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const [archivedNotifications, setArchivedNotifications] = useState([]);
    const [deletedNotifications, setDeletedNotifications] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedNotif, setSelectedNotif] = useState(null);
    const [notifSubStep, setNotifSubStep] = useState('details'); // 'details', 'action', 'archive'
    const [replyText, setReplyText] = useState('');

    const filteredNotifications = (() => {
        if (filter === 'trash') return deletedNotifications;
        if (filter === 'archive') return archivedNotifications;
        
        return notifications.filter(notif => {
            if (filter === 'all') return true;
            if (filter === 'unread') return notif.unread;
            return notif.type === filter;
        });
    })();

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const handleOpenNotif = (notif) => {
        setSelectedNotif(notif);
        setNotifSubStep('details');
    };

    const archiveNotification = (id) => {
        const notifToArchive = notifications.find(n => n.id === id);
        if (notifToArchive) {
            setArchivedNotifications([...archivedNotifications, { ...notifToArchive, unread: false }]);
            setNotifications(notifications.filter(n => n.id !== id));
        }
        if (selectedNotif?.id === id) setSelectedNotif(null);
    };

    const deleteNotification = (id) => {
        const notifToDelete = notifications.find(n => n.id === id) || archivedNotifications.find(n => n.id === id);
        if (notifToDelete) {
            setDeletedNotifications([...deletedNotifications, { ...notifToDelete, unread: false }]);
            setNotifications(notifications.filter(n => n.id !== id));
            setArchivedNotifications(archivedNotifications.filter(n => n.id !== id));
        }
        if (selectedNotif?.id === id) setSelectedNotif(null);
    };

    const restoreNotification = (id) => {
        const notifToRestore = archivedNotifications.find(n => n.id === id) || deletedNotifications.find(n => n.id === id);
        if (notifToRestore) {
            setNotifications([...notifications, notifToRestore]);
            setArchivedNotifications(archivedNotifications.filter(n => n.id !== id));
            setDeletedNotifications(deletedNotifications.filter(n => n.id !== id));
        }
    };

    const permanentlyDelete = (id) => {
        setDeletedNotifications(deletedNotifications.filter(n => n.id !== id));
    };

    const emptyTrash = () => {
        setDeletedNotifications([]);
    };

    const confirmArchive = () => {
        archiveNotification(selectedNotif.id);
    };

    return (
        <main className="view active">
            <div className="section-container">
                <div className="flex-between mb-2rem">
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Notifications</h1>
                        <p className="muted">Stay updated with your latest activities and messages.</p>
                    </div>
                    <div className="flex-center gap-1rem">
                        {filter === 'trash' ? (
                            <button className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444' }} onClick={emptyTrash}>
                                <Trash2 size={16} /> Empty Trash
                            </button>
                        ) : (
                            <button className="btn btn-outline" onClick={markAllAsRead}>
                                Mark all as read
                            </button>
                        )}
                    </div>
                </div>

                <div className="notifications-layout">
                    {/* Filters */}
                    <div className="notif-filters">
                        <button 
                            className={`notif-filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            <Filter size={16} /> All
                        </button>
                        <button 
                            className={`notif-filter-btn ${filter === 'unread' ? 'active' : ''}`}
                            onClick={() => setFilter('unread')}
                        >
                            <Clock size={16} /> Unread
                        </button>
                        <button 
                            className={`notif-filter-btn ${filter === 'booking' ? 'active' : ''}`}
                            onClick={() => setFilter('booking')}
                        >
                            <Calendar size={16} /> Bookings
                        </button>
                        <button 
                            className={`notif-filter-btn ${filter === 'message' ? 'active' : ''}`}
                            onClick={() => setFilter('message')}
                        >
                            <MessageSquare size={16} /> Messages
                        </button>
                        <button 
                            className={`notif-filter-btn ${filter === 'archive' ? 'active' : ''}`}
                            onClick={() => setFilter('archive')}
                            style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}
                        >
                            <Clock size={16} /> Archive
                        </button>
                        <button 
                            className={`notif-filter-btn ${filter === 'trash' ? 'active' : ''}`}
                            onClick={() => setFilter('trash')}
                            style={{ paddingTop: '0.75rem' }}
                        >
                            <Trash2 size={16} /> Trash
                        </button>
                    </div>

                    {/* List */}
                    <div className="notif-list">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map(notif => (
                                <div key={notif.id} className={`notif-item ${notif.unread ? 'unread' : ''}`}>
                                    <div className="notif-icon-wrap">
                                        {notif.icon}
                                        {notif.unread && <span className="notif-unread-dot"></span>}
                                    </div>
                                    <div className="notif-content">
                                        <div className="flex-between">
                                            <h4 className="notif-title">{notif.title}</h4>
                                            <span className="notif-time">{notif.time}</span>
                                        </div>
                                        <p className="notif-desc">{notif.description}</p>
                                        <div className="notif-actions">
                                            {filter === 'trash' || filter === 'archive' ? (
                                                <>
                                                    <button 
                                                        className="notif-action-btn"
                                                        onClick={() => restoreNotification(notif.id)}
                                                    >
                                                        Restore to Inbox
                                                    </button>
                                                    <button 
                                                        className="notif-action-btn delete"
                                                        onClick={() => filter === 'trash' ? permanentlyDelete(notif.id) : deleteNotification(notif.id)}
                                                    >
                                                        <Trash2 size={14} /> {filter === 'trash' ? 'Delete Permanently' : 'Move to Trash'}
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        className="notif-action-btn"
                                                        onClick={() => handleOpenNotif(notif)}
                                                    >
                                                        View Details
                                                    </button>
                                                    <button 
                                                        className="notif-action-btn"
                                                        onClick={() => archiveNotification(notif.id)}
                                                        style={{ color: '#6366f1' }}
                                                    >
                                                        Archive
                                                    </button>
                                                    <button 
                                                        className="notif-action-btn delete"
                                                        onClick={() => deleteNotification(notif.id)}
                                                    >
                                                        <Trash2 size={14} /> Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <button className="notif-more-btn">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="notif-empty">
                                <div className="notif-empty-icon">
                                    <Bell size={48} opacity={0.2} />
                                </div>
                                <h3>
                                    {filter === 'trash' ? 'Trash is empty' : filter === 'archive' ? 'Archive is empty' : 'No notifications found'}
                                </h3>
                                <p className="muted">
                                    {filter === 'trash' 
                                        ? 'Items you delete will appear here for a limited time.' 
                                        : filter === 'archive'
                                        ? 'Archived items are kept safe for your records.'
                                        : "You're all caught up! New notifications will appear here."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Notification Detail Slide-over */}
            {selectedNotif && (
                <div className="notif-slide-overlay" onClick={() => setSelectedNotif(null)}>
                    <div className="notif-slide-container" onClick={e => e.stopPropagation()}>
                        
                        {/* ─── SLIDE 1: DETAILS ─── */}
                        {notifSubStep === 'details' && (
                            <>
                                <div className="notif-slide-header">
                                    <button className="notif-slide-close" onClick={() => setSelectedNotif(null)}>
                                        <Clock size={20} /> Close
                                    </button>
                                    <span className="notif-category">{selectedNotif.type.toUpperCase()}</span>
                                </div>
                                
                                <div className="notif-slide-content">
                                    <div className="notif-slide-icon-large">
                                        {selectedNotif.icon}
                                    </div>
                                    <h2 className="notif-slide-title">{selectedNotif.title}</h2>
                                    <p className="notif-slide-time">{selectedNotif.time} · May 27, 2024</p>
                                    
                                    <div className="notif-slide-body">
                                        <p>{selectedNotif.description}</p>
                                        <p>Additional information about this notification: This action-oriented update requires your attention to maintain your status and ensure a smooth experience on LuxeStay.</p>
                                    </div>

                                    <div className="notif-slide-actions-footer">
                                        <button className="btn btn-dark w-100 mb-1rem" onClick={() => setNotifSubStep('action')}>
                                            Take Action
                                        </button>
                                        <button className="btn btn-outline w-100" onClick={() => setNotifSubStep('archive')}>
                                            Archive Notification
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ─── SLIDE 2: TAKE ACTION ─── */}
                        {notifSubStep === 'action' && (
                            <>
                                <div className="notif-slide-header">
                                    <button className="notif-slide-close" onClick={() => setNotifSubStep('details')}>
                                        <Clock size={20} /> Back
                                    </button>
                                    <span className="notif-category">ACTION REQUIRED</span>
                                </div>
                                <div className="notif-slide-content">
                                    <h3 className="substep-title">How would you like to proceed?</h3>
                                    
                                    {selectedNotif.type === 'message' ? (
                                        <div className="action-form">
                                            <label className="bm-label">Quick Reply</label>
                                            <textarea 
                                                className="bm-input" 
                                                placeholder="Type your message..." 
                                                rows={4}
                                                value={replyText}
                                                onChange={e => setReplyText(e.target.value)}
                                                style={{ resize: 'none', marginBottom: '1rem' }}
                                            />
                                            <button className="btn btn-dark w-100" onClick={() => setSelectedNotif(null)}>
                                                Send Message
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="action-options">
                                            <button className="action-option-card" onClick={() => setSelectedNotif(null)}>
                                                <CheckCircle2 size={20} className="text-green" />
                                                <div>
                                                    <strong>Confirm & Complete</strong>
                                                    <p>Mark this task as finished</p>
                                                </div>
                                            </button>
                                            <button className="action-option-card" onClick={() => setSelectedNotif(null)}>
                                                <Calendar size={20} />
                                                <div>
                                                    <strong>Schedule for later</strong>
                                                    <p>Set a reminder for tomorrow</p>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* ─── SLIDE 3: ARCHIVE ─── */}
                        {notifSubStep === 'archive' && (
                            <>
                                <div className="notif-slide-header">
                                    <button className="notif-slide-close" onClick={() => setNotifSubStep('details')}>
                                        <Clock size={20} /> Back
                                    </button>
                                    <span className="notif-category">CONFIRMATION</span>
                                </div>
                                <div className="notif-slide-content text-center">
                                    <div className="archive-icon-wrap">
                                        <Trash2 size={48} color="#ef4444" />
                                    </div>
                                    <h3 className="substep-title">Archive this notification?</h3>
                                    <p className="muted mb-2rem">It will be removed from your active list. You can still find it in your activity logs if needed.</p>
                                    
                                    <div className="flex-column gap-1rem">
                                        <button className="btn btn-dark w-100" style={{ background: '#ef4444', borderColor: '#ef4444' }} onClick={confirmArchive}>
                                            Yes, Archive it
                                        </button>
                                        <button className="btn btn-outline w-100" onClick={() => setNotifSubStep('details')}>
                                            No, keep it
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}
        </main>
    );
};

export default NotificationsView;
