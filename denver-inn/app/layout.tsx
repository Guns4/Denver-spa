import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Script from "next/script";
import SchemaOrg from "@/src/components/SchemaOrg";

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
  title: "Denver Inn Executive Spa — Premium Men’s Spa & Massage Bandung",
  description: "Pusat relaksasi & massage khusus pria di pusat Kota Bandung. Terletak di Jl. ABC Braga. Spesialis Sport Massage, Executive Therapy, dan pemulihan kebugaran untuk pria modern.",
  keywords: [
    'Spa Pria Bandung',
    'Massage Pria Braga',
    'Pijat Panggilan Bandung',
    'Sport Massage Bandung',
    'Executive Spa',
    'Denver Inn',
    'Refleksi Pria Bandung',
    'Pijat Otot & Kebugaran',
    'Spa Pria Braga',
    'Massage Pria Bandung',
    'Pijat Pria Bandung',
    'Spa Eksklusif Pria Bandung',
    'Massage Profesional Bandung',
    'Pijat Relaksasi Bandung',
    'Pijat Kesehatan Bandung',
    'Refleksi Kaki Bandung',
    'Body Massage Bandung',
    'Spa Pria Terdekat',
    'Massage Pria Terdekat',
    'Pijat Panggilan Pria Bandung',
    'Spa Hotel Bandung',
    'Massage Executive Bandung',
    'Spa Premium Bandung',
    'Pijat Pegal Bandung',
    'Pijat Capek Kerja Bandung',
    'Sport Massage Pria Bandung',
    'Massage Recovery Bandung',
    'Pijat Kebugaran Pria',
    'Denver Inn Spa Bandung',
    'Spa Denver Inn Braga',
    'Spa Denver Inn',
    'Denver Bandung',
    'Denver Club',
    'Denver club bandung',
    'Denver karaoke',
    'Executive Club Bandung',
    'Club Malam Bandung',
    'Exclusive Club Bandung',
    'Executive Karaoke Bandung',
    'Karaoke Executive Bandung',
    'Private Karaoke Bandung',
    'Karaoke Pria Bandung',
    'Karaoke VIP Bandung',
    'Club Executive Braga',
    'Night Club Bandung',
  ],
  openGraph: {
    title: "Denver Inn Executive Spa — Premium Men’s Spa & Massage Bandung",
    description: "Pusat relaksasi & massage khusus pria di pusat Kota Bandung. Terletak di Jl. ABC Braga. Spesialis Sport Massage, Executive Therapy, dan pemulihan kebugaran untuk pria modern.",
    type: "website",
    locale: "id_ID",
    siteName: "Denver Inn Executive Spa",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Denver Inn Luxury Spa Ambience",
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
        <Script
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <SchemaOrg />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
