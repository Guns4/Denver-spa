import { z } from "zod";

export const BookingSchema = z.object({
    serviceId: z.number().min(1, "Please select a service"),
    date: z.date().min(new Date(), "Booking date cannot be in the past"),
    time: z.string().min(1, "Please select a time"),
    user: z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        phone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,11}$/, "Invalid Indonesian phone number"),
        notes: z.string().optional()
    })
});

export type BookingData = z.infer<typeof BookingSchema>;
