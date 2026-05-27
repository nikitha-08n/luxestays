import React, { useState } from 'react';
import { Grid, CheckCircle2, MapPin, ChevronRight, Wifi, ChefHat, Car, Waves, Snowflake, ConciergeBell, Star, ChevronDown, Heart } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import BookingModal from './BookingModal';
import PropertyDescriptionSlide from './PropertyDescriptionSlide';
import PhotoGallerySlide from './PhotoGallerySlide';
import ReviewsSlide from './ReviewsSlide';
import { formatPrice } from '../data/mockData';
import RentNegotiationSimulator from './RentNegotiationSimulator';
import LifeFitScore from './LifeFitScore';
import LandlordReportCard from './LandlordReportCard';
import NightWalkSafety from './NightWalkSafety';
import AreaComparisonRadar from './AreaComparisonRadar';
import { useWishlist } from '../context/WishlistContext';
import { fireWishlistToast } from './WishlistToast';

const DetailsView = ({ property, navigateTo, onContactHost }) => {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [showNegotiator, setShowNegotiator] = useState(false);
    const [showLifeFit, setShowLifeFit] = useState(false);
    const [showRadar, setShowRadar] = useState(false);
    const { isWishlisted, toggleWishlist } = useWishlist();
    const [wlPulse, setWlPulse] = useState(false);

    const handleWishlistToggle = () => {
        const willSave = !isWishlisted(property.id);
        toggleWishlist(property);
        setWlPulse(true);
        setTimeout(() => setWlPulse(false), 400);
        fireWishlistToast(
            willSave ? `"${property.title}" saved to wishlist!` : `Removed from wishlist`,
            willSave
        );
    };

    if (!property) return <div className="view active">Property not found.</div>;

    // Derived NoBroker-style data
    const badgeText = property.rating > 4.5 ? '🏆 POSH SOCIETY' : '💸 NEGOTIABLE RENT';
    const badgeClass = property.rating > 4.5 ? 'badge-posh' : 'badge-negotiable';
    const furnishStatus = property.amenities && property.amenities.includes('AC') ? 'Fully Furnished' : 'Semi Furnished';
    const tenantType = property.category && property.category.includes('PG') ? 'Bachelor' : 'Family/Company';
    const sqft = 600 + ((property.id * 53) % 900); // stable random based on ID

    return (
        <>
            <main className="view active">
                {/* Image Gallery */}
                <div className="details-gallery-premium" onClick={() => setShowGallery(true)}>
                    <div className="gallery-main">
                        <img src={property.gallery[0]?.url} alt="Exterior" />
                    </div>
                    <div className="gallery-side-grid">
                        <div className="side-item"><img src={property.gallery[1]?.url} alt="Living" /></div>
                        <div className="side-item"><img src={property.gallery[2]?.url} alt="Bedroom" /></div>
                        <div className="side-item"><img src={property.gallery[3]?.url} alt="Kitchen" /></div>
                        <div className="side-item relative">
                            <img src={property.gallery[4]?.url} alt="Bathroom" />
                            <button className="view-all-btn-premium" onClick={(e) => { e.stopPropagation(); setShowGallery(true); }}>
                                <Grid size={18} /> {property.gallery.length} Photos
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details Layout */}
                <div className="details-layout">
                    <div className="main-details">
                        <div className="property-badges" style={{ marginBottom: '1rem' }}>
                            <span className={`badge ${badgeClass}`} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>{badgeText}</span>
                            <span className="badge badge-green"><CheckCircle2 size={14} /> Verified Owner</span>
                        </div>
                        <h1 className="property-title">{property.title}</h1>
                        <div className="property-location-text" style={{ marginBottom: '1.5rem' }}>
                            <MapPin size={18} /> {property.location}
                        </div>

                        <div className="details-specs" style={{ border: '1px solid #f0f0f0', borderRadius: '12px', padding: '1.5rem', background: '#f8fafc', display: 'flex', gap: '3rem', marginBottom: '2rem' }}>
                            <div className="spec-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <LucideIcons.Armchair size={28} color="#475569" />
                                <span style={{ fontWeight: '600', color: '#334155' }}>{furnishStatus}</span>
                            </div>
                            <div className="spec-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <LucideIcons.Maximize size={28} color="#475569" />
                                <span style={{ fontWeight: '600', color: '#334155' }}>{sqft} sqft</span>
                            </div>
                            <div className="spec-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <LucideIcons.Users size={28} color="#475569" />
                                <span style={{ fontWeight: '600', color: '#334155' }}>{tenantType}</span>
                            </div>
                        </div>

                        <div className="nearby-section" style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <LucideIcons.Crosshair size={18} /> Nearby:
                            </span>
                            <div className="nb-nearby-pill"><LucideIcons.Bus size={14} color="#f97316" /> Bus Stand (0.4 km)</div>
                            <div className="nb-nearby-pill"><LucideIcons.PlusSquare size={14} color="#ef4444" /> Hospital (1.2 km)</div>
                        </div>

                        <div className="divider"></div>

                        <div className="section-block">
                            <h3>About this property</h3>
                            <p className="description-text">Experience a curated stay in this beautiful {property.category} located in {property.location}. This {property.sharing} space has been thoughtfully designed for the modern dweller, offering a blend of comfort and convenience. Whether you are a student, a working professional, or looking for a family home, this space provides everything you need for a quality living experience.</p>
                            <div className="flex-start gap-1rem">
                                <a href="#" className="read-more" onClick={e => { e.preventDefault(); setShowFullDesc(true); }}>Read more <ChevronRight size={16} /></a>
                                <a href="#" className="read-more text-green" onClick={e => { e.preventDefault(); onContactHost(); }}>Contact Host <ChevronRight size={16} /></a>
                            </div>
                        </div>

                        <div className="section-block">
                            <h3>What this place offers</h3>
                            <div className="amenities-grid">
                                {property.features.map((feat, idx) => {
                                    const Icon = LucideIcons[feat.icon] || LucideIcons.HelpCircle;
                                    return (
                                        <div key={idx} className="amenity-item">
                                            <Icon size={20} /> {feat.text}
                                        </div>
                                    );
                                })}
                            </div>
                            <button className="btn btn-outline mt-1rem">Show all amenities</button>
                        </div>

                        <div className="section-block">
                            <div className="flex-between">
                                <h3>Location</h3>
                                <a href="#" className="link-text" onClick={e => e.preventDefault()}>Get directions</a>
                            </div>
                            <div className="location-text-sub">{property.location}</div>
                            <div className="map-container placeholder-map">
                                <div className="map-bg"></div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="section-block">
                            <h3><Star size={20} className="star-icon" /> {property.rating.toFixed(1)} · {property.reviews} reviews</h3>
                            <div className="reviews-grid">
                                {property.reviewsList.map(rev => (
                                    <div key={rev.id} className="review-card">
                                        <div className="reviewer-header">
                                            <div className="reviewer-avatar">{rev.userName.charAt(0)}</div>
                                            <div className="reviewer-info">
                                                <h4>{rev.userName}</h4>
                                                <span>{rev.date} · Verified Stay</span>
                                            </div>
                                        </div>
                                        <div className="review-stars">
                                            {Array(Math.floor(rev.rating)).fill('★').join('')}
                                            {rev.rating % 1 >= 0.5 ? '½' : ''}
                                        </div>
                                        <p>"{rev.comment}"</p>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-outline mt-1rem" onClick={() => setShowAllReviews(true)}>
                                Show all {property.reviews} reviews
                            </button>
                        </div>
                    </div>

                    <div className="sidebar-details">
                        <div className="booking-card">
                            <div className="booking-header" style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div className="price" style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>{formatPrice(property.price)}</div>
                                <div className="maintenance-info" style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>+ 🔧 Maintenance Included</div>
                            </div>

                            <button
                                className="btn w-100"
                                onClick={onContactHost}
                                style={{ background: '#f43f5e', color: 'white', padding: '1rem', fontSize: '1.1rem', fontWeight: '600', borderRadius: '8px' }}
                            >
                                Contact Owner
                            </button>

                            {/* Wishlist Button */}
                            <button
                                onClick={handleWishlistToggle}
                                className={`details-wishlist-btn${isWishlisted(property.id) ? ' wishlisted' : ''}${wlPulse ? ' pulse' : ''}`}
                            >
                                <Heart
                                    size={18}
                                    strokeWidth={1.5}
                                    fill={isWishlisted(property.id) ? '#ef4444' : 'none'}
                                    color={isWishlisted(property.id) ? '#ef4444' : 'currentColor'}
                                />
                                {isWishlisted(property.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}
                            </button>
                            <button
                                className="btn w-100"
                                style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #dcfce7', marginTop: '1rem', padding: '0.75rem', fontWeight: '600', borderRadius: '8px' }}
                            >
                                <LucideIcons.FileText size={18} style={{ marginRight: '0.5rem' }} /> Add short notes
                            </button>

                            <div className="price-breakdown">
                                <div className="price-line">
                                    <span>Rent per month</span>
                                    <span>{formatPrice(property.price)}</span>
                                </div>
                                <div className="price-line">
                                    <span>One-time security deposit</span>
                                    <span>{formatPrice(property.price * 2)}</span>
                                </div>
                                <div className="price-line">
                                    <span>LuxeStay service fee</span>
                                    <span>₹500</span>
                                </div>
                                <div className="divider"></div>
                                <div className="price-line total">
                                    <span>Total initial payment</span>
                                    <span>{formatPrice(property.price * 3 + 500)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* UNIQUE FEATURE: Night Walk Safety Timeline */}
                <div className="section-block" style={{ maxWidth: 900, margin: '0 auto' }}>
                    <NightWalkSafety />
                </div>

                {/* UNIQUE FEATURE: Landlord Report Card */}
                <div className="section-block" style={{ maxWidth: 900, margin: '0 auto' }}>
                    <LandlordReportCard />
                </div>

                {/* UNIQUE FEATURES: Renter's Toolkit */}
                <div className="section-block" style={{ maxWidth: 900, margin: '0 auto' }}>
                    <h3>🛠️ Renter's Toolkit — Unique to LuxeStay</h3>
                    <div className="renter-toolkit-grid">
                        <div className="toolkit-card" onClick={() => setShowNegotiator(true)}>
                            <div className="toolkit-icon">🔮</div>
                            <div>
                                <div className="toolkit-title">Rent Negotiation Simulator</div>
                                <div className="toolkit-desc">Practice negotiating rent like a pro. Learn strategies that can save you thousands.</div>
                            </div>
                        </div>
                        <div className="toolkit-card" onClick={() => setShowLifeFit(true)}>
                            <div className="toolkit-icon">🎯</div>
                            <div>
                                <div className="toolkit-title">Life Fit Score</div>
                                <div className="toolkit-desc">Enter your daily destinations and see how well this property fits your lifestyle.</div>
                            </div>
                        </div>
                        <div className="toolkit-card" onClick={() => setShowRadar(true)}>
                            <div className="toolkit-icon">🎡</div>
                            <div>
                                <div className="toolkit-title">Area Personality Radar</div>
                                <div className="toolkit-desc">See the real vibe of the neighborhood through 12,000+ data points.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {showBookingModal && (
                <BookingModal
                    onClose={() => setShowBookingModal(false)}
                    navigateTo={navigateTo}
                />
            )}

            {showFullDesc && (
                <PropertyDescriptionSlide onClose={() => setShowFullDesc(false)} />
            )}

            {showGallery && (
                <PhotoGallerySlide property={property} onClose={() => setShowGallery(false)} />
            )}
            {showAllReviews && (
                <ReviewsSlide property={property} onClose={() => setShowAllReviews(false)} />
            )}
            {showNegotiator && <RentNegotiationSimulator property={property} onClose={() => setShowNegotiator(false)} />}
            {showLifeFit && <LifeFitScore property={property} onClose={() => setShowLifeFit(false)} />}
            {showRadar && <AreaComparisonRadar property={property} onClose={() => setShowRadar(false)} />}
        </>
    );
};

export default DetailsView;
