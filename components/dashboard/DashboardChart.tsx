"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
];

export function DashboardChart() {
    return (
        <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 shadow-[var(--glass-shadow-md)] backdrop-blur-md">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-[var(--glass-text)] font-orbitron">
                    Portfolio Performance
                </h3>
                <p className="text-sm text-[var(--glass-text)] opacity-70">
                    Value over time (Mock Data)
                </p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--glass-primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--glass-primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="var(--glass-text)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            opacity={0.5}
                        />
                        <YAxis
                            stroke="var(--glass-text)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            opacity={0.5}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--glass-bg)",
                                borderColor: "var(--glass-border)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "8px",
                                color: "var(--glass-text)",
                            }}
                            itemStyle={{ color: "var(--glass-primary)" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="var(--glass-primary)"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
