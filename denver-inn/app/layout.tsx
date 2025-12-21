import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google"; // Changed fonts
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Denver Inn - Luxury Massage & Spa Jakarta",
  description: "Experience premium relaxation with antigravity ambience. Book aromatherapy, hot stone, and body scrub treatments.",
  openGraph: {
    title: "Denver Inn - Luxury Massage & Spa Jakarta",
    description: "Experience premium relaxation with antigravity ambience. Book aromatherapy, hot stone, and body scrub treatments.",
    type: "website",
    locale: "id_ID",
    siteName: "Denver Inn",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200", // Using the hero background as OG image
        width: 1200,
        height: 630,
        alt: "Denver Inn Luxury Spa",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
