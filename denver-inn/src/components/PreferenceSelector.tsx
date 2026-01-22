"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Music, MessageCircleOff, Coffee, Activity, Check } from "lucide-react";

export interface SensoryPreferences {
    music: 'jazz' | 'nature' | 'zen' | 'silence';
    conversation: 'silent' | 'friendly';
    drink: 'ginger-tea' | 'black-coffee' | 'infused-water';
    pressure: 'soft' | 'medium' | 'hard';
}

interface PreferenceSelectorProps {
    onSave: (preferences: SensoryPreferences) => void;
    initialPreferences?: Partial<SensoryPreferences>;
}

const MUSIC_OPTIONS = [
    { id: 'jazz', label: 'Smooth Jazz', icon: '🎷', desc: 'Relaxing saxophone' },
    { id: 'nature', label: 'Nature Sounds', icon: '🌊', desc: 'Ocean waves & birds' },
    { id: 'zen', label: 'Zen Flute', icon: '🎋', desc: 'Traditional meditation' },
    { id: 'silence', label: 'Silence', icon: '🔇', desc: 'Pure quietness' }
];

const CONVERSATION_OPTIONS = [
    { id: 'silent', label: 'Silent Mode', icon: MessageCircleOff, desc: 'No talking, total focus' },
    { id: 'friendly', label: 'Friendly Chat', icon: MessageCircleOff, desc: 'Informative & welcoming' }
];

const DRINK_OPTIONS = [
    { id: 'ginger-tea', label: 'Ginger Tea', icon: '🫖', desc: 'Warm & soothing' },
    { id: 'black-coffee', label: 'Black Coffee', icon: '☕', desc: 'Bold espresso' },
    { id: 'infused-water', label: 'Infused Water', icon: '💧', desc: 'Lemon & cucumber' }
];

const PRESSURE_OPTIONS = [
    { id: 'soft', label: 'Soft Touch', icon: '✨', desc: 'Gentle relaxation' },
    { id: 'medium', label: 'Medium', icon: '👌', desc: 'Balanced pressure' },
    { id: 'hard', label: 'Sport/Hard', icon: '💪', desc: 'Deep tissue work' }
];

export default function PreferenceSelector({ onSave, initialPreferences }: PreferenceSelectorProps) {
    const [preferences, setPreferences] = useState<SensoryPreferences>({
        music: initialPreferences?.music || 'nature',
        conversation: initialPreferences?.conversation || 'friendly',
        drink: initialPreferences?.drink || 'ginger-tea',
        pressure: initialPreferences?.pressure || 'medium'
    });

    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        onSave(preferences);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-serif text-white mb-3"
                >
                    Customize Your Experience
                </motion.h2>
                <p className="text-white/60 text-sm">
                    Your room will be prepared exactly to your preferences before you arrive
                </p>
            </div>

            <div className="space-y-8">
                {/* Music Preference */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Music className="text-[#D4AF37]" size={20} />
                        <h3 className="text-white font-medium">Music Atmosphere</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {MUSIC_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setPreferences({ ...preferences, music: option.id as any })}
                                className={`p-4 rounded-xl border transition-all ${preferences.music === option.id
                                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                                        : 'bg-white/5 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className="text-3xl mb-2">{option.icon}</div>
                                <p className="text-white text-sm font-medium mb-1">{option.label}</p>
                                <p className="text-white/40 text-xs">{option.desc}</p>
                                {preferences.music === option.id && (
                                    <Check className="text-[#D4AF37] absolute top-2 right-2" size={16} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Conversation Level */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <MessageCircleOff className="text-[#D4AF37]" size={20} />
                        <h3 className="text-white font-medium">Conversation Level</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {CONVERSATION_OPTIONS.map((option) => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => setPreferences({ ...preferences, conversation: option.id as any })}
                                    className={`p-4 rounded-xl border transition-all relative ${preferences.conversation === option.id
                                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                                            : 'bg-white/5 border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <Icon className="text-[#D4AF37] mb-2" size={24} />
                                    <p className="text-white text-sm font-medium mb-1">{option.label}</p>
                                    <p className="text-white/40 text-xs">{option.desc}</p>
                                    {preferences.conversation === option.id && (
                                        <Check className="text-[#D4AF37] absolute top-2 right-2" size={16} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Drink Choice */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Coffee className="text-[#D4AF37]" size={20} />
                        <h3 className="text-white font-medium">Welcome Drink</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {DRINK_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setPreferences({ ...preferences, drink: option.id as any })}
                                className={`p-4 rounded-xl border transition-all relative ${preferences.drink === option.id
                                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                                        : 'bg-white/5 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className="text-3xl mb-2">{option.icon}</div>
                                <p className="text-white text-sm font-medium mb-1">{option.label}</p>
                                <p className="text-white/40 text-xs">{option.desc}</p>
                                {preferences.drink === option.id && (
                                    <Check className="text-[#D4AF37] absolute top-2 right-2" size={16} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pressure Preference */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="text-[#D4AF37]" size={20} />
                        <h3 className="text-white font-medium">Massage Pressure</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {PRESSURE_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setPreferences({ ...preferences, pressure: option.id as any })}
                                className={`p-4 rounded-xl border transition-all relative ${preferences.pressure === option.id
                                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                                        : 'bg-white/5 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className="text-3xl mb-2">{option.icon}</div>
                                <p className="text-white text-sm font-medium mb-1">{option.label}</p>
                                <p className="text-white/40 text-xs">{option.desc}</p>
                                {preferences.pressure === option.id && (
                                    <Check className="text-[#D4AF37] absolute top-2 right-2" size={16} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <motion.button
                onClick={handleSave}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-12 py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 ${isSaved
                        ? 'bg-green-500 text-white'
                        : 'bg-[#D4AF37] hover:bg-white text-black shadow-lg shadow-[#D4AF37]/30'
                    }`}
            >
                {isSaved ? '✓ Preferences Saved!' : 'Save My Preferences'}
            </motion.button>

            {/* Privacy Note */}
            <p className="text-white/40 text-xs text-center mt-4">
                Your preferences will be highlighted for your therapist and visible until your visit
            </p>
        </div>
    );
}
