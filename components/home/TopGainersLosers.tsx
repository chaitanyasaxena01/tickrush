"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, formatPercentage } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "@/components/Icons";

interface TopGainersLosersProps {
    initialGainers: TopGainersLosers[];
    initialLosers: TopGainersLosers[];
}

export default function TopGainersLosers({
    initialGainers,
    initialLosers,
}: TopGainersLosersProps) {
    const [activeTab, setActiveTab] = useState<"gainers" | "losers">("gainers");
    const coins = activeTab === "gainers" ? initialGainers : initialLosers;

    return (
        <div id="top-gainers-losers">
            <div className="tabs-list">
                <button
                    className={`tabs-trigger ${activeTab === "gainers" ? "data-[state=active]" : ""}`}
                    data-state={activeTab === "gainers" ? "active" : "inactive"}
                    onClick={() => setActiveTab("gainers")}
                >
                    🚀 Top Gainers
                </button>
                <button
                    className={`tabs-trigger ${activeTab === "losers" ? "data-[state=active]" : ""}`}
                    data-state={activeTab === "losers" ? "active" : "inactive"}
                    onClick={() => setActiveTab("losers")}
                >
                    📉 Top Losers
                </button>
            </div>

            <div className="tabs-content">
                {coins.map((coin) => {
                    const { text, isPositive } = formatPercentage(
                        coin.priceChangePercentage24h
                    );
                    return (
                        <Link
                            key={coin.id}
                            href={`/coins/${coin.id}`}
                            id="coin-card"
                        >
                            <div className="header">
                                <Image
                                    src={coin.image}
                                    alt={coin.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                                <div>
                                    <h3>{coin.name}</h3>
                                    <p>{coin.symbol.toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="price-row">
                                <span className="price">{formatPrice(coin.price)}</span>
                                <div
                                    className={`change ${isPositive ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {isPositive ? (
                                        <TrendingUp className="size-4" />
                                    ) : (
                                        <TrendingDown className="size-4" />
                                    )}
                                    <span>{text}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
