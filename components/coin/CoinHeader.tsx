import Image from "next/image";
import { formatPrice, formatPercentage, formatMarketCap } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "@/components/Icons";

interface CoinHeaderProps {
    coin: CoinDetailsData;
}

export default function CoinHeader({ coin }: CoinHeaderProps) {
    const price = coin.market_data.current_price.usd;
    const priceChange24h = coin.market_data.price_change_percentage_24h_in_currency.usd;
    const priceChange30d = coin.market_data.price_change_percentage_30d_in_currency.usd;
    const marketCap = coin.market_data.market_cap.usd;
    const volume = coin.market_data.total_volume.usd;

    const { text: change24hText, isPositive: is24hUp } = formatPercentage(priceChange24h);
    const { text: change30dText, isPositive: is30dUp } = formatPercentage(priceChange30d);

    return (
        <div id="coin-header">
            <div className="info">
                <Image
                    src={coin.image.large}
                    alt={coin.name}
                    width={77}
                    height={77}
                    className="rounded-full"
                />
                <div>
                    <p className="text-purple-100">
                        {coin.name} ({coin.symbol.toUpperCase()})
                    </p>
                    <div className="price-row">
                        <h1>{formatPrice(price)}</h1>
                        <div
                            className={`badge ${is24hUp ? "badge-up" : "badge-down"}`}
                        >
                            {is24hUp ? (
                                <TrendingUp className="size-4" />
                            ) : (
                                <TrendingDown className="size-4" />
                            )}
                            <span>{change24hText}</span>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="stats">
                <li>
                    <span className="label">Market Cap Rank</span>
                    <span className="value">#{coin.market_cap_rank}</span>
                </li>
                <li>
                    <span className="label">Market Cap</span>
                    <span className="value">{formatMarketCap(marketCap)}</span>
                </li>
                <li>
                    <span className="label">24h Volume</span>
                    <span className="value">{formatMarketCap(volume)}</span>
                </li>
                <li>
                    <span className="label">24h Change</span>
                    <span className={`value ${is24hUp ? "text-green-500" : "text-red-500"}`}>
                        {change24hText}
                    </span>
                </li>
                <li>
                    <span className="label">30d Change</span>
                    <span className={`value ${is30dUp ? "text-green-500" : "text-red-500"}`}>
                        {change30dText}
                    </span>
                </li>
                <li>
                    <span className="label">Price Change 24h</span>
                    <span className="value">
                        {formatPrice(Math.abs(coin.market_data.price_change_24h_in_currency.usd))}
                    </span>
                </li>
            </ul>
        </div>
    );
}
