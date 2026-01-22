"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "1 Jan", revenue: 4000000 },
    { name: "5 Jan", revenue: 3000000 },
    { name: "10 Jan", revenue: 2000000 },
    { name: "15 Jan", revenue: 2780000 },
    { name: "20 Jan", revenue: 1890000 },
    { name: "25 Jan", revenue: 2390000 },
    { name: "30 Jan", revenue: 3490000 },
];

export default function RevenueChart() {
    return (
        <div className="w-full h-[300px] bg-[#111] p-4 rounded-xl border border-white/10">
            <h3 className="text-white font-serif text-lg mb-4">Revenue Trend (30 Days)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} />
                    <YAxis stroke="#888" tick={{ fill: '#888' }} tickFormatter={(value) => `${value / 1000}k`} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                        formatter={(value: number) => [`Rp ${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#D4AF37"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
