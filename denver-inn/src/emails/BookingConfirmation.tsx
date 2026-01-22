import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
} from "@react-email/components";
import * as React from "react";

interface BookingConfirmationProps {
    customerName: string;
    serviceName: string;
    date: string;
    time: string;
    bookingRef: string;
}

export const BookingConfirmation = ({
    customerName = "Gentleman",
    serviceName = "Executive Massage",
    date = "October 24, 2026",
    time = "19:00",
    bookingRef = "DEN-123456",
}: BookingConfirmationProps) => {
    return (
        <Html>
            <Head />
            <Preview>Your Denver Inn Spa Reservation is Confirmed</Preview>
            <Tailwind>
                <Body className="bg-black text-white font-sans">
                    <Container className="mx-auto p-4 max-w-md">
                        <Section className="mt-8 text-center">
                            <Img
                                src="https://denver-inn.com/logo.png"
                                width="80"
                                height="80"
                                alt="Denver Inn Logo"
                                className="mx-auto mb-4"
                            />
                            <Heading className="text-2xl font-serif text-[#D4AF37] mb-2">
                                Booking Confirmed
                            </Heading>
                            <Text className="text-gray-400">
                                Ref: {bookingRef}
                            </Text>
                        </Section>

                        <Section className="bg-[#111] border border-[#D4AF37]/30 rounded-lg p-6 my-6 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                            <Text className="text-lg mb-4">Hello, {customerName}.</Text>
                            <Text className="text-gray-300 mb-6">
                                Your sanctuary awaits. We have secured your appointment for the following executive service:
                            </Text>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Service</span>
                                    <span className="text-[#D4AF37] font-medium">{serviceName}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Date</span>
                                    <span className="text-white">{date}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Time</span>
                                    <span className="text-white">{time}</span>
                                </div>
                            </div>

                            <Text className="text-center text-sm text-gray-500 italic">
                                Please arrive 10 minutes early to enjoy our welcome refreshments.
                            </Text>
                        </Section>

                        <Section className="text-center">
                            <Link
                                href={`https://denver-inn.com/booking/${bookingRef}`}
                                className="bg-[#D4AF37] text-black px-6 py-3 rounded font-bold no-underline inline-block hover:opacity-90 transition-opacity"
                            >
                                View Ticket & QR Code
                            </Link>
                        </Section>

                        <Hr className="border-[#333] my-8" />

                        <Section className="text-center">
                            <Text className="text-xs text-gray-500">
                                Denver Inn Executive Spa, Bandung<br />
                                The Gentleman's Sanctuary
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default BookingConfirmation;
