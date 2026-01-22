"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { getVirtualTourSpots } from "@/src/data/galleryData";

interface TourSpot {
    id: string;
    title: string;
    description: string;
    image: string;
}

// Get spots from shared Gallery data - automatically syncs with Gallery updates
const TOUR_SPOTS: TourSpot[] = getVirtualTourSpots();

export default function VirtualTour() {
    const [currentSpotIndex, setCurrentSpotIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const viewerRef = useRef<HTMLDivElement>(null);

    const currentSpot = TOUR_SPOTS[currentSpotIndex];

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        setRotation(prev => ({
            x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.2)),
            y: prev.y + deltaX * 0.3
        }));

        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleNext = () => {
        setCurrentSpotIndex((prev) => (prev + 1) % TOUR_SPOTS.length);
        setRotation({ x: 0, y: 0 });
    };

    const handlePrevious = () => {
        setCurrentSpotIndex((prev) => (prev - 1 + TOUR_SPOTS.length) % TOUR_SPOTS.length);
        setRotation({ x: 0, y: 0 });
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <>
            {/* Normal View */}
            <div className="relative w-full h-[600px] bg-black rounded-2xl overflow-hidden group">
                {/* 360° Panorama Viewer */}
                <div
                    ref={viewerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className={`w-full h-full relative overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{ perspective: '1000px' }}
                >
                    <motion.div
                        className="w-full h-full"
                        style={{
                            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                            transformStyle: 'preserve-3d',
                            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                        }}
                    >
                        <Image
                            src={currentSpot.image}
                            alt={currentSpot.title}
                            fill
                            className="object-cover pointer-events-none"
                            priority
                            draggable={false}
                        />
                    </motion.div>

                    {/* Darkening overlay for depth effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
                </div>

                {/* Overlay Info */}
                <div className="absolute top-6 left-6 right-6 z-10 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={currentSpot.id}
                        className="bg-black/60 backdrop-blur-xl rounded-2xl p-5 border border-white/10"
                    >
                        <h3 className="text-white font-serif text-2xl mb-2">{currentSpot.title}</h3>
                        <p className="text-white/70 text-sm">{currentSpot.description}</p>
                    </motion.div>
                </div>

                {/* Navigation Controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
                    <button
                        onClick={handlePrevious}
                        className="w-12 h-12 bg-black/60 hover:bg-[#D4AF37]/80 backdrop-blur-xl rounded-full flex items-center justify-center transition-all border border-white/10 hover:border-[#D4AF37]"
                    >
                        <ChevronLeft className="text-white" size={20} />
                    </button>

                    {/* Spot Indicators */}
                    <div className="flex gap-2">
                        {TOUR_SPOTS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentSpotIndex(idx);
                                    setRotation({ x: 0, y: 0 });
                                }}
                                className={`h-2 rounded-full transition-all ${idx === currentSpotIndex
                                    ? "w-8 bg-[#D4AF37]"
                                    : "w-2 bg-white/30 hover:bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-12 h-12 bg-black/60 hover:bg-[#D4AF37]/80 backdrop-blur-xl rounded-full flex items-center justify-center transition-all border border-white/10 hover:border-[#D4AF37]"
                    >
                        <ChevronRight className="text-white" size={20} />
                    </button>
                </div>

                {/* Fullscreen Button */}
                <button
                    onClick={toggleFullscreen}
                    className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/60 hover:bg-white/20 backdrop-blur-xl rounded-lg flex items-center justify-center transition-all border border-white/10"
                >
                    <Maximize2 className="text-white" size={18} />
                </button>

                {/* Hint Text */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white/50 text-xs">Click and drag to explore</p>
                </div>
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-[200]"
                    >
                        <div
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            className={`w-full h-full relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                            style={{ perspective: '1000px' }}
                        >
                            <motion.div
                                className="w-full h-full"
                                style={{
                                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                                    transformStyle: 'preserve-3d',
                                    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                                }}
                            >
                                <Image
                                    src={currentSpot.image}
                                    alt={currentSpot.title}
                                    fill
                                    className="object-cover pointer-events-none"
                                    priority
                                    draggable={false}
                                />
                            </motion.div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={toggleFullscreen}
                            className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/80 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center transition-all"
                        >
                            <X className="text-white" size={24} />
                        </button>

                        {/* Info Overlay (Fullscreen) */}
                        <div className="absolute top-6 left-6 z-10">
                            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-5 border border-white/10 max-w-md">
                                <h3 className="text-white font-serif text-2xl mb-2">{currentSpot.title}</h3>
                                <p className="text-white/70 text-sm">{currentSpot.description}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
