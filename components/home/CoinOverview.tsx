import Image from "next/image";
import Link from "next/link";
import { fetchCoinMarkets } from "@/lib/coingecko";
import { formatPrice, formatPercentage, formatMarketCap } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "@/components/Icons";

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
            <div id="coin-overview" className="xl:col-span-2">
                <div className="header pt-2">
                    <div className="info">
                        <p className="text-purple-100">Unable to load coin data</p>
                        <p className="text-sm text-purple-100/70">Please check your API configuration</p>
                    </div>
                </div>
            </div>
        );
    }

    const { text: changeText, isPositive } = formatPercentage(
        coin.price_change_percentage_24h
    );

    return (
        <div id="coin-overview" className="xl:col-span-2">
            <Link href={`/coins/${coin.id}`} className="block">
                <div className="header pt-2">
                    <Image
                        src={coin.image}
                        alt={`${coin.name} Logo`}
                        width={56}
                        height={56}
                        className="rounded-full"
                    />
                    <div className="info">
                        <p className="text-purple-100">
                            {coin.name} / {coin.symbol.toUpperCase()}
                        </p>
                        <h1 className="text-3xl font-bold">{formatPrice(coin.current_price)}</h1>
                    </div>
                    <div
                        className={`ml-auto badge ${isPositive ? "badge-up" : "badge-down"}`}
                    >
                        {isPositive ? (
                            <TrendingUp className="size-4" />
                        ) : (
                            <TrendingDown className="size-4" />
                        )}
                        <span>{changeText}</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="stat-item">
                        <p className="text-purple-100 text-sm">Market Cap</p>
                        <p className="font-semibold">{formatMarketCap(coin.market_cap)}</p>
                    </div>
                    <div className="stat-item">
                        <p className="text-purple-100 text-sm">24h Volume</p>
                        <p className="font-semibold">{formatMarketCap(coin.total_volume)}</p>
                    </div>
                    <div className="stat-item">
                        <p className="text-purple-100 text-sm">24h High / Low</p>
                        <p className="font-semibold">
                            {formatPrice(coin.high_24h)} / {formatPrice(coin.low_24h)}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
