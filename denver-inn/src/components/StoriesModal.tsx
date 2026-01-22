"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface Story {
    id: string;
    title: string;
    videoUrl?: string;
    imageUrl: string;
    description: string;
    price: string;
    duration: string;
}

interface StoriesModalProps {
    stories: Story[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onBook?: (story: Story) => void;
}

export default function StoriesModal({ stories, initialIndex, isOpen, onClose, onBook }: StoriesModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const y = useMotionValue(0);
    const opacity = useTransform(y, [0, 150], [1, 0.5]);

    const currentStory = stories[currentIndex];

    // Auto-advance progress (10 seconds per story)
    useEffect(() => {
        if (!isOpen) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    handleNext();
                    return 0;
                }
                return prev + 1; // 10 seconds = 100ms * 100
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isOpen, currentIndex]);

    // Reset progress when story changes
    useEffect(() => {
        setProgress(0);
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.y > 150) {
            // Swipe down to close
            onClose();
        }
    };

    const handleTap = (e: React.MouseEvent) => {
        const x = e.clientX;
        const screenWidth = window.innerWidth;

        // Tap left 30% = previous, tap right 30% = next
        if (x < screenWidth * 0.3) {
            handlePrevious();
        } else if (x > screenWidth * 0.7) {
            handleNext();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black z-[100]"
                >
                    {/* Progress Bars (Instagram Style) */}
                    <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
                        {stories.map((_, idx) => (
                            <div key={idx} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: "0%" }}
                                    animate={{
                                        width: idx === currentIndex
                                            ? `${progress}%`
                                            : idx < currentIndex
                                                ? "100%"
                                                : "0%"
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-30 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Story Content (Draggable) */}
                    <motion.div
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        style={{ y, opacity }}
                        onClick={handleTap}
                        className="w-full h-full relative cursor-pointer"
                    >
                        {/* Background Image/Video */}
                        {currentStory.videoUrl ? (
                            <video
                                src={currentStory.videoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Image
                                src={currentStory.imageUrl}
                                alt={currentStory.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                        {/* Story Info (Top) */}
                        <div className="absolute top-14 left-4 right-4 z-20">
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-white font-serif text-2xl mb-2 drop-shadow-lg"
                            >
                                {currentStory.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white/90 text-sm drop-shadow-lg"
                            >
                                {currentStory.description}
                            </motion.p>
                        </div>

                        {/* CTA Button (Bottom) */}
                        <div className="absolute bottom-8 left-4 right-4 z-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 mb-4"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-white/70 text-sm">{currentStory.duration}</span>
                                    <span className="text-[#D4AF37] font-bold text-xl">{currentStory.price}</span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onBook?.(currentStory);
                                    }}
                                    className="w-full py-4 bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-[#D4AF37]/30"
                                >
                                    Book This Treatment
                                </button>
                            </motion.div>

                            {/* Swipe Hint */}
                            <p className="text-white/40 text-center text-xs">Swipe down to close • Tap sides to navigate</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
