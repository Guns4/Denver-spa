import React from 'react';

export default function SchemaOrg() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "DaySpa",
        "name": "Denver Inn Executive Spa",
        "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
        "url": "https://denver-inn-spa.com", // Ganti dengan domain asli jika sudah ada
        "telephone": "+628123456789", // Ganti dengan nomor asli
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Komp. Banceuy Permai, Jl. ABC No.112, Braga",
            "addressLocality": "Kec. Sumur Bandung, Kota Bandung",
            "addressRegion": "Jawa Barat",
            "postalCode": "40111",
            "addressCountry": "ID"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -6.918456,
            "longitude": 107.608321
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "10:00",
                "closes": "22:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/denverinn_spa" // Contoh link socmed
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}
