import Image from "next/image";
import Link from "next/link";
import { fetchCoinMarkets } from "@/lib/coingecko";
import { formatPrice, formatPercentage, formatMarketCap } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "@/components/Icons";
import { DashboardChart } from "@/components/dashboard/DashboardChart";

export default async function CoinOverview() {
    let coin: CoinMarketData | null = null;

    try {
        const coins = await fetchCoinMarkets(1, 1);
        coin = coins[0] || null;
    } catch (error) {
        console.error("Failed to fetch coin overview:", error);
    }

    if (!coin) {
        return (
            <div id="coin-overview" className="xl:col-span-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 shadow-[var(--glass-shadow-md)] backdrop-blur-md">
                <div className="header pt-2">
                    <div className="info">
                        <p className="text-[var(--glass-text)]">Unable to load coin data</p>
                        <p className="text-sm text-[var(--glass-text)] opacity-70">Please check your API configuration</p>
                    </div>
                </div>
            </div>
        );
    }

    const { text: changeText, isPositive } = formatPercentage(
        coin.price_change_percentage_24h
    );

    return (
        <div id="coin-overview" className="xl:col-span-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 shadow-[var(--glass-shadow-md)] backdrop-blur-md transition-all hover:shadow-[var(--glass-shadow-lg)]">
            <Link href={`/coins/${coin.id}`} className="block h-full">
                <div className="flex flex-col md:flex-row gap-6 h-full">
                    {/* Left Side: Stats */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <Image
                                    src={coin.image}
                                    alt={`${coin.name} Logo`}
                                    width={64}
                                    height={64}
                                    className="rounded-full shadow-lg"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-[var(--glass-text)] opacity-70 uppercase tracking-wider">
                                        Most Popular
                                    </h4>
                                    <p className="text-2xl font-bold font-orbitron text-[var(--glass-text)]">
                                        {coin.name} <span className="text-sm opacity-50 font-sans">{coin.symbol.toUpperCase()}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-[var(--glass-text)] font-exo-2">{formatPrice(coin.current_price)}</h1>
                                <div className={`flex items-center gap-2 mt-2 ${isPositive ? "text-green-400" : "text-red-400"}`}>
                                    {isPositive ? <TrendingUp className="size-5" /> : <TrendingDown className="size-5" />}
                                    <span className="text-lg font-medium">{changeText}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-3 rounded-lg bg-[var(--glass-border)]/50 backdrop-blur-sm">
                                <p className="text-[var(--glass-text)] text-xs opacity-70">Market Cap</p>
                                <p className="font-semibold text-[var(--glass-text)]">{formatMarketCap(coin.market_cap)}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--glass-border)]/50 backdrop-blur-sm">
                                <p className="text-[var(--glass-text)] text-xs opacity-70">24h Volume</p>
                                <p className="font-semibold text-[var(--glass-text)]">{formatMarketCap(coin.total_volume)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Chart (Reusing DashboardChart for now) */}
                    <div className="flex-1 min-h-[250px] md:min-h-0">
                        {/* We can pass props to DashboardChart if we update it to accept data, 
                             for now reusing the mock component to demonstrate layout */}
                        <div className="h-full w-full opacity-90 hover:opacity-100 transition-opacity">
                            <DashboardChart />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
