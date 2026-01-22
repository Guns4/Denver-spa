"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Executive Massage', value: 400 },
    { name: 'Reflexology', value: 300 },
    { name: 'Hot Stone', value: 300 },
    { name: 'Deep Tissue', value: 200 },
];

const COLORS = ['#D4AF37', '#b8860b', '#8b6508', '#553d05'];

export default function ServicePopularityChart() {
    return (
        <div className="w-full h-[300px] bg-[#111] p-4 rounded-xl border border-white/10">
            <h3 className="text-white font-serif text-lg mb-4">Service Popularity</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ color: '#fff' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
