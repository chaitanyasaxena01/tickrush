import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Headers from "@/components/Headers";
import { fetchTrendingCoins } from "@/lib/coingecko";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TickRush - Crypto Screener & Dashboard",
  description:
    "Real-time cryptocurrency screener with live prices, market data, charts, and trading insights. Track trending coins, top gainers, and more.",
  keywords: [
    "crypto",
    "cryptocurrency",
    "bitcoin",
    "ethereum",
    "screener",
    "dashboard",
    "trading",
    "prices",
  ],
  authors: [{ name: "TickRush" }],
  openGraph: {
    title: "TickRush - Crypto Screener & Dashboard",
    description: "Real-time cryptocurrency screener with live prices and market data",
    type: "website",
  },
};

async function getTrendingCoins(): Promise<TrendingCoin[]> {
  try {
    const data = await fetchTrendingCoins();
    return data.coins?.slice(0, 7) || [];
  } catch (error) {
    console.error("Failed to fetch trending coins for search:", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const trendingCoins = await getTrendingCoins();

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Headers trendingCoins={trendingCoins} />
        {children}
      </body>
    </html>
  );
}
