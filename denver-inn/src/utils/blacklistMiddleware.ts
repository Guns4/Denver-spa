import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Phase 57: Silent Blacklist Middleware
 * Checks if a phone number is blacklisted and returns generic "fully booked" message
 */

export interface BlacklistCheck {
    isBlacklisted: boolean;
    reason?: string;
    isPermanent?: boolean;
}

export async function checkBlacklist(phone: string): Promise<BlacklistCheck> {
    if (!phone) {
        return { isBlacklisted: false };
    }

    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                },
            }
        );

        const { data, error } = await supabase
            .from('guest_blacklist')
            .select('*')
            .eq('phone', phone)
            .single();

        if (error || !data) {
            return { isBlacklisted: false };
        }

        // Check if blacklist is active
        const now = new Date();
        const expiresAt = data.expires_at ? new Date(data.expires_at) : null;

        const isActive = data.is_permanent || (expiresAt && expiresAt > now);

        if (isActive) {
            return {
                isBlacklisted: true,
                reason: data.reason,
                isPermanent: data.is_permanent
            };
        }

        return { isBlacklisted: false };
    } catch (error) {
        console.error('Blacklist check error:', error);
        // Fail open - allow booking if check fails
        return { isBlacklisted: false };
    }
}

/**
 * Get a generic "fully booked" response to hide blacklist status
 */
export function getGenericFullyBookedResponse() {
    return {
        success: false,
        message: 'We apologize, but we are currently fully booked for the selected date and time. Please try a different date or contact us directly.',
        availableSlots: [], // Always return empty
        isAvailable: false
    };
}

/**
 * Middleware function to protect booking endpoints
 */
export async function silentBlacklistCheck(phone: string): Promise<{
    allowed: boolean;
    response?: any;
}> {
    const blacklistStatus = await checkBlacklist(phone);

    if (blacklistStatus.isBlacklisted) {
        return {
            allowed: false,
            response: getGenericFullyBookedResponse()
        };
    }

    return { allowed: true };
}
