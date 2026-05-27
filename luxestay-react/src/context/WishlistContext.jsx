import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const stored = localStorage.getItem('luxe_wishlist');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const isWishlisted = useCallback(
        (id) => wishlist.some((p) => p.id === id),
        [wishlist]
    );

    const toggleWishlist = useCallback((property) => {
        setWishlist((prev) => {
            const exists = prev.some((p) => p.id === property.id);
            if (exists) {
                return prev.filter((p) => p.id !== property.id);
            }
            return [...prev, { ...property, savedAt: new Date().toISOString() }];
        });
    }, []);

    const removeFromWishlist = useCallback((id) => {
        setWishlist((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const clearWishlist = useCallback(() => setWishlist([]), []);

    return (
        <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
    return ctx;
};
