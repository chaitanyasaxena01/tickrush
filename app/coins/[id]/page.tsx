import { notFound } from "next/navigation";
import { Suspense } from "react";
import { fetchCoinDetails, fetchCoinOHLC } from "@/lib/coingecko";
import CoinHeader from "@/components/coin/CoinHeader";
import CandlestickChart from "@/components/coin/CandlestickChart";
import Converter from "@/components/coin/Converter";
import ExchangeTable from "@/components/coin/ExchangeTable";
import CoinDetails from "@/components/coin/CoinDetails";

interface CoinPageProps {
    params: Promise<{ id: string }>;
}

// Loading skeleton for header
function HeaderSkeleton() {
    return (
        <div id="coin-header" className="animate-pulse">
            <div className="info">
                <div className="skeleton size-19 rounded-full" />
                <div className="flex flex-col gap-2">
                    <div className="skeleton h-4 w-32" />
                    <div className="skeleton h-10 w-48" />
                </div>
            </div>
            <ul className="stats">
                {[...Array(6)].map((_, i) => (
                    <li key={i}>
                        <div className="skeleton h-3 w-20" />
                        <div className="skeleton h-5 w-24 mt-2" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Loading skeleton for chart
function ChartSkeleton() {
    return (
        <div id="candlestick-chart" className="animate-pulse">
            <div className="chart-header">
                <div className="skeleton h-6 w-32" />
                <div className="flex gap-2">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="skeleton h-8 w-10" />
                    ))}
                </div>
            </div>
            <div className="skeleton w-full h-80 rounded-lg" />
        </div>
    );
}

export default async function CoinPage({ params }: CoinPageProps) {
    const { id } = await params;

    try {
        const [coin, ohlcData] = await Promise.all([
            fetchCoinDetails(id),
            fetchCoinOHLC(id, 7),
        ]);

        if (!coin) {
            notFound();
        }

        return (
            <main id="coin-details-page">
                {/* Left/Main Column */}
                <div className="primary">
                    <Suspense fallback={<HeaderSkeleton />}>
                        <CoinHeader coin={coin} />
                    </Suspense>

                    <Suspense fallback={<ChartSkeleton />}>
                        <CandlestickChart data={ohlcData} coinId={id} />
                    </Suspense>

                    <ExchangeTable tickers={coin.tickers} />
                </div>

                {/* Right/Secondary Column */}
                <div className="secondary">
                    <Converter
                        symbol={coin.symbol}
                        icon={coin.image.large}
                        priceList={coin.market_data.current_price}
                    />

                    <CoinDetails coin={coin} />
                </div>
            </main>
        );
    } catch (error) {
        console.error("Failed to fetch coin:", error);
        notFound();
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CoinPageProps) {
    const { id } = await params;

    try {
        const coin = await fetchCoinDetails(id);
        return {
            title: `${coin.name} (${coin.symbol.toUpperCase()}) Price | TickRush`,
            description: `Get the latest ${coin.name} price, market cap, trading volume, and more. Live ${coin.symbol.toUpperCase()} to USD chart and data.`,
        };
    } catch {
        return {
            title: "Coin Not Found | TickRush",
        };
    }
}
