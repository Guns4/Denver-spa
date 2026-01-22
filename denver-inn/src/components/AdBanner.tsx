"use client";

import { useEffect } from "react";

interface AdBannerProps {
    dataAdSlot: string;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdBanner({ dataAdSlot }: AdBannerProps) {
    const isProduction = process.env.NODE_ENV === "production";

    useEffect(() => {
        // Only load ads in production
        if (isProduction && typeof window !== "undefined") {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error("AdSense Error:", err);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Don't render anything in development to avoid errors
    if (!isProduction) {
        return null;
    }

    return (
        <div className="w-full flex flex-col items-center my-12">
            {/* Small subtle label for professionalism */}
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-2">
                Advertisement
            </span>

            <div className="w-full max-w-4xl overflow-hidden flex justify-center bg-black/5 rounded-lg border border-white/5 py-4">
                <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Still uses dummy client ID as requested
                    data-ad-slot={dataAdSlot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
}
