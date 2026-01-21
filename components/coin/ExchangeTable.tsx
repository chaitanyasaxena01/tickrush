import Link from "next/link";
import { formatPrice, formatRelativeTime } from "@/lib/utils";
import DataTable from "@/components/DataTable";
import { ExternalLink } from "@/components/Icons";

interface ExchangeTableProps {
    tickers: Ticker[];
}

const columns: DataTableColumn<Ticker>[] = [
    {
        header: "Exchange",
        cellClassName: "exchange-name",
        cell: (ticker) => (
            <>
                <Link href={ticker.trade_url || "#"} target="_blank" rel="noopener" />
                <span>{ticker.market.name}</span>
            </>
        ),
    },
    {
        header: "Pair",
        cellClassName: "pair",
        cell: (ticker) => (
            <div className="flex items-center gap-1">
                <p>{ticker.base}</p>
                <span className="text-purple-100">/</span>
                <p>{ticker.target}</p>
            </div>
        ),
    },
    {
        header: "Price",
        cellClassName: "price-cell",
        cell: (ticker) => <span>{formatPrice(ticker.converted_last.usd)}</span>,
    },
    {
        header: "Updated",
        cellClassName: "time-cell",
        cell: (ticker) => (
            <div className="flex items-center gap-2">
                <span className="text-purple-100">{formatRelativeTime(ticker.timestamp)}</span>
                <ExternalLink className="size-4 text-green-500" />
            </div>
        ),
    },
];

export default function ExchangeTable({ tickers }: ExchangeTableProps) {
    // Take top 10 tickers
    const topTickers = tickers.slice(0, 10);

    if (topTickers.length === 0) {
        return (
            <div className="exchange-section">
                <h4>🏦 Markets</h4>
                <p className="text-purple-100">No market data available</p>
            </div>
        );
    }

    return (
        <div className="exchange-section">
            <h4>🏦 Markets</h4>
            <DataTable
                columns={columns}
                data={topTickers}
                rowKey={(ticker, idx) => `${ticker.market.name}-${ticker.base}-${idx}`}
                tableClassName="exchange-table"
            />
        </div>
    );
}
