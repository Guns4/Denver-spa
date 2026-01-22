"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Dumbbell, Moon, Wind } from "lucide-react";

export type Symptom = 'stressed' | 'muscle-pain' | 'tired' | 'hangover';

interface SymptomOption {
    id: Symptom;
    label: string;
    icon: typeof Brain;
    color: string;
    description: string;
}

interface SymptomFilterProps {
    onSymptomSelect: (symptom: Symptom) => void;
    selectedSymptom: Symptom | null;
}

const SYMPTOM_OPTIONS: SymptomOption[] = [
    {
        id: 'stressed',
        label: 'Stressed / Burnout',
        icon: Brain,
        color: '#FF6B6B',
        description: 'Mental fatigue, tension'
    },
    {
        id: 'muscle-pain',
        label: 'Muscle Pain / Gym Recovery',
        icon: Dumbbell,
        color: '#4ECDC4',
        description: 'Soreness, tight muscles'
    },
    {
        id: 'tired',
        label: 'Just Need Sleep',
        icon: Moon,
        color: '#9B59B6',
        description: 'Insomnia, exhaustion'
    },
    {
        id: 'hangover',
        label: 'Recovery Mode',
        icon: Wind,
        color: '#F39C12',
        description: 'Hangover, dehydration'
    }
];

export default function SymptomFilter({ onSymptomSelect, selectedSymptom }: SymptomFilterProps) {
    return (
        <div className="my-12">
            <div className="text-center mb-8">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-serif text-white mb-3"
                >
                    How are you feeling?
                </motion.h3>
                <p className="text-white/60 text-sm">Let us recommend the perfect treatment for you</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto px-6">
                {SYMPTOM_OPTIONS.map((option, index) => {
                    const Icon = option.icon;
                    const isSelected = selectedSymptom === option.id;

                    return (
                        <motion.button
                            key={option.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSymptomSelect(option.id)}
                            className={`relative p-6 rounded-2xl transition-all duration-300 group ${isSelected
                                    ? 'bg-white/10 border-2 shadow-lg'
                                    : 'bg-white/5 border border-white/10 hover:border-white/30'
                                }`}
                            style={{
                                borderColor: isSelected ? option.color : undefined,
                                boxShadow: isSelected ? `0 0 20px ${option.color}40` : undefined
                            }}
                        >
                            {/* Icon */}
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-all ${isSelected ? 'scale-110' : 'group-hover:scale-110'
                                    }`}
                                style={{
                                    backgroundColor: `${option.color}20`,
                                    color: option.color
                                }}
                            >
                                <Icon size={24} />
                            </div>

                            {/* Label */}
                            <h4 className="text-white text-sm font-medium mb-1 text-center">
                                {option.label}
                            </h4>
                            <p className="text-white/40 text-xs text-center">
                                {option.description}
                            </p>

                            {/* Selected Indicator */}
                            {isSelected && (
                                <motion.div
                                    layoutId="selectedSymptom"
                                    className="absolute inset-0 rounded-2xl -z-10"
                                    style={{
                                        background: `linear-gradient(135deg, ${option.color}15, transparent)`
                                    }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Clear Filter Button */}
            {selectedSymptom && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-6"
                >
                    <button
                        onClick={() => onSymptomSelect(null as any)}
                        className="text-white/60 text-sm hover:text-white transition-colors underline"
                    >
                        View all treatments
                    </button>
                </motion.div>
            )}
        </div>
    );
}

// Recommendation Engine Logic
export const SYMPTOM_SERVICE_MAP: Record<Symptom, string[]> = {
    'stressed': ['Aromatherapy Relaxation', 'Head & Shoulder Massage', 'Executive Massage'],
    'muscle-pain': ['Deep Tissue Sport Massage', 'Hot Stone Therapy', 'Reflexology'],
    'tired': ['Full Body Relaxation', 'Aromatherapy Relaxation', 'VIP Royal Package'],
    'hangover': ['Detox Massage', 'Lymphatic Drainage', 'Energy Boost Package']
};

export function filterServicesBySymptom(services: any[], symptom: Symptom | null): any[] {
    if (!symptom) return services;

    const recommendedServices = SYMPTOM_SERVICE_MAP[symptom];

    return services.filter(service =>
        recommendedServices.some(name =>
            service.title?.toLowerCase().includes(name.toLowerCase()) ||
            service.name?.toLowerCase().includes(name.toLowerCase())
        )
    );
}
