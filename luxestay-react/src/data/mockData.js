const titles = [
    "Standard 1BHK Flat", "Basic PG Room", "Independent House", "Family Apartment", 
    "Affordable Room", "Student PG", "Cozy 2BHK", "Budget Friendly Room", 
    "Working Professional PG", "Shared Flat", "Simple 1BHK", "Basic 2BHK Apartment",
    "Affordable Shared Space", "Bachelor's Den", "Standard Room", "Family Independent House",
    "Budget Studio", "Basic Student Room", "Pocket-Friendly Pad", "Standard PG",
    "Basic Family Flat", "Near Campus Room", "Budget Family Flat", "Transit Hub Room",
    "Standard Residential House", "Quiet Suburban Room", "Market Side PG", "Basic Bachelor Pad"
];

const locations = [
    "Koramangala, Bangalore", "Indiranagar, Bangalore", "Powai, Mumbai", "HSR Layout, Bangalore",
    "Fort, Mumbai", "Salt Lake, Kolkata", "Viman Nagar, Pune", "Bandra, Mumbai",
    "GK II, New Delhi", "Cyber City, Gurgaon", "Whitefield, Bangalore", "Colaba, Mumbai",
    "Gachibowli, Hyderabad", "Sector 15, Chandigarh", "Aundh, Pune", "Anna Nagar, Chennai",
    "Malleshwaram, Bangalore", "Salt Lake, Kolkata", "Malviya Nagar, Jaipur", "Goregaon, Mumbai",
    "Banjara Hills, Hyderabad", "Jayanagar, Bangalore", "Park Street, Kolkata", "Sector 62, Noida"
];

const exteriorImages = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464146072230-91c27d410793?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1479839672679-a4648522e74a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505843513577-22bb7dc47298?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523217582562-09d4def252bf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80"
];

const livingAreaImages = [
    "https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556020685-e8d2e8b2b647?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=800&q=80"
];

const bedroomImages = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1536349788264-1b816bb111dc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=800&q=80"
];

const reviewers = ["Arjun Sharma", "Priya Patel", "Rahul Gupta", "Ananya Iyer", "Vikram Singh", "Sneha Rao", "Amit Kumar", "Neha Verma"];
const reviewTexts = [
    "Great place for students. Very near to campus and markets. The owner is also very helpful.",
    "Very clean and silent area. Perfect for working professionals. High speed wifi is a plus.",
    "Affordable and decent. The sharing arrangement is comfortable. Safe for girls.",
    "Decent room for the price. Well connected to metro and buses.",
    "Homely atmosphere. The kitchen is well maintained. Overall a good stay.",
    "Peaceful environment. I stayed here for 6 months and had zero issues. Security is good."
];

const atmospheres = ["Family Friendly", "Student Hub", "Quiet Residential", "Market Proximity"];
const propTypes = ["PG (Boys)", "PG (Girls)", "Individual House", "Family Flat", "Shared Apartment"];
const allAmenities = ["Wifi", "Pool", "Gym", "Parking", "AC"];

