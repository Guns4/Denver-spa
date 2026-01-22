import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/src/components/SmoothScroll";
import Script from "next/script";
import SchemaOrg from "@/src/components/SchemaOrg";
import StickyBottomCTA from "@/src/components/StickyBottomCTA";
import { BookingProvider } from "@/src/context/BookingContext";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#D4AF37",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // App-like feel, prevents zooming
};

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Denver Inn",
  },
  title: {
    template: "%s | Denver Inn Executive Spa Bandung",
    default: "Denver Inn Executive Spa - The Gentleman's Sanctuary in Bandung",
  },
  description: "Experience premium relaxation and executive therapy at Denver Inn Spa Bandung. Luxury massage, VIP suites, and professional therapists in Braga.",
  keywords: [
    "Spa Pria Bandung", "Masage Pria Braga", "Executive Spa", "Denver Inn", "Refleksi Pria"
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://denver-inn.com",
    title: "Denver Inn Executive Spa - The Gentleman's Sanctuary",
    description: "Premium relaxation in the heart of Bandung. Book your executive massage today.",
    siteName: "Denver Inn Executive Spa",
    images: [
      {
        url: "https://denver-inn.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Denver Inn Spa Ambience",
      },
    ],
  },
  alternates: {
    canonical: "https://denver-inn.com",
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
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        <Script
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <SchemaOrg />
        <SmoothScroll>
          <BookingProvider>
            {children}
            <StickyBottomCTA />
          </BookingProvider>
          <Toaster position="top-center" richColors />
        </SmoothScroll>
      </body>
    </html>
  );
}
