/**
 * Shared Gallery Data
 * Single source of truth for both Gallery and Virtual Tour components
 * Update images here and both components will sync automatically
 */

export interface GalleryItem {
    id: number;
    url: string;
    title: string;
    category: string;
    description?: string;
    showInVirtualTour?: boolean; // Flag to include in Virtual Tour
}

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: 1,
        url: "/images/gallery/grand-reception.jpg",
        title: "Grand Lobby",
        category: "Welcome",
        description: "Our luxurious welcome area featuring elegant marble floors and ambient lighting.",
        showInVirtualTour: true
    },
    {
        id: 2,
        url: "/images/gallery/relaxation-lounge.jpg",
        title: "Executive Lounge",
        category: "Relaxation",
        description: "Exclusive waiting area with leather seating, complimentary refreshments, and privacy partitions.",
        showInVirtualTour: true
    },
    {
        id: 3,
        url: "/images/gallery/vip-suite-bedroom.jpg",
        title: "VIP Royal Suite",
        category: "Accommodation",
        description: "Our flagship treatment room featuring premium marble finishes, ambient lighting, and state-of-the-art massage facilities.",
        showInVirtualTour: true
    },
    {
        id: 4,
        url: "/images/gallery/luxury-bathroom.jpg",
        title: "Private Spa & Jacuzzi",
        category: "Wellness",
        description: "Authentic wood-paneled spa with chromotherapy lighting and temperature control for deep relaxation.",
        showInVirtualTour: true
    },
    {
        id: 5,
        url: "/images/gallery/comfort-zone.jpg",
        title: "Premium Therapy Room",
        category: "Treatment",
        description: "Professional treatment room designed for maximum comfort and privacy.",
        showInVirtualTour: true
    },
];

// Virtual Tour uses the same items filtered by showInVirtualTour flag
export function getVirtualTourSpots() {
    return GALLERY_ITEMS
        .filter(item => item.showInVirtualTour)
        .map(item => ({
            id: item.id.toString(),
            title: item.title,
            description: item.description || `Explore our ${item.title}`,
            image: item.url
        }));
}

// Export for Gallery component
export function getGalleryItems() {
    return GALLERY_ITEMS;
}
