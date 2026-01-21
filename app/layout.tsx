import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Exo_2 } from "next/font/google"; // [NEW] Imported new fonts
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

// [NEW] Configured Orbitron
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

// [NEW] Configured Exo 2
const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  display: "swap",
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
  icons: {
    icon: "/icon.png",
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
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${exo2.variable} antialiased`}
      >
        <Headers trendingCoins={trendingCoins} />
        {children}
      </body>
    </html>
  );
}
