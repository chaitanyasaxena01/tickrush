import Image from "next/image";
import Link from "next/link";
import { fetchTrendingCoins } from "@/lib/coingecko";
import { formatPrice, formatPercentage } from "@/lib/utils";
import DataTable from "@/components/DataTable";
import { TrendingUp, TrendingDown } from "@/components/Icons";

const columns: DataTableColumn<TrendingCoin>[] = [
    {
        header: "Name",
        cellClassName: "name-cell",
        cell: (coin) => {
            const item = coin.item;
            return (
                <Link href={`/coins/${item.id}`}>
                    <Image
                        src={item.large}
                        alt={item.name}
                        width={36}
                        height={36}
                        className="rounded-full"
                    />
                    <p>{item.name}</p>
                </Link>
            );
        },
    },
    {
        header: "Price",
        cellClassName: "price-cell",
        cell: (coin) => {
            const price = coin.item.data.price;
            return <span>{formatPrice(price)}</span>;
        },
    },
    {
        header: "24h Change",
        cellClassName: "change-cell",
        cell: (coin) => {
            const change = coin.item.data.price_change_percentage_24h.usd;
            const { text, isPositive } = formatPercentage(change);
            return (
                <div className={`price-change ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    {isPositive ? (
                        <TrendingUp className="size-4" />
                    ) : (
                        <TrendingDown className="size-4" />
                    )}
                    <span>{text}</span>
                </div>
            );
        },
    },
];

export default async function TrendingCoins() {
    let trendingCoins: TrendingCoin[] = [];

    try {
        const { coins } = await fetchTrendingCoins();
        trendingCoins = coins?.slice(0, 7) || [];
    } catch (error) {
        console.error("Failed to fetch trending coins:", error);
    }

    if (trendingCoins.length === 0) {
        return (
            <div id="trending-coins">
                <h4>🔥 Trending Coins</h4>
                <p className="text-purple-100 p-4">Unable to load trending coins. Please check your API key configuration.</p>
            </div>
        );
    }

    return (
        <div id="trending-coins" className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[var(--glass-shadow-md)] backdrop-blur-md overflow-hidden h-full">
            <h4 className="px-6 py-4 text-xl font-bold font-orbitron text-[var(--glass-text)] border-b border-[var(--glass-border)]">
                🔥 Trending Coins
            </h4>
            <div className="p-2">
                <DataTable
                    columns={columns}
                    data={trendingCoins}
                    rowKey={(coin) => coin.item.id}
                    tableClassName="trending-coins-table"
                />
            </div>
        </div>
    );
}
