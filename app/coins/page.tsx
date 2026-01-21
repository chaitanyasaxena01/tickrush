import Image from "next/image";
import Link from "next/link";
import { fetchCoinMarkets } from "@/lib/coingecko";
import { formatPrice, formatPercentage, formatMarketCap } from "@/lib/utils";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/ui/Pagination";
import { TrendingUp, TrendingDown } from "@/components/Icons";

const COINS_PER_PAGE = 50;

const columns: DataTableColumn<CoinMarketData>[] = [
    {
        header: "#",
        headClassName: "w-16",
        cellClassName: "rank-cell",
        cell: (coin) => (
            <>
                <Link href={`/coins/${coin.id}`} />
                <span>{coin.market_cap_rank}</span>
            </>
        ),
    },
    {
        header: "Coin",
        cellClassName: "token-cell",
        cell: (coin) => (
            <div className="token-info">
                <Image
                    src={coin.image}
                    alt={coin.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                <div className="flex flex-col">
                    <span className="font-semibold">{coin.name}</span>
                    <span className="text-xs text-purple-100 uppercase">{coin.symbol}</span>
                </div>
            </div>
        ),
    },
    {
        header: "Price",
        cellClassName: "price-cell",
        cell: (coin) => <span>{formatPrice(coin.current_price)}</span>,
    },
    {
        header: "24h Change",
        cellClassName: "change-cell",
        cell: (coin) => {
            const { text, isPositive } = formatPercentage(coin.price_change_percentage_24h);
            return (
                <div className={`change-value ${isPositive ? "text-green-500" : "text-red-500"}`}>
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
    {
        header: "Market Cap",
        cellClassName: "market-cap-cell",
        cell: (coin) => <span>{formatMarketCap(coin.market_cap)}</span>,
    },
];

interface CoinsPageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function CoinsPage({ searchParams }: CoinsPageProps) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;

    const coins = await fetchCoinMarkets(currentPage, COINS_PER_PAGE);

    // CoinGecko doesn't return total count, so we estimate
    const totalPages = 50; // Approximate - top 2500 coins
    const hasMorePages = currentPage < totalPages;

    return (
        <main id="coins-page">
            <div className="content">
                <h4>💰 All Cryptocurrencies</h4>
                <p className="text-purple-100 text-sm mb-4">
                    Browse the top cryptocurrencies by market cap
                </p>

                <DataTable
                    columns={columns}
                    data={coins}
                    rowKey={(coin) => coin.id}
                    tableClassName="coins-table"
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasMorePages={hasMorePages}
                    baseUrl="/coins"
                />
            </div>
        </main>
    );
}
