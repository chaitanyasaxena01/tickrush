import { Suspense } from "react";
import TrendingCoins from "@/components/home/TrendingCoins";
import CoinOverview from "@/components/home/CoinOverview";
import TopCategories from "@/components/home/TopCategories";
import TopGainersLosers from "@/components/home/TopGainersLosers";
import HomeStats from "@/components/home/HomeStats";
import { fetchTopGainersLosers } from "@/lib/coingecko";

// Loading skeletons
function TrendingCoinsSkeleton() {
  return (
    <div id="trending-coins-fallback">
      <h4>🔥 Trending Coins</h4>
      <div className="trending-coins-table">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-purple-100/5">
            <div className="flex items-center gap-3">
              <div className="skeleton size-9 rounded-full" />
              <div className="skeleton h-4 w-24" />
            </div>
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-4 w-14" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CoinOverviewSkeleton() {
  return (
    <div id="coin-overview-fallback" className="xl:col-span-2">
      <div className="header">
        <div className="skeleton header-image" />
        <div className="info">
          <div className="skeleton header-line-sm" />
          <div className="skeleton header-line-lg" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-5 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div id="categories-fallback">
      <h4>📊 Top Categories</h4>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 border-b border-purple-100/5">
          <div className="skeleton category-skeleton" />
          <div className="flex gap-1">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="skeleton coin-skeleton" />
            ))}
          </div>
          <div className="skeleton value-skeleton-sm" />
          <div className="skeleton value-skeleton-md" />
          <div className="skeleton value-skeleton-lg" />
        </div>
      ))}
    </div>
  );
}

function TopGainersLosersSkeleton() {
  return (
    <div id="top-gainers-losers">
      <div className="tabs-list">
        <div className="skeleton h-8 w-32" />
        <div className="skeleton h-8 w-32" />
      </div>
      <div className="tabs-content">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-dark-500 p-5 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="skeleton size-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-3 w-12" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="skeleton h-6 w-24" />
              <div className="skeleton h-5 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Safe wrapper functions for API calls
async function getTopGainersLosers() {
  try {
    const [gainers, losers] = await Promise.all([
      fetchTopGainersLosers("gainers", 4),
      fetchTopGainersLosers("losers", 4),
    ]);
    return { gainers, losers };
  } catch (error) {
    console.error("Failed to fetch gainers/losers:", error);
    return { gainers: [], losers: [] };
  }
}

export default async function Home() {
  const { gainers, losers } = await getTopGainersLosers();

  return (
    <main className="min-h-screen bg-[var(--color-background)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--glass-secondary)] via-[var(--color-background)] to-[var(--color-background)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header - could be moved to a component */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-orbitron text-[var(--glass-text)]">
              Market Overview
            </h2>
            <p className="text-[var(--glass-text)] opacity-70 font-exo-2 mt-1">
              Live updates and trends from the crypto market.
            </p>
          </div>
        </div>

        {/* Home Stats Row */}
        <section className="mb-8">
          <HomeStats />
        </section>

        {/* Hero Section - Overview and Trending */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <Suspense fallback={<CoinOverviewSkeleton />}>
            <CoinOverview />
          </Suspense>

          <div className="xl:col-span-1 h-full">
            <Suspense fallback={<TrendingCoinsSkeleton />}>
              <TrendingCoins />
            </Suspense>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full mb-8">
          <Suspense fallback={<CategoriesSkeleton />}>
            <TopCategories />
          </Suspense>
        </section>

        {/* Top Gainers & Losers Section */}
        <section className="w-full">
          <Suspense fallback={<TopGainersLosersSkeleton />}>
            <TopGainersLosers initialGainers={gainers} initialLosers={losers} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
