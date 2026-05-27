import React, { useEffect, useState } from 'react';
import { Heart, Check } from 'lucide-react';

/**
 * WishlistToast - A small toast that pops up when a user saves/unsaves a property.
 * Usage: dispatch a custom DOM event  `wishlist-toast` with detail { message, saved }
 */
const WishlistToast = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [saved, setSaved] = useState(true);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            const { message: msg, saved: isSaved } = e.detail || {};
            setMessage(msg || (isSaved ? 'Saved to Wishlist' : 'Removed from Wishlist'));
            setSaved(!!isSaved);
            setVisible(true);
            if (timer) clearTimeout(timer);
            const t = setTimeout(() => setVisible(false), 2800);
            setTimer(t);
        };
        window.addEventListener('wishlist-toast', handler);
        return () => window.removeEventListener('wishlist-toast', handler);
    }, [timer]);

    return (
        <div className={`wl-toast${visible ? ' wl-toast-show' : ''}`}>
            <div className={`wl-toast-icon${saved ? ' saved' : ' unsaved'}`}>
                {saved ? <Heart size={16} strokeWidth={1.5} fill="white" color="white" /> : <Check size={16} strokeWidth={1.5} color="white" />}
            </div>
            <span>{message}</span>
        </div>
    );
};

/** Helper to fire a toast from anywhere */
export const fireWishlistToast = (message, saved) => {
    window.dispatchEvent(new CustomEvent('wishlist-toast', { detail: { message, saved } }));
};

export default WishlistToast;
