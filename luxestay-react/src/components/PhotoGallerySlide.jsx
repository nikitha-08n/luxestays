import React, { useState } from 'react';
import { X, Share2, Heart, ChevronLeft, LayoutGrid, Camera } from 'lucide-react';

const PROPERTY_PHOTOS = [
    { id: 1, url: 'https://images.unsplash.com/photo-1580533393712-ae9a2e787320?auto=format&fit=crop&w=800&q=80', category: 'Exterior' },
    { id: 2, url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', category: 'Living Room' },
    { id: 3, url: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80', category: 'Bedroom' },
    { id: 4, url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80', category: 'Kitchen' },
    { id: 5, url: 'https://images.unsplash.com/photo-1584622650075-996a1ef0c393?auto=format&fit=crop&w=800&q=80', category: 'Bathroom' },
];

const PhotoGallerySlide = ({ property, onClose }) => {
    const [filter, setFilter] = useState('All');
    
    // Use property gallery if available, otherwise fallback to hardcoded
    const photos = (property?.gallery && property.gallery.length > 0)
        ? property.gallery.map((p, i) => ({ id: i, url: p.url, category: p.label }))
        : PROPERTY_PHOTOS;

    const categories = ['All', ...new Set(photos.map(p => p.category))];
    
    const filteredPhotos = filter === 'All' 
        ? photos 
        : photos.filter(p => p.category === filter);

    return (
        <div className="gallery-overlay">
            <div className="gallery-header">
                <button className="gallery-back-btn" onClick={onClose}>
                    <ChevronLeft size={24} /> <span>Back to details</span>
                </button>
                <div className="gallery-actions">
                    <button className="gallery-action-btn"><Share2 size={20} /></button>
                    <button className="gallery-action-btn"><Heart size={20} /></button>
                </div>
            </div>

            <div className="gallery-scroll-container">
                <div className="gallery-content">
                    <div className="gallery-intro">
                        <h1>All Photos</h1>
                        <p className="muted">{photos.length} stunning views of this {property?.category || 'property'}</p>
                    </div>

                    <div className="gallery-filters">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                className={`gallery-filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="gallery-grid">
                        {filteredPhotos.map((photo, index) => (
                            <div 
                                key={photo.id} 
                                className={`gallery-item ${index % 5 === 0 ? 'large' : ''}`}
                            >
                                <img src={photo.url} alt={photo.category} loading="lazy" />
                                <div className="gallery-item-tag">{photo.category}</div>
                            </div>
                        ))}
                    </div>

                    <div className="gallery-footer">
                        <Camera size={32} opacity={0.3} />
                        <p>You've reached the end of the gallery</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoGallerySlide;
