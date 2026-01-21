import { DashboardChart } from "@/components/dashboard/DashboardChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { Wallet, TrendingUp, DollarSign, Activity } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="p-4 md:p-8 space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold font-orbitron text-[var(--glass-text)]">
                    Dashboard
                </h2>
                <p className="text-[var(--glass-text)] opacity-70 font-exo-2">
                    Overview of your portfolio and market trends.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Total Balance"
                    value="$12,450.00"
                    change={12.5}
                    trend="up"
                    icon={Wallet}
                />
                <StatCard
                    label="24h Profit"
                    value="$345.20"
                    change={2.4}
                    trend="up"
                    icon={TrendingUp}
                />
                <StatCard
                    label="Total Invested"
                    value="$8,200.00"
                    trend="neutral"
                    icon={DollarSign}
                />
                <StatCard
                    label="Active Assets"
                    value="7"
                    trend="neutral"
                    icon={Activity}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <DashboardChart />
                </div>
                <div className="col-span-3">
                    <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 shadow-[var(--glass-shadow-md)] backdrop-blur-md h-full">
                        <h3 className="text-lg font-bold text-[var(--glass-text)] font-orbitron mb-4">
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b border-[var(--glass-border)] pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <div>
                                            <p className="font-medium text-[var(--glass-text)]">Bitcoin Buy</p>
                                            <p className="text-xs text-[var(--glass-text)] opacity-60">Today, 12:00 PM</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-[var(--glass-text)]">+$500.00</p>
                                        <p className="text-xs text-[var(--glass-text)] opacity-60">Complete</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
