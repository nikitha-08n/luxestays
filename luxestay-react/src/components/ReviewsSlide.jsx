import React from 'react';
import { X, Star, ChevronLeft, Search } from 'lucide-react';

const ReviewsSlide = ({ property, onClose }) => {
    return (
        <div className="gallery-overlay">
            <div className="gallery-header">
                <button className="gallery-back-btn" onClick={onClose}>
                    <ChevronLeft size={24} /> <span>Back to details</span>
                </button>
            </div>

            <div className="gallery-scroll-container">
                <div className="gallery-content">
                    <div className="reviews-full-header">
                        <div className="reviews-stats-big">
                            <Star size={48} className="star-icon-gold" />
                            <div className="stats-text">
                                <h1>{property.rating.toFixed(1)}</h1>
                                <p>{property.reviews} total reviews from guests</p>
                            </div>
                        </div>
                    </div>

                    <div className="reviews-search-box">
                        <Search size={20} />
                        <input type="text" placeholder="Search reviews..." disabled />
                    </div>

                    <div className="reviews-full-list">
                        {property.reviewsList.map(rev => (
                            <div key={rev.id} className="review-item-full">
                                <div className="reviewer-header">
                                    <div className="reviewer-avatar">{rev.userName.charAt(0)}</div>
                                    <div className="reviewer-info">
                                        <h4>{rev.userName}</h4>
                                        <span>{rev.date} · Verified Stay</span>
                                    </div>
                                </div>
                                <div className="review-stars-gold">
                                    {Array(Math.floor(rev.rating)).fill('★').join('')}
                                    {rev.rating % 1 >= 0.5 ? '½' : ''}
                                </div>
                                <p className="review-comment">"{rev.comment}"</p>
                                <div className="review-footer-actions">
                                    <button className="helpful-btn">Helpful?</button>
                                </div>
                            </div>
                        ))}
                        
                        {/* Generate more fake reviews if needed to fill the list */}
                        {[...Array(10)].map((_, i) => (
                            <div key={`extra-${i}`} className="review-item-full">
                                <div className="reviewer-header">
                                    <div className="reviewer-avatar">U</div>
                                    <div className="reviewer-info">
                                        <h4>User {i + 1}</h4>
                                        <span>March 2024 · Verified Stay</span>
                                    </div>
                                </div>
                                <div className="review-stars-gold">★★★★★</div>
                                <p className="review-comment">"Excellent stay, highly recommended for the price and location!"</p>
                                <div className="review-footer-actions">
                                    <button className="helpful-btn">Helpful?</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsSlide;
