"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../src/lib/supabase";
import { Trash2, Plus, Calendar, Package } from "lucide-react";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState("");

    // Data States
    const [services, setServices] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'services' | 'bookings'>('services');

    // Form State
    const [newService, setNewService] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image_url: "",
    });

    // Login Handler
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "1234") {
            setIsAuthenticated(true);
            fetchData();
        } else {
            alert("Invalid PIN");
        }
    };

    // Fetch Data
    const fetchData = async () => {
        setLoading(true);

        // Fetch Services
        const { data: servicesData } = await supabase
            .from("services")
            .select("*")
            .order("created_at", { ascending: false }); // Assuming created_at exists, or just id

        if (servicesData) setServices(servicesData);

        // Fetch Bookings
        const { data: bookingsData } = await supabase
            .from("bookings")
            .select("*")
            .order("created_at", { ascending: false });

        if (bookingsData) setBookings(bookingsData);

        setLoading(false);
    };

    // Add Service Handler
    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newService.title || !newService.price) return alert("Title and Price required");

        const { error } = await supabase.from("services").insert([
            {
                title: newService.title,
                price: parseFloat(newService.price),
                description: newService.description,
                category: newService.category,
                image_url: newService.image_url,
            },
        ]);

        if (error) {
            alert("Error adding service: " + error.message);
        } else {
            alert("Service added!");
            setNewService({ title: "", price: "", description: "", category: "", image_url: "" });
            fetchData(); // Refresh list
        }
    };

    // Delete Service Handler
    const handleDeleteService = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        const { error } = await supabase.from("services").delete().eq("id", id);

        if (error) {
            alert("Error deleting service: " + error.message);
        } else {
            fetchData(); // Refresh list
        }
    };

    // --- RENDER ---

    // 1. PIN LOGIN SCREEN
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">
                <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col gap-4 w-full max-w-sm backdrop-blur-md">
                    <h1 className="text-2xl font-serif text-[#D4AF37] text-center">Admin Access</h1>
                    <input
                        type="password"
                        placeholder="Enter PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="bg-black/20 border border-white/10 rounded-lg p-3 text-center text-white focus:border-[#D4AF37] outline-none tracking-widest text-xl"
                        autoFocus
                    />
                    <button type="submit" className="bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
                        ENTER
                    </button>
                </form>
            </div>
        );
    }

    // 2. DASHBOARD SCREEN
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">

            {/* Header */}
            <header className="fixed top-0 w-full bg-[#1a1a1a]/90 backdrop-blur-md border-b border-white/5 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-serif text-[#D4AF37]">Denver Inn Admin</h1>
                    <button onClick={() => setIsAuthenticated(false)} className="text-xs text-white/50 hover:text-white">LOGOUT</button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-24">

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${activeTab === 'services' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-white/10 text-white/50 hover:border-white/30'}`}
                    >
                        <Package className="w-4 h-4" /> Manage Services
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${activeTab === 'bookings' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-white/10 text-white/50 hover:border-white/30'}`}
                    >
                        <Calendar className="w-4 h-4" /> View Bookings
                    </button>
                </div>

                {/* SERVICES TAB */}
                {activeTab === 'services' && (
                    <div className="flex flex-col gap-12">
                        {/* Add Service Form */}
                        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                            <h2 className="text-xl font-medium mb-6 text-[#D4AF37] flex items-center gap-2"><Plus className="w-5 h-5" /> Add New Service</h2>
                            <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Service Name" value={newService.title} onChange={e => setNewService({ ...newService, title: e.target.value })} className="bg-black/20 border border-white/10 rounded-lg p-3 outline-none focus:border-[#D4AF37]" required />
                                <input type="number" placeholder="Price (IDR)" value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} className="bg-black/20 border border-white/10 rounded-lg p-3 outline-none focus:border-[#D4AF37]" required />
                                <input type="text" placeholder="Category (e.g., Massage)" value={newService.category} onChange={e => setNewService({ ...newService, category: e.target.value })} className="bg-black/20 border border-white/10 rounded-lg p-3 outline-none focus:border-[#D4AF37]" />
                                <input type="text" placeholder="Image URL (Optional)" value={newService.image_url} onChange={e => setNewService({ ...newService, image_url: e.target.value })} className="bg-black/20 border border-white/10 rounded-lg p-3 outline-none focus:border-[#D4AF37]" />
                                <textarea placeholder="Description" value={newService.description} onChange={e => setNewService({ ...newService, description: e.target.value })} className="bg-black/20 border border-white/10 rounded-lg p-3 outline-none focus:border-[#D4AF37] md:col-span-2 h-24 resize-none" />
                                <button type="submit" className="md:col-span-2 bg-[#D4AF37]/80 hover:bg-[#D4AF37] text-black font-bold py-3 rounded-lg transition-colors">SAVE SERVICE</button>
                            </form>
                        </section>

                        {/* Services List */}
                        <section>
                            <h2 className="text-xl font-medium mb-6 text-white/80">Existing Services ({services.length})</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {loading && <p>Loading...</p>}
                                {services.map(service => (
                                    <div key={service.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-white/10 transition-colors">
                                        <div className="flex-grow text-center md:text-left">
                                            <h3 className="font-bold text-lg text-[#D4AF37]">{service.title}</h3>
                                            <p className="text-sm text-white/50">{service.category} • IDR {service.price}</p>
                                        </div>
                                        <button onClick={() => handleDeleteService(service.id)} className="p-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* BOOKINGS TAB */}
                {activeTab === 'bookings' && (
                    <section>
                        <h2 className="text-xl font-medium mb-6 text-white/80">Incoming Reservations ({bookings.length})</h2>
                        <div className="overflow-x-auto rounded-xl border border-white/10">
                            <table className="w-full text-left bg-white/5">
                                <thead className="bg-black/20 text-[#D4AF37] uppercase text-xs tracking-wider border-b border-white/10">
                                    <tr>
                                        <th className="p-4">Date & Time</th>
                                        <th className="p-4">Client</th>
                                        <th className="p-4">WhatsApp</th>
                                        <th className="p-4">Service</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="p-4 text-white/90">
                                                {booking.booking_date} <br /> <span className="text-white/40">{booking.booking_time}</span>
                                            </td>
                                            <td className="p-4 font-medium">{booking.client_name}</td>
                                            <td className="p-4 font-mono text-white/60">{booking.client_whatsapp}</td>
                                            <td className="p-4">{booking.selected_service}</td>
                                            <td className="p-4">
                                                <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs border border-yellow-400/20">
                                                    {booking.status || 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {bookings.length === 0 && (
                                        <tr><td colSpan={5} className="p-8 text-center text-white/30">No bookings found yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}
