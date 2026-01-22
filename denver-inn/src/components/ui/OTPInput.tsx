"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface OTPInputProps {
    length?: number;
    onComplete: (code: string) => void;
}

export default function OTPInput({ length = 4, onComplete }: OTPInputProps) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        // Allow last character only if multiple typed (though specific handler below covers paste)
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }

        // Trigger onComplete if full
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) {
            onComplete(combinedOtp);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            // Move to previous input on backspace if empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").slice(0, length).split("");
        if (data.length === 0) return;

        const newOtp = [...otp];
        data.forEach((char, index) => {
            if (index < length && !isNaN(Number(char))) {
                newOtp[index] = char;
            }
        });
        setOtp(newOtp);

        // Focus the input after the last pasted character
        const focusIndex = Math.min(data.length, length - 1);
        inputRefs.current[focusIndex]?.focus();

        if (newOtp.join("").length === length) {
            onComplete(newOtp.join(""));
        }
    };

    return (
        <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
                <motion.input
                    key={index}
                    ref={(el) => { if (el) inputRefs.current[index] = el; }} // Fix for TS void return
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-14 h-16 text-center text-2xl font-bold bg-white/10 border-2 rounded-xl focus:outline-none transition-all caret-[#D4AF37] ${digit ? "border-[#D4AF37] text-white" : "border-white/20 text-white/50 focus:border-[#D4AF37]/50"}`}
                />
            ))}
        </div>
    );
}
