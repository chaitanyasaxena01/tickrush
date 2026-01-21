# 🚀 TickRush - Crypto Screener & Dashboard

A real-time cryptocurrency screener and dashboard built with Next.js, TypeScript, and the CoinGecko API. Track trending coins, analyze market data, and explore detailed cryptocurrency information.

## ✨ Features

- **📈 Real-time Market Data** - Live cryptocurrency prices and market information
- **🔥 Trending Coins** - See what's hot in the crypto market
- **📊 Top Categories** - Explore crypto categories with market performance
- **🚀 Top Gainers/Losers** - Track the biggest movers in the market
- **💹 Interactive Charts** - OHLC candlestick charts with multiple timeframes
- **💱 Currency Converter** - Convert between crypto and fiat currencies
- **🔍 Global Search** - Quick search with ⌘K keyboard shortcut
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API**: [CoinGecko API](https://www.coingecko.com/en/api)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/tickrush.git
   cd tickrush
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Required: Get your free Demo API key from https://www.coingecko.com/en/api
   COINGECKO_DEMO_API_KEY=your_demo_api_key_here

   # Optional: For Pro API access (higher rate limits)
   # COINGECKO_API_KEY=your_pro_api_key_here
   ```

   > ⚠️ **Important**: CoinGecko now requires a Demo API key (free) for their public API. Get yours at [CoinGecko API](https://www.coingecko.com/en/api).

4. **Run the development server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting Your API Key

1. Go to [CoinGecko API](https://www.coingecko.com/en/api)
2. Click "Get Your Demo API Key" (it's free!)
3. Sign up or log in
4. Copy your Demo API key
5. Add it to your `.env.local` file as `COINGECKO_DEMO_API_KEY`

## 📁 Project Structure

```
tickrush/
├── app/
│   ├── api/
│   │   ├── ohlc/route.ts      # OHLC chart data endpoint
│   │   └── search/route.ts    # Search endpoint
│   ├── coins/
│   │   ├── [id]/page.tsx      # Coin details page
│   │   └── page.tsx           # All coins listing
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── coin/                  # Coin detail components
│   ├── home/                  # Home page components
│   ├── ui/                    # Reusable UI components
│   ├── DataTable.tsx
│   ├── Headers.tsx
│   ├── Icons.tsx              # Custom SVG icons
│   └── SearchModal.tsx
├── lib/
│   ├── coingecko.ts           # CoinGecko API client
│   └── utils.ts               # Utility functions
├── public/
│   └── logo.svg               # TickRush logo
└── type.d.ts                  # TypeScript type definitions
```

## 🎨 Features Overview

### Home Page

- **Coin Overview**: Featured cryptocurrency with key stats
- **Trending Coins**: Top 7 trending cryptocurrencies
- **Top Categories**: Crypto categories sorted by market cap
- **Top Gainers/Losers**: Best and worst 24h performers

### All Coins Page

- Paginated list of 2500+ cryptocurrencies
- Sort by market cap, price, and 24h change
- Quick navigation to coin details

### Coin Details Page

- Live price and market statistics
- Interactive OHLC candlestick chart
- Currency converter
- Exchange/trading pair information
- Project links and description

### Search

- Global search accessible via ⌘K (Mac) or Ctrl+K (Windows)
- Real-time search results
- Shows trending coins when idle
- Keyboard navigation support

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Remember to add your environment variables in the Vercel dashboard.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing the cryptocurrency data API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

Built with ❤️
