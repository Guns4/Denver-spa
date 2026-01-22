import { startOfDay, getDay, getHours } from "date-fns";

// In a real app, these would come from the 'promotions' table in Supabase.
// For the Client-Side prototype (Phase 38), we mock the active rules here to ensure instant feedback.
export const PROMOTIONS = [
    {
        name: "Weekday Morning Bliss",
        code: "HAPPYHOUR",
        discountPercentage: 20,
        validDays: [1, 2, 3, 4], // Mon(1) - Thu(4)
        startHour: 10,
        endHour: 14, // Until 14:00
    }
];

export interface PriceDetails {
    originalPrice: number;
    finalPrice: number;
    discountAmount: number;
    appliedPromotion?: string;
    isDiscounted: boolean;
}

/**
 * Calculates the dynamic price for a service based on the selected date and time.
 * @param basePrice The original price of the service (e.g., 350000)
 * @param date The selected date (Date object)
 * @param timeString The selected time (e.g., "11:30")
 */
export function calculateDynamicPrice(basePrice: number, date: Date, timeString: string): PriceDetails {
    if (!date || !timeString) {
        return { originalPrice: basePrice, finalPrice: basePrice, discountAmount: 0, isDiscounted: false };
    }

    const dayOfWeek = getDay(date); // 0=Sun, 1=Mon...
    const hour = parseInt(timeString.split(':')[0], 10);

    // Find applicable promotion
    // Logic: First match wins (Priority system could be added later)
    const promo = PROMOTIONS.find(p =>
        p.validDays.includes(dayOfWeek) &&
        hour >= p.startHour &&
        hour < p.endHour
    );

    if (promo) {
        const discountAmount = Math.round((basePrice * promo.discountPercentage) / 100);
        const finalPrice = basePrice - discountAmount;
        return {
            originalPrice: basePrice,
            finalPrice: finalPrice,
            discountAmount,
            appliedPromotion: promo.name,
            isDiscounted: true
        };
    }

    return {
        originalPrice: basePrice,
        finalPrice: basePrice,
        discountAmount: 0,
        isDiscounted: false
    };
}
