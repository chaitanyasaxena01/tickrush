import Image from "next/image";
import { fetchCategories } from "@/lib/coingecko";
import { formatPercentage, formatMarketCap } from "@/lib/utils";
import DataTable from "@/components/DataTable";
import { TrendingUp, TrendingDown } from "@/components/Icons";

const columns: DataTableColumn<Category>[] = [
    {
        header: "Category",
        headClassName: "category-cell",
        cellClassName: "category-cell",
        cell: (category) => <span>{category.name}</span>,
    },
    {
        header: "Top Coins",
        cellClassName: "top-gainers-cell",
        cell: (category) => (
            <div className="flex -space-x-2">
                {category.top_3_coins.slice(0, 3).map((coinImg, idx) => (
                    <Image
                        key={idx}
                        src={coinImg}
                        alt="coin"
                        width={28}
                        height={28}
                        className="rounded-full border-2 border-dark-500"
                    />
                ))}
            </div>
        ),
    },
    {
        header: "24h Change",
        headClassName: "change-header-cell",
        cellClassName: "change-cell",
        cell: (category) => {
            const change = category.market_cap_change_24h;
            const { text, isPositive } = formatPercentage(change);
            return (
                <div className={`flex items-center gap-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
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
        cell: (category) => <span>{formatMarketCap(category.market_cap)}</span>,
    },
    {
        header: "Volume (24h)",
        cellClassName: "volume-cell",
        cell: (category) => <span>{formatMarketCap(category.volume_24h)}</span>,
    },
];

export default async function TopCategories() {
    let topCategories: Category[] = [];

    try {
        const categories = await fetchCategories("market_cap_desc");
        topCategories = categories?.slice(0, 5) || [];
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    if (topCategories.length === 0) {
        return (
            <div id="categories">
                <h4>📊 Top Categories</h4>
                <p className="text-purple-100 p-4">Unable to load categories.</p>
            </div>
        );
    }

    return (
        <div id="categories">
            <h4>📊 Top Categories</h4>
            <DataTable
                columns={columns}
                data={topCategories}
                rowKey={(category) => category.name}
            />
        </div>
    );
}
