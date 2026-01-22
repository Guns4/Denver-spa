"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, User, Flag, FileText } from "lucide-react";
import { toast } from "sonner";

type IncidentCategory = 'no_show' | 'inappropriate_behavior' | 'refused_payment' | 'drunk_disorderly' | 'other';

interface IncidentReportFormProps {
    bookingId?: string;
    guestPhone: string;
    guestName?: string;
    onSubmit: (report: IncidentReport) => void;
    onCancel: () => void;
}

interface IncidentReport {
    guestPhone: string;
    guestName?: string;
    bookingId?: string;
    category: IncidentCategory;
    severity: number;
    description: string;
}

const INCIDENT_CATEGORIES = [
    { id: 'no_show', label: 'No-Show', icon: '❌', color: 'orange' },
    { id: 'inappropriate_behavior', label: 'Inappropriate Behavior', icon: '⚠️', color: 'red' },
    { id: 'refused_payment', label: 'Refused Payment', icon: '💳', color: 'red' },
    { id: 'drunk_disorderly', label: 'Drunk/Disorderly', icon: '🍺', color: 'red' },
    { id: 'other', label: 'Other', icon: '📝', color: 'gray' }
];

export default function IncidentReportForm({
    bookingId,
    guestPhone,
    guestName,
    onSubmit,
    onCancel
}: IncidentReportFormProps) {
    const [category, setCategory] = useState<IncidentCategory>('other');
    const [severity, setSeverity] = useState(3);
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!description.trim()) {
            toast.error('Please provide a description');
            return;
        }

        const report: IncidentReport = {
            guestPhone,
            guestName,
            bookingId,
            category,
            severity,
            description: description.trim()
        };

        onSubmit(report);
        toast.success('Incident reported successfully');
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1a1a1a] border border-red-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                        <AlertTriangle className="text-red-500" size={24} />
                    </div>
                    <div>
                        <h2 className="text-white font-serif text-2xl">Report Guest Incident</h2>
                        <p className="text-white/50 text-sm">Confidential internal report</p>
                    </div>
                </div>

                {/* Guest Info */}
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <User size={16} className="text-[#D4AF37]" />
                        <span className="text-white/70 text-sm">Guest Information</span>
                    </div>
                    <p className="text-white font-medium">{guestName || 'Unknown Guest'}</p>
                    <p className="text-white/60 text-sm">{guestPhone}</p>
                </div>

                {/* Category Selection */}
                <div className="mb-6">
                    <label className="text-white/70 text-sm mb-3 block flex items-center gap-2">
                        <Flag size={16} className="text-[#D4AF37]" />
                        Incident Category
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {INCIDENT_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id as IncidentCategory)}
                                className={`p-4 rounded-xl border transition-all ${category === cat.id
                                        ? 'bg-red-500/20 border-red-500'
                                        : 'bg-white/5 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className="text-2xl mb-1">{cat.icon}</div>
                                <p className="text-white text-xs">{cat.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Severity Slider */}
                <div className="mb-6">
                    <label className="text-white/70 text-sm mb-3 block">
                        Severity Level: <span className="text-[#D4AF37] font-bold">{severity}/5</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={severity}
                        onChange={(e) => setSeverity(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, #22c55e 0%, #eab308 50%, #ef4444 100%)`
                        }}
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-1">
                        <span>Minor</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="text-white/70 text-sm mb-3 block flex items-center gap-2">
                        <FileText size={16} className="text-[#D4AF37]" />
                        Detailed Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please provide detailed information about the incident..."
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#D4AF37]"
                    />
                </div>

                {/* Warning */}
                {severity >= 4 && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
                        <p className="text-red-400 text-sm">
                            ⚠️ High severity reports may trigger automatic blacklisting after multiple incidents.
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all"
                    >
                        Submit Report
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
