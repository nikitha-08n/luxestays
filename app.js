// Mock Property Data
const properties = [
    {
        id: 1,
        title: "Skyline Penthouse",
        location: "Upper East Side, Manhattan",
        price: 12500,
        priceUnit: "PER MONTH",
        rating: 4.9,
        reviews: 84,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        tags: [{ text: "VERIFIED", type: "verified" }, { text: "PROFESSIONAL AREA", type: "dark" }],
        features: [
            { icon: "volume-x", text: "Quiet" },
            { icon: "shield-check", text: "9.8 Safety" },
            { icon: "train", text: "200m Transit" }
        ],
        featured: true
    },
    {
        id: 2,
        title: "The Greenwich Loft",
        location: "Greenwich Village, NY",
        price: 8200,
        priceUnit: "PER MONTH",
        rating: 4.7,
        reviews: 56,
        image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
        tags: [{ text: "FAMILY FRIENDLY", type: "dark" }],
        features: [
            { icon: "sparkles", text: "Spotless" },
            { icon: "shopping-bag", text: "150m Shops" },
            { icon: "shield", text: "9.2 Safety" }
        ],
        featured: true
    },
    {
        id: 3,
        title: "Chelsea Garden Suite",
        location: "Chelsea, Manhattan",
        price: 6500,
        priceUnit: "PER MONTH",
        rating: 4.8,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1613490908592-fd5e16f310f8?auto=format&fit=crop&w=800&q=80",
        tags: [{ text: "STUDENT HUB", type: "dark" }],
        features: [
            { icon: "cross", text: "800m Hospital" },
            { icon: "activity", text: "Vibrant" },
            { icon: "train", text: "100m Subway" }
        ],
        featured: true
    },
    {
        id: 4,
        title: "SoHo Art Loft",
        location: "SoHo District, NY",
        price: 9800,
        priceUnit: "PER MONTH",
        rating: 4.9,
        reviews: 42,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        tags: [{ text: "PROFESSIONAL AREA", type: "dark" }],
        features: [
            { icon: "shield", text: "9.5" },
            { icon: "volume-x", text: "Quiet" }
        ]
    },
    {
        id: 5,
        title: "Tribeca Terrace",
        location: "Tribeca, NY",
        price: 15000,
        priceUnit: "PER MONTH",
        rating: 5.0,
        reviews: 29,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
        tags: [{ text: "PROFESSIONAL AREA", type: "dark" }],
        features: [
            { icon: "train", text: "300m" },
            { icon: "shield", text: "9.9" }
        ]
    },
    {
        id: 6,
        title: "Gramercy Park Residence",
        location: "Gramercy, NY",
        price: 7400,
        priceUnit: "PER MONTH",
        rating: 4.6,
        reviews: 91,
        image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80",
        tags: [{ text: "FAMILY FRIENDLY", type: "dark" }],
        features: [
            { icon: "tree-pine", text: "Near Park" },
            { icon: "sparkles", text: "5/5 Clean" }
        ]
    }
];

// Formatting helper
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
};

// Render Property Cards
const renderProperties = (containerId, propertiesList) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    propertiesList.forEach(prop => {
        const tagsHTML = prop.tags.map(tag => 
            `<span class="card-tag ${tag.type}">${tag.text}</span>`
        ).join('');
        
        const featuresHTML = prop.features.map(feat => 
            `<div class="card-feature"><i data-lucide="${feat.icon}"></i> ${feat.text}</div>`
        ).join('');

        const cardHTML = `
            <div class="property-card" onclick="navigateTo('details-view')">
                <div class="card-img-wrapper">
                    <img src="${prop.image}" alt="${prop.title}">
                    <div class="card-tags">${tagsHTML}</div>
                    <div class="card-heart"><i data-lucide="heart"></i></div>
                </div>
                <div class="card-info">
                    <div class="card-title-row">
                        <div class="card-title">${prop.title}</div>
                        <div class="card-rating"><i data-lucide="star"></i> ${prop.rating.toFixed(1)}</div>
                    </div>
                    <div class="card-location">${prop.location}</div>
                    <div class="card-features">${featuresHTML}</div>
                    <div class="card-footer">
                        <div class="card-price">
                            <strong>${formatPrice(prop.price)}</strong>
                            <span>${prop.priceUnit}</span>
                        </div>
                        <button class="icon-btn"><i data-lucide="arrow-right"></i></button>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += cardHTML;
    });
    
    // Re-initialize icons for newly injected HTML
    lucide.createIcons();
};

// Navigation Logic
window.navigateTo = function(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show target view
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Update nav active states (simplified)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Quick active state hack based on view
    if(viewId === 'search-view') {
        document.querySelectorAll('.nav-link')[0].classList.add('active');
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Render Featured properties on Home page
    const featuredProps = properties.filter(p => p.featured);
    renderProperties('featured-properties-grid', featuredProps);
    
    // Render All properties on Search page
    renderProperties('search-properties-grid', properties);
});
