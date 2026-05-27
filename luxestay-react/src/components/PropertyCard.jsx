import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { fireWishlistToast } from './WishlistToast';

const PropertyCard = ({ property, onClick, matchScore }) => {
    const mainImg = property.gallery && property.gallery.length > 0 ? property.gallery[0].url : property.image;
    const { isWishlisted, toggleWishlist } = useWishlist();
    const wishlisted = isWishlisted(property.id);
    const [pulse, setPulse] = useState(false);

    const handleHeart = (e) => {
        e.stopPropagation();
        const willSave = !wishlisted;
        toggleWishlist(property);
        setPulse(true);
        setTimeout(() => setPulse(false), 400);
        fireWishlistToast(
            willSave ? `"${property.title}" saved!` : `Removed from wishlist`,
            willSave
        );
    };

    return (
        <div className="simple-property-card" onClick={onClick}>
            <div className="simple-card-img">
                <img src={mainImg} alt={property.title} />
                <button
                    className={`simple-card-heart wishlist-heart-btn${wishlisted ? ' wishlisted' : ''}${pulse ? ' pulse' : ''}`}
                    onClick={handleHeart}
                    title={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    aria-label={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                >
                    <LucideIcons.Heart
                        size={18}
                        strokeWidth={1.5}
                        fill={wishlisted ? '#ef4444' : 'none'}
                        color={wishlisted ? '#ef4444' : 'white'}
                    />
                </button>
                <div className="simple-card-price">
                    ₹ {property.price.toLocaleString('en-IN')}
                </div>
                {matchScore && (
                    <div className="lifestyle-match-badge">
                        <LucideIcons.Sparkles size={12} fill="white" />
                        <span>{matchScore}% Match</span>
                    </div>
                )}
            </div>

            <div className="simple-card-content">
                <h3 className="simple-card-title">{property.title}</h3>
                <div className="simple-card-location">
                    <LucideIcons.MapPin size={14} /> {property.location}
                </div>
                <div className="simple-card-meta">
                    <span><LucideIcons.Armchair size={14} /> {property.amenities && property.amenities.includes('AC') ? 'Furnished' : 'Semi'}</span>
                    <span><LucideIcons.Users size={14} /> {property.category && property.category.includes('PG') ? 'Shared' : 'Private'}</span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
