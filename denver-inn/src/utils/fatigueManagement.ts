/**
 * Phase 56: Fatigue Management Algorithm
 * Implements the "3-Slot Rule" to prevent therapist burnout
 */

export interface TherapistWorkload {
    therapistId: string;
    consecutiveHighEffort: number;
    lastBookingEnd: Date;
    needsBreak: boolean;
}

const HIGH_EFFORT_SERVICES = [
    'Deep Tissue',
    'Sport Massage',
    'Hot Stone',
    'Thai Massage'
];

/**
 * Check if a service is considered high-effort
 */
export function isHighEffortService(serviceName: string): boolean {
    return HIGH_EFFORT_SERVICES.some(service =>
        serviceName.toLowerCase().includes(service.toLowerCase())
    );
}

/**
 * Calculate therapist workload based on recent bookings
 * Returns whether therapist needs a mandatory break
 */
export function calculateTherapistWorkload(
    recentBookings: Array<{
        service_name: string;
        start_time: string;
        end_time: string;
        duration_minutes: number;
    }>
): TherapistWorkload {
    let consecutiveHighEffort = 0;
    let lastBookingEnd: Date | null = null;

    // Sort bookings by time (most recent first)
    const sortedBookings = [...recentBookings].sort(
        (a, b) => new Date(b.end_time).getTime() - new Date(a.end_time).getTime()
    );

    // Count consecutive high-effort sessions
    for (const booking of sortedBookings) {
        if (isHighEffortService(booking.service_name)) {
            consecutiveHighEffort++;
            if (!lastBookingEnd) {
                lastBookingEnd = new Date(booking.end_time);
            }
        } else {
            // Break the consecutive chain if non-high-effort service
            break;
        }
    }

    return {
        therapistId: '', // Set by caller
        consecutiveHighEffort,
        lastBookingEnd: lastBookingEnd || new Date(),
        needsBreak: consecutiveHighEffort >= 3 // 3-Slot Rule
    };
}

/**
 * Get forced break slots for a therapist
 * Returns array of time slots that must be blocked
 */
export function getForcedBreakSlots(
    lastBookingEnd: Date,
    breakDurationMinutes: number = 30
): { start: Date; end: Date } {
    const breakStart = new Date(lastBookingEnd);
    const breakEnd = new Date(breakStart.getTime() + breakDurationMinutes * 60 * 1000);

    return {
        start: breakStart,
        end: breakEnd
    };
}

/**
 * Filter available time slots, removing forced break periods
 */
export function filterAvailableSlotsWithBreaks(
    allSlots: string[],
    therapistWorkload: TherapistWorkload,
    slotDate: Date
): string[] {
    if (!therapistWorkload.needsBreak) {
        return allSlots;
    }

    const breakPeriod = getForcedBreakSlots(therapistWorkload.lastBookingEnd);

    return allSlots.filter(slot => {
        const [hours, minutes] = slot.split(':').map(Number);
        const slotTime = new Date(slotDate);
        slotTime.setHours(hours, minutes, 0, 0);

        // Check if slot falls within break period
        return !(slotTime >= breakPeriod.start && slotTime < breakPeriod.end);
    });
}

/**
 * Example usage in availability check
 */
export async function getTherapistAvailableSlots(
    therapistId: string,
    date: Date,
    recentBookings: any[]
): Promise<string[]> {
    const baseSlots = [
        "10:00", "11:30", "13:00", "14:30",
        "16:00", "17:30", "19:00", "20:30"
    ];

    // Calculate workload
    const workload = calculateTherapistWorkload(recentBookings);
    workload.therapistId = therapistId;

    // Filter out forced break slots
    const availableSlots = filterAvailableSlotsWithBreaks(baseSlots, workload, date);

    return availableSlots;
}
