import { StatCard } from "@/components/dashboard/StatCard";
import { Activity, DollarSign, TrendingUp, Wallet } from "lucide-react";

export default function HomeStats() {
    // In a real app, these would be fetched from an API
    // For now, we mock global market stats
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
                label="Global Market Cap"
                value="$2.45T"
                change={2.1}
                trend="up"
                icon={DollarSign}
            />
            <StatCard
                label="24h Volume"
                value="$88.2B"
                change={-5.4}
                trend="down"
                icon={Activity}
            />
            <StatCard
                label="BTC Dominance"
                value="52.1%"
                change={0.2}
                trend="up"
                icon={Wallet} // Using Wallet as a placeholder for dominance
            />
            <StatCard
                label="Active Cryptos"
                value="12,450"
                trend="neutral"
                icon={TrendingUp}
            />
        </div>
    );
}
