"use client";

import Link from "next/link";
import { LayoutDashboard, Calendar, Users, Settings, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Bookings", href: "/admin/bookings", icon: Calendar },
        { name: "Staff", href: "/admin/staff", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
            {/* DESKTOP SIDEBAR */}
            <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#111] p-6">
                <div className="mb-10">
                    <h2 className="text-xl font-serif text-[#D4AF37]">Denver Admin</h2>
                    <p className="text-xs text-white/40">Management Console</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-[#D4AF37] text-black font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-colors mt-auto">
                    <LogOut size={20} />
                    Logout
                </button>
            </aside>

            {/* MOBILE HEADER */}
            <div className="md:hidden fixed top-0 w-full z-20 bg-[#111] border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <span className="font-serif text-[#D4AF37]">Denver Admin</span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu size={24} className="text-white" />
                </button>
            </div>

            {/* MAIN CONTENT Area */}
            <main className="flex-1 overflow-y-auto pt-20 md:pt-0 p-6 md:p-10">
                {children}
            </main>

            {/* MOBILE BOTTOM NAV */}
            <nav className="md:hidden fixed bottom-0 w-full bg-[#111] border-t border-white/10 flex justify-around py-4 z-20 safe-area-bottom">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 ${isActive ? "text-[#D4AF37]" : "text-white/40"}`}
                        >
                            <item.icon size={20} />
                            <span className="text-[10px]">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
