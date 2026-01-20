import Image from "next/image";
import React from "react";
import DataTable from "@/components/DataTable";
import Link from "next/link";

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: (coin) => {
      const item = coin.item;

      return (
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
        </Link>
      );
    },
  {
    header: '24 Change',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

      return (
        <div classname={cn('price-change', isTrendingUP ? 'text-green-500',: 'text-red-500')}>
          
        </div>
      )
    }
  }
  },
];

const Page = () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <div id="coin-overview">
          <div className="header pt-2">
            <Image
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
              alt="Bitcoin Logo"
              width={56}
              height={56}
            />
            <div className="info">
              <p>Bitcoin / BTC</p>
              <h1>$42,321.00</h1>
            </div>
          </div>
        </div>

        <p> Trending Coins </p>
        <DataTable />
      </section>
      <section className="w-full mt-7 space-y-4">
        <p>Top Categories</p>
      </section>
    </main>
  );
};

export default Page;