const generateProperties = (count) => {
    const props = [];
    for (let i = 1; i <= count; i++) {
        const type = propTypes[i % propTypes.length];
        const location = locations[i % locations.length];
        const atmosphere = atmospheres[i % atmospheres.length];
        const basePrice = Math.floor(Math.random() * (25000 - 5000 + 1)) + 5000;
        
        let titlePrefix = "";
        let sharingInfo = "";
        
        if (type.includes("PG")) {
            titlePrefix = type;
            sharingInfo = `${(i % 3) + 1} Sharing`;
        } else if (type === "Shared Apartment") {
            titlePrefix = `${(i % 3) + 4} Member sharing flat`;
            sharingInfo = "Group Stay";
        } else {
            titlePrefix = titles[i % titles.length];
            sharingInfo = type === "Individual House" ? "Full House" : "Family Home";
        }

        // Generate completely unique images for every single property
        // Curated high-quality Unsplash Real Estate IDs for variety and relevance
        const houseExteriors = [
            '1580533393712-ae9a2e787320', '1512917774080-9991f1c4c750', '1600585154340-be6161a56a0c', 
            '1600596542815-ffad4c1539a9', '1600585154508-3b1660c6d852', '1600600421685-6e525f77a064',
            '1518780664697-55e3ad937233', '1564013799919-ab600027ffc6', '1480074568708-e7b720bb3f09',
            '1570129477492-45c003edd2be', '1568605114967-8130f3a36994', '1572120360610-d971b9d7767c'
        ];
        const interiors = [
            '1522708323590-d24dbb6b0267', '1502672260266-1c1ef2d93688', '1484154218962-a197022b5858',
            '1556912172-4691c0176021', '1513694203232-719a280e022f', '1527359353448-472171b14662',
            '1505691723518-36a5ac3be353', '1493663284031-b743aef93503', '1586023492125-27b2c045efd7'
        ];
        const bedrooms = [
            '1505693314120-0d443867891c', '1540518614846-7eded433c457', '1505692952047-1a78307da8f2',
            '1522771739844-6a9f6d5f14af', '1536349788264-1b816bb111dc', '1560185007-c5ca9d2c014d'
        ];
        const kitchens = [
            '1556911220-bff31c812dba', '1588854337221-4cf9fa96059a', '1600585154542-637963741678',
            '1484154218962-a197022b5858', '1556912172-4691c0176021', '1556909114-f6e7ad7d3136'
        ];
        const bathrooms = [
            '1584622650075-996a1ef0c393', '1552321554-5fefe8c9ef14', '1600566753190-17f21fa04c4e',
            '1564078516393-cf04bd966897', '1507089947368-19c1da97753c', '1600566752355-3579af9bcecb'
        ];

        const extId = houseExteriors[i % houseExteriors.length];
        const livId = interiors[i % interiors.length];
        const bedId = bedrooms[i % bedrooms.length];
        const kitId = kitchens[i % kitchens.length];
        const batId = bathrooms[i % bathrooms.length];

        const extUrl = `https://images.unsplash.com/photo-${extId}?auto=format&fit=crop&w=800&q=80&sig=${i}`;
        const livUrl = `https://images.unsplash.com/photo-${livId}?auto=format&fit=crop&w=800&q=80&sig=${i}`;
        const bedUrl = `https://images.unsplash.com/photo-${bedId}?auto=format&fit=crop&w=800&q=80&sig=${i}`;
        const kitUrl = `https://images.unsplash.com/photo-${kitId}?auto=format&fit=crop&w=800&q=80&sig=${i}`;
        const batUrl = `https://images.unsplash.com/photo-${batId}?auto=format&fit=crop&w=800&q=80&sig=${i}`;

        const gallery = [
            { url: extUrl, label: "Exterior" },
            { url: livUrl, label: "Living Room" },
            { url: bedUrl, label: "Bedroom" },
            { url: kitUrl, label: "Kitchen" },
            { url: batUrl, label: "Bathroom" }
        ];

        const reviewsCount = 3 + (i % 3);
        const propertyReviews = [];
        for (let j = 0; j < reviewsCount; j++) {
            propertyReviews.push({
                id: j,
                userName: reviewers[(i + j) % reviewers.length],
                date: "March 2024",
                rating: 4 + Math.random(),
                comment: reviewTexts[(i + j) % reviewTexts.length]
            });
        }

        // Generously and realistically assign amenities across all 1200 houses
        // Wifi: 95% of homes, AC: 70%, Parking: 55%, Gym: 35%, Pool: 25%
        const propertyAmenities = [];
        if (i % 20 !== 0)              propertyAmenities.push('Wifi');     // ~95%
        if (i % 10 < 7)                propertyAmenities.push('AC');       // ~70%
        if ((i + 2) % 10 < 6)          propertyAmenities.push('Parking');  // ~55% (offset so it doesn't align with AC)
        if ((i + 5) % 10 < 4)          propertyAmenities.push('Gym');      // ~35%
        if ((i + 3) % 4 === 0)         propertyAmenities.push('Pool');     // ~25%

        // Logic for duration and tenant matching
        const durationOptions = ['1 Month', '3 Months', '6 Months', '1 Year', '2 Years'];
        const propertyDuration = durationOptions.slice(i % 5); // Some support only long term, some all
        
        let targetTenant = "Students & Professionals";
        if (type === "Family Flat" || atmosphere === "Family Friendly") targetTenant = "Family Only";
        if (type === "PG (Boys)") targetTenant = "Bachelor (Boys)";
        if (type === "PG (Girls)") targetTenant = "Bachelor (Girls)";
        if (type === "Individual House" && i % 4 === 0) targetTenant = "Company Lease";

        props.push({
            id: i,
            title: `${titlePrefix} in ${location.split(',')[0]}`,
            location: location,
            price: basePrice,
            priceUnit: "PER MONTH",
            rating: (4 + Math.random()),
            reviews: propertyReviews.length * (Math.floor(Math.random() * 50) + 1),
            reviewsList: propertyReviews,
            image: extUrl,
            gallery: gallery,
            amenities: propertyAmenities,
            tags: [
                { text: type.toUpperCase(), type: "verified" },
                { text: sharingInfo.toUpperCase(), type: "dark" }
            ],
            features: [
                { icon: "Wifi", text: "Wifi" },
                { icon: "Shield", text: "Secure" },
                { icon: "User", text: sharingInfo }
            ],
            featured: i <= 20,
            atmosphere: atmosphere,
            category: type,
            sharing: sharingInfo,
            allowedDuration: propertyDuration,
            targetTenant: targetTenant
        });
    }
    return props;
};

export const properties = generateProperties(1200);

export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};
