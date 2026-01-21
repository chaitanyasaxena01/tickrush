import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string;
    change?: number;
    icon: LucideIcon;
    trend?: "up" | "down" | "neutral";
}

export function StatCard({ label, value, change, icon: Icon, trend }: StatCardProps) {
    const isPositive = trend === "up";
    const isNegative = trend === "down";

    return (
        <div className="relative overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 shadow-[var(--glass-shadow-md)] backdrop-blur-md transition-all hover:translate-y-[-2px] hover:shadow-[var(--glass-shadow-lg)]">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-[var(--glass-text)] opacity-70">{label}</p>
                    <h3 className="mt-2 text-2xl font-bold text-[var(--glass-text)] font-orbitron tracking-wide">
                        {value}
                    </h3>
                </div>
                <div className="rounded-full bg-[var(--glass-border)] p-3 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-[var(--glass-primary)]" />
                </div>
            </div>

            {change !== undefined && (
                <div className="mt-4 flex items-center gap-2">
                    <span
                        className={cn(
                            "flex items-center text-sm font-medium",
                            isPositive && "text-green-400",
                            isNegative && "text-red-400",
                            !isPositive && !isNegative && "text-gray-400"
                        )}
                    >
                        {isPositive && "+"}
                        {change}%
                    </span>
                    <span className="text-xs text-[var(--glass-text)] opacity-50">from last month</span>
                </div>
            )}

            {/* Decorative gradient blob */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--glass-primary)] opacity-10 blur-2xl" />
        </div>
    );
}
